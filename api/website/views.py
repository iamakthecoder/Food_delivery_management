from flask import Blueprint, session,request, redirect, url_for, render_template, jsonify
from .models import db,pyrebase_pb
from flask import request,json
from firebase_admin import firestore, auth
from datetime import datetime

views = Blueprint('views',__name__)

@views.route('/')
def home():
    return render_template('home.html')

@views.route('/home')
def homie():
    return {"Hello":"World"}

@views.route('/customerDashboard')
def customerDashboard():
    user = session['user']
    if user['userType']=="customer":
        return user
    else:
        return redirect(url_for('Auth.logout'))



@views.route('/restaurantDashboard',methods=['POST'])
def restaurantDashboard():
    user = session['user']
    if user['userType']=="restaurant":
        return user
    else:
        return redirect(url_for('Auth.logout'))



@views.route('/deliveryAgentDashboard')
def deliveryAgentDashboard():
    user = session['user']
    if user['userType']=="deliveryAgent":
        return user
    else:
        return redirect(url_for('Auth.logout'))



@views.route('/adminDashboard')
def adminDashboard():
    user = session['user']
    if user['userType']=="admin":
        return user
    else:
        return redirect(url_for('Auth.logout'))


#show personal data of the user
@views.route('/personalData')
def personalData():

    user = db.collection(session['user']['userType']).document(session['userId']).get().to_dict()

    user['ratingValue'] = db.collection('rating').document(user['ratingId']).get().to_dict()['rating']

    return user


#list of the restaurants
@views.route('/allRestaurant')
def allRestaurant():
    user = session['user']
    if (not user['userType'] == 'admin') and (not user['userType'] == 'customer'):
        return redirect(url_for('Auth.logout'))

    restaurantList = []
    restaurant_ref = db.collection('restaurant').stream()
    for res in restaurant_ref:
        temp_dict = res.to_dict()
        temp_dict['userId'] = res.id
        # temp_dict['areaName'] = db.collection('area').document(temp_dict['areaId']).get().to_dict()['name']
        temp_dict['ratingValue'] = db.collection('rating').document(temp_dict['ratingId']).get().to_dict()['rating']

        restaurantList.append(temp_dict)

    session['restaurantList'] = restaurantList

    return {"restaurantList":restaurantList}


#list of the customers
@views.route('/allCustomers')
def allCustomers():
    user = session['user']
    if not user['userType']=='admin':
        return {"message":"error"}
        # return redirect(url_for('Auth.logout'))

    session['customerList'] = []
    customer_ref = db.collection('customer').stream()
    for cust in customer_ref:
        temp_dict = cust.to_dict()
        temp_dict['userId'] = cust.id
        #temp_dict['areaName'] = db.collection('area').document(temp_dict['areaId']).get().to_dict()['name']
        temp_dict['ratingValue'] = db.collection('rating').document(temp_dict['ratingId']).get().to_dict()['rating']

        session['customerList'].append(temp_dict)

    customerList = session['customerList']

    return {"customerList":customerList}
    # return render_template('allCustomers.html', user=user)


#list of the deliveryAgents
@views.route('/allDeliveryAgents')
def allDeliveryAgents():
    user = session['user']
    if (not user['userType']=='admin') and (not user['userType']=='restaurant'):
        return {"message":""}
        # return redirect(url_for('Auth.logout'))

    session['deliveryAgentList'] = []

    deliveryAgent_ref = db.collection('deliveryAgent').stream()
    for agent in deliveryAgent_ref:
        temp_dict = agent.to_dict()
        temp_dict['userId'] = agent.id
        #temp_dict['areaName'] = db.collection('area').document(temp_dict['areaId']).get().to_dict()['name']
        temp_dict['ratingValue'] = db.collection('rating').document(temp_dict['ratingId']).get().to_dict()['rating']

        session['deliveryAgentList'].append(temp_dict)

    deliveryAgentList = session['deliveryAgentList']

    return {"deliveryAgentList":deliveryAgentList}
    # return render_template('allDeliveryAgents.html',user=user)

@views.route('/menu',methods=['GET'])
def createMenu():
    user = session['user']
    if  not (user['userType']=='restaurant'):
        return {"message":"error"}
    try:
        ResMenuId= user['restaurantId']
        foodItemList=[]
        foodItems= db.collection('restaurant').document(ResMenuId).collection('foodItem').stream()
        for foodItem in foodItems :
            tdict= foodItem.to_dict()

            foodItemList.append(tdict)
        session['foodMessage']="False"
        return {"user":user,"menuList":foodItemList,"message":"Success"}

    except Exception as e:
        return {"error":str(e)}
    # except:
    #     session['foodMessage']="False"
    #     message="False"
    #     return {"user":user,"menuList":foodItemList,"message":"error"}

# @views.route('/addFoodItem',methods=['POST'])
# def addFoodItem():
#     requestt = json.loads(request.data)
#     user= session['user']
#     if(user['userType']=='restaurant'):
#         message=session['foodMessage']
#         session['foodMessage']="False"
#         return render_template('addFoodItem.html',user=user,message=message)
#     else:
#         return redirect(url_for('Auth.logout'))

@views.route('/addFoodItem',methods=['POST'])
def Add():
    requestt = json.loads(request.data)
    print(requestt)
    if session['user']['userType'] != 'restaurant':
        return {"message":"Not A Restaurant"}
    name= requestt['name']
    price= requestt['price']
    user = session['user']
    # local file obj

    try:
        foodItem={
            "name": name,
            "pricePerItem": price,
            "isRecommended": False,
            "restaurantId": user['restaurantId'],
            #"picSrc": ""
        }
        doc = db.collection("restaurant").document(user['restaurantId']).collection("foodItem").document()
        doc.set(foodItem)
        db.collection("restaurant").document(user['restaurantId']).collection("foodItem").document(doc.id).update({"foodItemId":doc.id})
        return {"message":"Success"}
    except:
        session['foodMessage'] = "Error adding food item text data in database"
        return {"message":session['foodMessage']}

@views.route('/finishMenu')
def finishMenu():
    user= session['user']
    if user['userType']=="restaurant" :
        return render_template('finishMenu.html',user=user)
    else:
        return redirect(url_for('Auth.logout'))


@views.route('/displayFoodItems/<restaurantUserId>',methods=['GET','POST'])
def FoodItems(restaurantUserId):
    rr=json.loads(request.data)
    restaurantUserId=rr['id']
    user= session['user']
    if not session['user']['userType']=='customer' and not session['user']['userType']=='admin':
        return redirect(url_for('Auth.logout'))
    session['ResMenuId']=restaurantUserId
    foodItemList=[]
    foodItems= db.collection('restaurant').document(session['ResMenuId']).collection('foodItem').stream()
    for foodItem in foodItems:
        tdict= foodItem.to_dict()
        foodItemList.append(tdict)
    # print(foodItemList)
    # print(restaurantUserId)
    session['currentMenu']=foodItemList
    return {"menu":foodItemList}

@views.route('/order', methods=['POST','GET'])
def order():
    requestt = json.loads(request.data)
    foodItemList = session['currentMenu']
    # print(requestt)

    cost=0
    orderList = []

    try:
        for name, quantity in requestt.items():
            for i in range(len(foodItemList)):
                if name == foodItemList[i]['name']:
                    foodItemList[i]['frequency'] = int(quantity)
                    foodItemList[i]['pricePerItem'] = int(foodItemList[i]['pricePerItem'])
                    orderList.append(foodItemList[i])
                    cost += int(foodItemList[i]['pricePerItem']) * int(foodItemList[i]['frequency'])

        session['currentOrder'] = {
            'orderList': orderList,
            'isPending': True,
            'customerId': session['userId'],
            'restaurantId': foodItemList[0]['restaurantId'],
            'orderValue': cost,
            'offerId': None,
            'discountValue': 0,
            'paidValue': 0,
            'deliveryCharge': 50,
            'orderDateTime': "",
            'deliveryAgentId': "",
            'updateLevel': 0,
            'updateMessage': "Accept/Reject",
            'orderUpdates': [],
            'orderId': ''
        }
        # print("returning success")
        return {"message":"Success"}

    except Exception as e:
        return {"message":"error", "error":str(e)}

    #return redirect(url_for('orderDetails'))

@views.route('/addOfferCustomer/<customer_offerId>')
def addOfferCustomer(customer_offerId):
    if session['user']['userType']!='customer':
        return {"message":"error"}
    
    session['currentOrder']['offerId'] = customer_offerId
    session.modified=True
    print(session['currentOrder'])
    return {"message":"Success"}


@views.route('/orderDetails')
def orderDetails():
    currentOrder = session['currentOrder']
    print(currentOrder)
    customerName = db.collection('customer').document(currentOrder['customerId']).get().to_dict()['name']
    restaurantName = db.collection('restaurant').document(currentOrder['restaurantId']).get().to_dict()['name']
    offerList=[]
    offers = db.collection('customer').document(currentOrder['customerId']).collection('promotionalOfferId').stream()
    for offer in offers:
        temp = offer.to_dict()
        offerList.append(temp)
    orderList = currentOrder['orderList']
    discount = currentOrder['discountValue']
    if currentOrder['offerId'] == None:
        offerUsed = None
        discount = 0
    else:
        offerUsed = db.collection('customer').document(currentOrder['customerId']).collection('promotionalOfferId').document(currentOrder['offerId']).get().to_dict()
        discount = min(int(int(currentOrder['orderValue'])*int(offerUsed['discount'])/100), int(offerUsed['upperLimit']))

    currentOrder['discountValue'] = discount

    final = max(currentOrder['orderValue'] + currentOrder['deliveryCharge'] - discount, 0)
    currentOrder['paidValue'] = final
    # print(orderList)
    session.modified=True
    return {"orderList":orderList, "customerName":customerName, "restaurantName":restaurantName, "offerList":offerList, "offerUsed":offerUsed, "cost":currentOrder['orderValue'], "deliveryCharge":currentOrder['deliveryCharge'], "discount":discount, "final":final}

@views.route('/placeOrder',methods=['GET'])
def placeOrder():
    currentOrder = session['currentOrder']

    doc_ref = db.collection('order').document()
    doc_ref.set(currentOrder)

    db.collection('order').document(doc_ref.id).update({'orderId': doc_ref.id})
    db.collection('order').document(doc_ref.id).update({'orderDateTime':datetime.now().strftime("%d/%m/%Y %H:%M:%S")})

    orderId = doc_ref.id
    session['currentOrder']['orderId'] = orderId

    restaurantId = currentOrder['restaurantId']
    restaurantDoc_ref = db.collection('restaurant').document(restaurantId)
    restaurantDoc_ref.update({'pendingOrderId': firestore.ArrayUnion([orderId])})

    customerId = currentOrder['customerId']
    customerDoc_ref = db.collection('customer').document(customerId)
    customerDoc_ref.update({'pendingOrderId': firestore.ArrayUnion([orderId])})

    if not currentOrder['offerId'] == None:
        db.collection('order').document(orderId).update({'offerId': db.collection('customer').document(customerId).collection('promotionalOfferId').document(currentOrder['offerId']).get().to_dict()})
        db.collection('customer').document(customerId).collection('prmotionalOfferId').document(currentOrder['offerId']).delete()
    return {"message":"Success"}


@views.route('/recentOrderCustomer')
def recentOrderCustomer():
    user = session['user']
    currentOrder = session['currentOrder']
    customerId=currentOrder['customerId']
    listOrderId = db.collection('customer').document(customerId).get().to_dict()['pendingOrderId']
    recentOrderList=[]
    for id in listOrderId:
        temp=db.collection('order').document(id).get().to_dict()
        temp['restaurantName']=db.collection('restaurant').document(temp['restaurantId']).get().to_dict()['name']
        recentOrderList.append(temp)

    # docs = db.collection('order').stream()
    # for doc in docs:
    #     if doc.id in listOrderId:
    #         temp=doc.to_dict()
    #         temp['restaurantName']=db.collection('restaurant').document(temp['restaurantId']).get().to_dict()['name']
    #         recentOrderList.append(temp)
    session['presentOrderCustomer']=recentOrderList
    
    return {'recentOrderList':recentOrderList}

@views.route('/recentOrderRestaurant')

def recentOrderRestaurant():
    user=session['user']
    restaurantId = user['restaurantId']
    listOrderId = db.collection('restaurant').document(restaurantId).get().to_dict()['pendingOrderId']
    recentOrderList = []
    for id in listOrderId:
        temp = db.collection('order').document(id).get().to_dict()
        temp['customerName']=db.collection('customer').document(temp['customerId']).get().to_dict()['name']
        recentOrderList.append(temp)

    # docs = db.collection('order').stream()
    # for doc in docs:
    #     if doc.id in listOrderId:
    #         temp = doc.to_dict()
    #         print(temp['customerId'])
    #         temp['customerName']=db.collection('customer').document(temp['customerId']).get().to_dict()['name']
    #         recentOrderList.append(temp)
    session['presentOrderRestaurant'] = recentOrderList
    
        
    return {"recentOrders":recentOrderList}

@views.route('/orderDetailRestaurant/<orderId>',methods=['POST','GET'])
def orderDetailRestaurant(orderId):
    # orderId=int(orderId)
    # if orderId > len(session['presentOrderRestaurant']):
    #     return redirect(url_for('recentOrderRestaurant'))
    # orderId=orderId-1
    # currentOrder=session['presentOrderRestaurant'][orderId]['orderId']
    requestt = json.loads(request.data)
    orderId = requestt['id']
    currentOrder=db.collection('order').document(orderId).get().to_dict()
    customerName = db.collection('customer').document(currentOrder['customerId']).get().to_dict()['name']
    restaurantName = db.collection('restaurant').document(currentOrder['restaurantId']).get().to_dict()['name']
    orderList=currentOrder['orderList']
    discount=currentOrder['discountValue']
    session['currentOrderUpdating']=currentOrder

    final=max(currentOrder['orderValue']+ currentOrder['deliveryCharge']- discount,0)
    return  {"currentOrder":currentOrder, "orderList":orderList, "customerName":customerName, "restaurantName":restaurantName, "cost":currentOrder['orderValue'], "deliveryCharge":currentOrder['deliveryCharge'], "discount":discount, "final":final, "updateLevel":currentOrder['updateLevel']}

@views.route('/updateStatus0', methods=['GET','POST'])
def updateStatus0():
    if session['user']['userType'] != 'restaurant':
        return {"message":"error"}
    requestt = json.loads(request.data)
    orderId = requestt['ordid']
    order = db.collection('order').document(orderId).get().to_dict()
    updateOrderDic = {'heading': "Rejected"}
    db.collection('order').document(orderId).update({'orderUpdates' : firestore.ArrayUnion([updateOrderDic])})
    db.collection('order').document(orderId).update({'isPending': False})
    db.collection('order').document(orderId).update({'updateMessage': "Rejected"})
    db.collection('order').document(orderId).update({'updateLevel': 1})
    db.collection('customer').document(order['customerId']).update({'pendingOrderId' : firestore.ArrayRemove([session['currentOrderUpdating']['orderId']])})
    db.collection('restaurant').document(order['restaurantId']).update({'pendingOrderId' : firestore.ArrayRemove([session['currentOrderUpdating']['orderId']])})
    return {"message":"Success"}
    

@views.route('/getEstimatedTime/<id>', methods=['POST','GET'])
def getEstimatedTime(id):
    if session['user']['userType'] != 'restaurant':
        return {"message":"error"}
        # return redirect(url_for('Auth.logout'))
    try:
        requestt = json.loads(request.data)
        orderId = requestt['id']
        estimatedTime = requestt['time']
        updateOrderDic = {
            'heading': "Accepted",
            'time' : str(estimatedTime)+" min"

            }

    except Exception as e:
        return {"message":"error", "error":str(e)}

    try:
        db.collection('order').document(orderId).update({'updateMessage': "Accepted. Preparing Food"})
        db.collection('order').document(orderId).update({'updateLevel': 1})
        db.collection('order').document(orderId).update({'orderUpdates' : firestore.ArrayUnion([updateOrderDic])})
    except Exception as e:
        return {"message":"error", "error":str(e)}

    # print("Success")
    return {"message":"Success"}

@views.route('/updateStatus1')
def updateStatus1():
    if session['user']['userType'] != 'restaurant':
        return redirect(url_for('Auth.logout'))
    return render_template('foodPrepared.html')

@views.route('/updateStatus3',methods=['POST'])
def updateStatus3():
    if session['user']['userType'] != 'restaurant':
        return {"message":"error"}
        # return redirect(url_for('logout'))

    requestt = json.loads(request.data)
    # print(requestt)
    orderId = requestt
    # currentOrder = session['currentOrderUpdating']\
    try:
        db.collection('order').document(orderId).update({'updateMessage': "Out for Delivery"})
        db.collection('order').document(orderId).update({'updateLevel': 4})
    except Exception as e:
        return {"message":"error","error":str(e)}
    
    return {"message":"Success"}
    # return redirect(url_for('views.recentOrderRestaurant'))

@views.route('/sendDeliveryRequest/<orderId>', methods=['POST','GET'])
def sendDeliveryRequest(orderId):

    if session['user']['userType']!='restaurant':
        return {"message":"error"}
        # return redirect(url_for('logout'))

    requestt = json.loads(request.data)
    orderId = requestt['id']

    # pendingOrderId=session['currentOrderUpdating']['orderId'] #get from front end
    # area=session['user']['area']

    try:
        #db.collection('area').document(areaId).update({'availableOrderIdForPickup':firestore.ArrayUnion([pendingOrderId])})
        db.collection('order').document(orderId).update({'updateMessage': "Food is Prepared"})
        db.collection('order').document(orderId).update({'updateLevel': 2})
    except Exception as e:
        return {"message":"error", "error":str(e)}
    
    return {"message":"Success"}
    # return redirect(url_for('views.recentOrderRestaurant'))

@views.route('/moreDetailsOrder/<orderId>',methods=['GET','POST'])
def moreDetailsOrder(orderId):
    if session['user']['userType'] != 'customer':
        return redirect(url_for('logout'))
    # orderId=int(orderId)
    # if orderId > len(session['presentOrderCustomer']):
    #     return redirect(url_for('recentOrderCustomer'))
    # orderId=orderId-1
    # currentOrder=session['presentOrderCustomer'][orderId]['orderId']
    requestt = json.loads(request.data)
    orderId = requestt['id']
    currentOrder=db.collection('order').document(orderId).get().to_dict()
    customerName = db.collection('customer').document(currentOrder['customerId']).get().to_dict()['name']
    restaurantName = db.collection('restaurant').document(currentOrder['restaurantId']).get().to_dict()['name']
    session['customerCurrentOrderChanging']=currentOrder
    orderList=currentOrder['orderList']
    discount=currentOrder['discountValue']
    # print(currentOrder['offerId'])
    if currentOrder['offerId'] == None:
        offerUsed=None
    else:
        offerUsed=currentOrder['offerId']
        discount=min(int(int(currentOrder['orderValue'])*int(offerUsed['discount'])/100), int(offerUsed['upperLimit']))
    currentOrder['discountValue']=discount
    final=max(currentOrder['orderValue']+ currentOrder['deliveryCharge']- discount,0)
    deliveryAgentName=""
    if currentOrder['deliveryAgentId'] != "":
        deliveryAgentName=db.collection('deliveryAgent').document(currentOrder['deliveryAgentId']).get().to_dict()['name']
    return {"orderDateTime":currentOrder['orderDateTime'],"orderList":orderList, "customerName":customerName, "restaurantName":restaurantName, "offerUsed":offerUsed, "cost":currentOrder['orderValue'], "deliveryCharge":currentOrder['deliveryCharge'], "discount":discount, "final":final, "updateLevel":currentOrder["updateLevel"], "orderUpdate":currentOrder["orderUpdates"], "restaurantId":currentOrder["restaurantId"], "customerId":currentOrder["customerId"], "deliveryAgentName":deliveryAgentName}
    #return render_template('moreDetailsOrder.html',  orderList=orderList, customerName=customerName, restaurantName=restaurantName, offerUsed=offerUsed, cost=currentOrder['orderValue'], deliveryCharge=currentOrder['deliveryCharge'], discount=discount, final=final, updateLevel=currentOrder['updateLevel'], orderUpdate = currentOrder['orderUpdates'],restaurantId=currentOrder['restaurantId'],customerId= currentOrder['customerId'], deliveryAgentName=deliveryAgentName)

#offers walle code daalna baaki hai

# This will show the food items in a restaurant, i.e. showing the menu of the restaurant
@views.route('/allFoodItem11/<restaurantUserId>')
def allFoodItem11(restaurantUserId):
    if not session['user']['userType'] == 'customer' and not session['user']['userType'] == 'admin':
        return redirect(url_for('logout'))
    session['currResMenuId']=restaurantUserId
    return redirect(url_for('allFoodItem'))


@views.route('/allFoodItem')
def allFoodItem():

    user=session['user']
    if not user['userType']=='customer' and not user['userType']=='admin':
        return redirect(url_for('logout'))

    foodItemList=[]
    docs=db.collection('restaurant').document(session['currResMenuId']).collection('foodItem').stream()
    for doc in docs:
        temp_dict=doc.to_dict()
        #temp_dict['pic'] = getImageURL(temp_dict['picSrc'])
        foodItemList.append(temp_dict)
    session['currentMenu']=foodItemList
    session.modified=True
    return render_template('allFoodItem.html', user=user,foodItemList=foodItemList)

@views.route('/redirectDashboard')
def redirectDashboard():
    if session['user']['userType']=='customer':
        return redirect(url_for('customerDashboard'))
    elif session['user']['userType']=='restaurant':
        return redirect(url_for('restaurantDashboard'))
    elif session['user']['userType']=='deliveryAgent':
        return redirect(url_for('deliveryAgentDashboard'))
    elif session['user']['userType']=='admin':
        return redirect(url_for('adminDashboard'))


@views.route('/deleteFoodItem/<foodItemId>',methods=['POST','GET'])
def deleteFoodItem(foodItemId):
    if session['user']['userType'] != 'restaurant':
        return {"message":"error"}
        # return redirect(url_for('Auth.logout'))
    restaurantId=session['userId']

    requestt = json.loads(request.data)
    foodItemId = requestt['id']
    #command_to delete the id
    try:
        db.collection("restaurant").document(restaurantId).collection('foodItem').document(foodItemId).delete()
        session['foodMessage']="food item deletion from databse is successful"
    except Exception as e:
        # print(e)
        session['foodMessage']="Error deleting food item from databse"
        return {"message":"error"}

    return {"message":"Success"}
    # return redirect(url_for('views.createMenu'))

def deleteUserFromDatabase(to_delete):

    user_type=""

    try:
        auth.delete_user(to_delete)
    except:
        print("Error deleting user from authentication")
        return False

    try:
        user_type = db.collection('userType').document(to_delete).get().to_dict()["type"]
        if(user_type=="restaurant"):
            # If you have larger collections, you may want to delete the documents in smaller batches to avoid out-of-memory errors.
            delete_collection(db.collection("restaurant").document(to_delete).collection("foodItem"),1000)
        db.collection(user_type).document(to_delete).delete()
        db.collection("userType").document(to_delete).delete()
    except :
        print("error deleting user from firestore")
        return False
    
    return True

    # try:
    #     # deleting profile pictures
    #     bucket.delete_blob(user_type+"/"+to_delete+".jpg")

    #     # deleting food item images
    #     if user_type=="restaurant":
    #         blob_objects=bucket.list_blobs(prefix="restaurant/"+to_delete+"_")
    #         blob_object_names=[]
    #         for blob in blob_objects:
    #             blob_object_names.append(blob.name)
    #         bucket.delete_blobs(blob_object_names)

    # except Exception as e:
    #     print(e)



@views.route('/delete/<user_type>/<delete_id>',methods=['POST','GET'])
def deleteUser(user_type, delete_id):
    # print(request.args.get(user_type))
    if not session['user']['userType'] == "admin":
        return {"message":"error"}
        # return redirect(url_for('logout'))
    
    requestt = json.loads(request.data)
    user_type = requestt['userType']
    delete_id = requestt['id']

    if user_type == "restaurant":
        for i in range(len(session['restaurantList'])):
            if session['restaurantList'][i]['restaurantId']==delete_id:
                session['restaurantList'].pop(i)
                break

        # user_deleted=session['restaurantList'].pop(to_delete)
        session.modified = True
        if(deleteUserFromDatabase(delete_id)):
            return {"message":"Success"}
        else:
            return {"message":"error"}
        # return redirect(url_for('allRestaurant'))
    elif user_type == "customer":
        for i in range(len(session['customerList'])):
            if session['customerList'][i]['customerId']==delete_id:
                session['customerList'].pop(i)
                break

        # user_deleted=session['restaurantList'].pop(to_delete)
        session.modified = True
        if(deleteUserFromDatabase(delete_id)):
            return {"message":"Success"}
        else:
            return {"message":"error"}
        # return redirect(url_for('allCustomers'))
    elif user_type == 'deliveryAgent':
        for i in range(len(session['deliveryAgentList'])):
            if session['deliveryAgentList'][i]['deliveryAgentId']==delete_id:
                session['deliveryAgentList'].pop(i)
                break

        # user_deleted=session['restaurantList'].pop(to_delete)
        session.modified = True
        if(deleteUserFromDatabase(delete_id)):
            return {"message":"Success"}
        else:
            return {"message":"error"}
        # return redirect(url_for('allDeliveryAgents'))


def delete_collection(coll_ref, batch_size):
    docs = coll_ref.limit(batch_size).stream()
    deleted = 0

    for doc in docs:
        print(f'Deleting doc {doc.id} => {doc.to_dict()}')
        doc.reference.delete()
        deleted = deleted + 1

    if deleted >= batch_size:
        return delete_collection(coll_ref, batch_size)

#recommended retaurant aur food item walle code baaki hai

@views.route('/pastOrder')
def pastOrder():
    if not session['user']['userType'] == 'restaurant' and not session['user']['userType'] == 'customer':
        return redirect(url_for('Auth.logout'))
    userId=session['userId']
    userType=session['user']['userType']

    pastOrderList=[]

    docs = db.collection('order').stream()
    for doc in docs:
        temp_dict=doc.to_dict()
        if not temp_dict['isPending'] :
            if userType=='customer' and userId==temp_dict['customerId']:
                temp_dict['restaurantName']=db.collection('restaurant').document(temp_dict['restaurantId']).get().to_dict()['name']
                pastOrderList.append(temp_dict)
            elif userType=='restaurant' and userId==temp_dict['restaurantId']:
                temp_dict['customerName']=db.collection('customer').document(temp_dict['customerId']).get().to_dict()['name']
                pastOrderList.append(temp_dict)

    if(userType=="customer"):
        session['presentOrderCustomer']= pastOrderList
        session.modified = True
        return {"pastOrderlist" : pastOrderList}
    if(userType=="restaurant"):
        session['presentOrderRestaurant']= pastOrderList

        return {"pastOrderlist" : pastOrderList}


# This will show all the nearby delivery agent in the same area to the restaurant
@views.route('/nearbyDeliveryAgents/<orderId>')
def nearbyDeliveryAgents(orderId):

    if session['user']['userType']!='restaurant':
        return {"message":"error"}
        # return redirect(url_for('Auth.logout'))
    

    area=session['user']['area']

    nearbyDeliveryAgentsList=[]
    # Retrieving the data from the database
    doc_reference = db.collection('deliveryAgent').stream()

    for doc in doc_reference:
        temp_dict=doc.to_dict()
        if temp_dict['area']==area and temp_dict['isAvailable']==True:
            #temp_dict['areaName'] = db.collection('area').document(temp_dict['areaId']).get().to_dict()['name']
            temp_dict['ratingValue']= db.collection('rating').document(temp_dict['ratingId']).get().to_dict()['rating']
            nearbyDeliveryAgentsList.append(temp_dict)

    return {"deliveryAgentList":nearbyDeliveryAgentsList}

    


# This function will show all the delivery request for the customer in the region that are sent by the restaurants
@views.route('/seeDeliveryRequest')
def seeDeliveryRequest():

    if session['user']['userType']!='deliveryAgent':
        return redirect(url_for('Auth.logout'))

    area = session['user']['area']

    deliveryRequestList=[]

    restaurants = db.collection('restaurant').stream()
    for res in restaurants:
        temp = res.to_dict()
        if temp['area']!=area:
            continue

        for id in temp['pendingOrderId']:
            order_dict = db.collection('order').document(id).get().to_dict()
            if order_dict['updateLevel']==2:
                order_dict['restaurant']=db.collection('restaurant').document(order_dict['restaurantId']).get().to_dict()
                order_dict['customer']=db.collection('customer').document(order_dict['customerId']).get().to_dict()
                deliveryRequestList.append(order_dict)

    # areaId=session['user']['areaId']

    # orderIdForADeliveryAgent=db.collection('area').document(areaId).get().to_dict()['availableOrderIdForPickup']
    # deliveryRequestList=[]

    # for orderId in orderIdForADeliveryAgent:
    #     temp_dict=db.collection('order').document(orderId).get().to_dict()

    #     if temp_dict['isPending']==True: # it will be true , just doing it to be on the safe side
    #         temp_dict['restaurant']=db.collection('restaurant').document(temp_dict['restaurantId']).get().to_dict()
    #         temp_dict['customer']=db.collection('customer').document(temp_dict['customerId']).get().to_dict()
    #         #temp_dict['area']=db.collection('area').document(areaId).get().to_dict()
    #         deliveryRequestList.append(temp_dict)
    session['currentDeliveryRequest'] = deliveryRequestList
    session.modified = True
    return {"deliveryRequestList":deliveryRequestList}
    # return render_template("seeDeliveryRequest.html", deliveryRequestList = deliveryRequestList)



# This function will accept delivery request with getting the expected time of arrival and delivery from the delivery agent
# It will also update the status of the order to show to the customer
@views.route('/acceptDeliveryRequest/<orderId>', methods=['POST', 'GET'])
def acceptDeliveryRequest(orderId):

    if session['user']['userType']!='deliveryAgent':
        return {"message":"error"}
        # return redirect(url_for('logout'))

    requestt = json.loads(request.data)
    orderId = requestt['id']['id']

    user = session['user']
    timeToReachRestaurant = requestt['rtime']
    timeToReachCustomer = requestt['ctime']
    updateOrderDic = {
        "timePickUp" : timeToReachRestaurant,
        "deliveryTime" : timeToReachCustomer
    }
    if request.method=='POST':
        try:
            session['currentOrderDeliveryAgent'] = db.collection('order').document(orderId).get().to_dict()
            db.collection('order').document(orderId).update({'deliveryAgentId': user['deliveryAgentId']})
            db.collection('order').document(orderId).update({'updateMessage': "Order Accepted by Delivery Agent"})
            db.collection('order').document(orderId).update({'updateLevel': 3})
            db.collection('order').document(orderId).update({'orderUpdates' : firestore.ArrayUnion([updateOrderDic])})
            # print(session['currentOrderDeliveryAgent']['orderId'])
            # db.collection('area').document(session['user']['areaId']).update({'availableOrderIdForPickup' : firestore.ArrayRemove([session['currentOrderDeliveryAgent']['orderId']])})
            db.collection('deliveryAgent').document(user['deliveryAgentId']).update({"isAvailable" : not user['isAvailable']})
            db.collection('deliveryAgent').document(user['deliveryAgentId']).update({"currentOrderId" : session['currentOrderDeliveryAgent']['orderId']})
            return {"message":"Success"}
        except:
            return {"message":"error"}
    else:
        return {"message":"error"}
    # return redirect(url_for('moreDetailsDeliveryRequest', status = "Details"))


@views.route('/markLocation',methods=['POST','GET'])
def markLocation():
    if session['user']['userType']!='deliveryAgent':
        return {"message":"error"}
        # return redirect(url_for('Auth.logout'))

    try:
        requestt = json.loads(request.data)
        area = requestt['location']
        db.collection('deliveryAgent').document(session['userId']).update({'area':area})
    except Exception as e:
        return {"message":"error", "error":str(e)}

    return {"message":"Success"}

    # return redirect(url_for('views.deliveryAgentDashboard'))





@views.route('/useOffer<toUse>')
def useOffer(toUse):
    if session['user']['userType'] != 'customer':
        return redirect(url_for('logout'))
    user=session['userId']
    toUse=int(toUse)
    toUse=toUse-1
    session['currentOrderCreating']['offerId']=session['offerList'][toUse]['offerId']
    session.modified = True
    return redirect(url_for('orderDetails'))


@views.route('/removeOfferFromOrder')
def removeOfferFromOrder():
    if session['user']['userType'] != 'customer':
        return redirect(url_for('logout'))
    session['currentOrderCreating']['offerId']=None
    session.modified = True
    return redirect(url_for('orderDetails'))


# This will change the recommended status for the restaurant
@views.route('/changeRecommendRestaurant/<restaurantId>', methods=['POST','GET'])
def changeRecommendRestaurant(restaurantId):
    if session['user']['userType'] != 'admin':
        return {"message":"error"}
        # return redirect(url_for('logout'))

    # id=int(id_to_change)
    # id=id-1

    # restaurantId=session['restaurantList'][id]['restaurantId']

    # requestt = json.loads(request.data)
    # print(requestt)
    # print(restaurantId)
    # restaurantId = requestt['id']

    for i in range(len(session['restaurantList'])):
        if session['restaurantList'][i]['restaurantId']==restaurantId:
            session['restaurantList'][i]['isRecommended'] = not session['restaurantList'][i]['isRecommended']
            break

    # if session['restaurantList'][id]['isRecommended'] == False:
    #     session['restaurantList'][id]['isRecommended'] = True
    #     session.modified = True

    # else :
    #     session['restaurantList'][id]['isRecommended'] = False
    #     session.modified = True

    #change in database
    isRecommended=""
    try:
        isRecommended = db.collection("restaurant").document(restaurantId).get().to_dict()['isRecommended']
    except Exception as e:
        # print(str(e))
        # error retriving isRecommended from database
        return {"message":"error","error":str(e)}


    try:
        db.collection("restaurant").document(restaurantId).update({'isRecommended':not isRecommended})
    except Exception as e:
        # print(str(e))
        # error changing isRecommended from database
        return {"message":"error","error":str(e)}
        
    return {"message":"Success"}
    # return redirect(url_for('allRestaurant'))


# This function will change the recommend status of the food item, will be used by admin
@views.route('/changeRecommendFoodItem/<restaurantId>/<foodItemId>',methods=['POST','GET'])
def changeRecommendFoodItem(restaurantId,foodItemId):
    if session['user']['userType'] != 'admin':
        return {"message":"error"}
        # return redirect(url_for('logout'))
    # id=int(id_to_change)
    # id=id-1
    
    # foodIemId = requestt['id']

    # restaurantId=None
    for i in range(len(session['currentMenu'])):
        if session['currentMenu'][i]['foodItemId']==foodItemId:
            session['currentMenu'][i]['isRecommended'] = not session['currentMenu'][i]['isRecommended']
            # restaurantId=session['currentMenu'][i]['restaurantId']
            break

    # if session['currentMenu'][id]['isRecommended'] == False:
    #     session['currentMenu'][id]['isRecommended'] = True
    #     session.modified = True
    # else :
    #     session['currentMenu'][id]['isRecommended'] = False
    #     session.modified = True

    # foodItemId=session['currentMenu'][id]['foodItemId']
    # restaurantId=session['currentMenu'][id]['restaurantId']

    isRecommended=""
    try:
        isRecommended = db.collection("restaurant").document(restaurantId).collection("foodItem").document(foodItemId).get().to_dict()['isRecommended']
    except Exception as e:
        # print(str(e))
        # error retriving isRecommended from database
        return {"message":"error","error":str(e)}


    try:
        db.collection("restaurant").document(restaurantId).collection("foodItem").document(foodItemId).update({'isRecommended':not isRecommended})
    except Exception as e:
        # print(str(e))
        # error changing isRecommended from database
        return {"message":"error","error":str(e)}

    return {"message":"Success"}
    # return redirect(url_for('allFoodItem11', restaurantUserId = restaurantId ))


# This function filters all the restaurant from the database that are recommended and stores them in the list and then later shows that list
@views.route('/recommendedRestaurant')
def recommendedRestaurant():
    user=session['user']
    if not user['userType'] == 'customer':
        return {"message":"error"}
        # return redirect(url_for('logout'))
    restaurantList=[]
    tempRestaurantList=[]
    docs=db.collection('restaurant').stream()
    for doc in docs:
        temp_dict=doc.to_dict()
        temp_dict['userId']= doc.id
        #temp_dict['pic'] = getImageURL(temp_dict['picSrc'])
        # temp_dict['areaName'] = db.collection('area').document(temp_dict['areaId']).get().to_dict()['name']
        temp_dict['ratingValue'] = db.collection('rating').document(temp_dict['ratingId']).get().to_dict()['rating']
        tempRestaurantList.append(temp_dict)
    for restaurant in tempRestaurantList:
        if restaurant['isRecommended']:
            restaurantList.append(restaurant)
    session['restaurantList']=restaurantList
    session.modified = True

    return {"restaurantList":restaurantList}

# This is the front page for the create offer module, and show all the offer created, and a button to create new offers
@views.route('/createOffer')
def createOffer():
    user = session['user']
    if not user['userType'] == 'admin':
        return {"message":"error"}
        # return redirect(url_for('logout'))
    currentAdminId=session['userId']
    offerList=[]
    # Add statement for getting a docs for the offers
    docs=db.collection('offer').stream()
    for doc in docs:
        temp_dict=doc.to_dict()
        temp_dict['offerId']= doc.id
        offerList.append(temp_dict)
    try:
        message=session['offerAdditionMessage']
        session['offerAdditionMessage']="False"
    except:
        session['offerAdditionMessage']="False"
        message="False"
    return {"offerList": offerList}




# This function will show the page to add offer and will show the input fields
# @views.route('/addOffer')
# def addOffer():
#     if session['user']['userType'] != 'admin':
#         return redirect(url_for('logout'))
#     user = session['user']
#     if user['userType'] == 'admin':
#         message=session['offerAdditionMessage']
#         session['offerAdditionMessage']="False"
#         return render_template('addOffer.html', user=user, message=message)
#     else:
#         return redirect(url_for('logout'))


# This function will add the offers in the database that will be later used in the future
@views.route('/addOffer', methods=['POST','GET'])
def offerAdder():
    if session['user']['userType'] != 'admin':
        return {"message":"error"}
        # return redirect(url_for('logout'))

    requestt = json.loads(request.data)
    name = requestt['name']
    discount = requestt['discount']
    price = requestt['upperLimit']

    try:
        json_data = {
            "name" : name,
            "discount" : discount,
            "upperLimit": price,
            "offerId":""
        }

        doc_reference = db.collection("offer").document()
        doc_reference.set(json_data)
        db.collection("offer").document(doc_reference.id).update({"offerId":doc_reference.id})

        session['offerAdditionMessage']="Offer added successfully."
        return {"message":"Success"}
        # return redirect(url_for('createOffer'))

    except Exception as e:
        # print(str(e))
        session['offerAdditionMessage'] = "Error adding offer in database"
        return {"message":"error","error":str(e)}
        # return redirect(url_for('addOffer'))




# This function will show all the offers to the customer in the frontend
@views.route('/allOffer/<customer_id>')
def allOffer(customer_id):
    if session['user']['userType'] != 'admin':
        return {"message":"error"}
        # return redirect(url_for('logout'))
    # customer_id=int(customer_id)
    # customer_id=customer_id-1

    # session['customerGettingOffer']=session['customerList'][customer_id]['customerId']
    session['customerGettingOffer'] = customer_id
    offerList=[]
    docs = db.collection('offer').stream()
    # customerOffers = db.collection('customer').document(customer_id).collection('promotionalOfferId').stream()
    for doc in docs:
        temp_dict=doc.to_dict()
        temp_dict['offerId']= doc.id
        flag=False
        customerOffers = db.collection('customer').document(customer_id).collection('promotionalOfferId').stream()
        for offer in customerOffers:
            temp_offer = offer.to_dict()
            if temp_dict['offerId'] == temp_offer['offerId']:
                flag=True
                break
        if(flag):
            continue
        offerList.append(temp_dict)
    session['offerList'] = offerList
    session.modified = True
    # print(offerList)
    return {"offerList":offerList}


# This function will give offer to the customer in the backend.
@views.route('/giveOffer/<customerId>/<offerId>', methods=['POST','GET'])
def giveOffer(customerId, offerId):
    if session['user']['userType'] != 'admin':
        return {"message":'error'}
        return redirect(url_for('logout'))

    # toGive=int(toGive)
    # toGive=toGive-1

    # customerGettingOffer=session['customerGettingOffer']
    # offerId=session['offerList'][toGive]['offerId']

    try:
        offer_json_data = db.collection('offer').document(offerId).get().to_dict()
        doc_reference = db.collection("customer").document(customerId).collection("promotionalOfferId").document()
        offer_json_data['offerId']=offerId
        offer_json_data['customer_offerId']=doc_reference.id
        doc_reference.set(offer_json_data)

    except Exception as e:
        return {"message":"error", "error":str(e)}
        # pass

    return {"message":"Success"}
    # return redirect(url_for('allCustomers'))

# This will show all the offers received by the customer from the admin
@views.route('/offerListCustomer')
def offerListCustomer():
    if session['user']['userType'] != 'customer':
        return {"message":"error"}
        # return redirect(url_for('logout'))
    user=session['userId']
    offerList=[]
    docs = db.collection('customer').document(user).collection('promotionalOfferId').stream()
    for doc in docs:
        temp_dict=doc.to_dict()
        # temp_dict['offerId']= doc.id

        offerList.append(temp_dict)
    session['offerList']=offerList
    session.modified = True
    # print(offerList)
    return {"offerList":offerList}
    # return render_template('allOfferCustomer.html', offerList=offerList)


# This function will show the details of the order and based on the statuses, the information on the front end will change
@views.route('/moreDetailsDeliveryRequest/<orderId>', methods=['POST','GET'])
def moreDetailsDeliveryRequest(orderId):
    # print("Hello World")
    if session['user']['userType']!='deliveryAgent':
        return {"message":"error"}
        # return redirect(url_for('logout'))

    # if the status is no order, no information is retrieved from the database, nor anything is displayed
    # if status != "NoOrder":
    #     session['currentOrderDeliveryAgent'] = db.collection('order').document(session['currentOrderDeliveryAgent']['orderId']).get().to_dict()
    #     session.modified = True
    # showButton=3
    # if status == "NoOrder":
    #     printTable = False
    # else:
    #     printTable = True
    #     # This showButton are to chose which button to show
    #     if status == "Accept":
    #         showButton = 1
    #     elif status == "Details" and session['currentOrderDeliveryAgent']['updateLevel'] == 4 :
    #         showButton = 2
    #     elif status == "Details" and session['currentOrderDeliveryAgent']['updateLevel']==2:
    #         showButton = 0
    #     else:
    #         showButton = 3

    requestt = json.loads(request.data)
    # print("Hello World")
    # print(requestt)
    orderId = requestt['id']

    currentOrder = None
    customerName = None
    restaurantName = None
    address = None
    orderList = None
    cost = None
    discount = None
    deliveryCharge = None
    final = None
    # Retrieving data from the database
    #if status != "NoOrder":
    currentOrder = db.collection('order').document(orderId).get().to_dict()
    customerName = db.collection('customer').document(currentOrder['customerId']).get().to_dict()['name']
    restaurantName = db.collection('restaurant').document(currentOrder['restaurantId']).get().to_dict()['name']
    address = db.collection('customer').document(currentOrder['customerId']).get().to_dict()['address']
    orderList = currentOrder['orderList']
    cost = currentOrder['orderValue']
    discount = int(currentOrder['discountValue'])
# print(discount)
    deliveryCharge = currentOrder['deliveryCharge']
    final = currentOrder['paidValue']

    return {"customerName":customerName, "restaurantName":restaurantName, "address":address, "orderList":orderList, "cost":cost, "discount":discount, "deliveryCharge":deliveryCharge, "final":final}
    #return render_template('moreDetailsDeliveryAgent.html', customerName=customerName, restaurantName=restaurantName, address = address, orderList=orderList, cost= cost, discount=discount, deliveryCharge=deliveryCharge, final= final, showButton = showButton, printTable = printTable)



# This function will show the order details for the order that the delivery agent chooses from the table
# will see the list from the one stored in session
@views.route('/orderDetailDeliveryAgent<orderId>')
def orderDetailDeliveryAgent(orderId):
    if session['user']['userType'] != 'deliveryAgent':
        return redirect(url_for('logout'))
    orderId=int(orderId)
    orderId = orderId-1
    session['currentOrderDeliveryAgent']=session['currentDeliveryRequest'][orderId]
    session.modified = True
    return redirect(url_for('moreDetailsDeliveryRequest', status = "Details"))


# This will show the current order of the delivery Agent
# If there is no current order accepted, then no order will be shown, and a message will be displayed on the page
@views.route('/currentOrderDeliveryAgent')
def currentOrderDeliveryAgent():
    if session['user']['userType'] != 'deliveryAgent':
        return redirect(url_for('logout'))
    user=session['user']
    currentOrderId = db.collection(user['userType']).document(session['userId']).get().to_dict()['currentOrderId']
    if currentOrderId == "":
        return redirect(url_for('moreDetailsDeliveryRequest', status = "NoOrder"))
    else:
        session['currentOrderDeliveryAgent'] = db.collection('order').document(currentOrderId).get().to_dict()
        session.modified = True
        return redirect(url_for('moreDetailsDeliveryRequest', status = "Details"))


# The below functions are to take care of the rating, we are updating the rating document in the firebase database
# The rating are ranged from 0 to 5 and are stored as double

# This function rates the customer, and the rating is done by the deliveryagent
@views.route('/ratingDeliveryAgent/<orderId>', methods=['POST', 'GET'])
def ratingDeliveryAgent(orderId):

    # To prevent un-accessed use through links
    if session['user']['userType']!='deliveryAgent':
        return {"message":"error"}
        # return redirect(url_for('logout'))

    try:
        requestt = json.loads(request.data)
        # print(requestt)
        orderId = requestt['id']

        currentOrder = db.collection('order').document(orderId).get().to_dict()
        customerId=currentOrder['customerId']

        rating=requestt['rating']
        rating=int(rating)

        ratingId=db.collection('customer').document(customerId).get().to_dict()['ratingId']
        ratingObject=db.collection('rating').document(ratingId).get().to_dict()

        ratingObject['inputs'] = ratingObject['inputs'] + 1
        ratingObject['sum'] = ratingObject['sum'] + rating
        ratingObject['rating'] = ratingObject['sum']/ratingObject['inputs']

        db.collection('rating').document(ratingId).set(ratingObject)

        # currentOrder = session['currentOrderDeliveryAgent']

        # Update the order for the update done by the delivery agent and mention it as delivered
        db.collection('order').document(currentOrder['orderId']).update({'updateMessage': "Order Delivered"})
        db.collection('order').document(currentOrder['orderId']).update({'updateLevel': 5})
        db.collection('order').document(currentOrder['orderId']).update({'isPending': False})
        db.collection('customer').document(currentOrder['customerId']).update({'pendingOrderId' : firestore.ArrayRemove([currentOrder['orderId']])})
        db.collection('restaurant').document(currentOrder['restaurantId']).update({'pendingOrderId' : firestore.ArrayRemove([currentOrder['orderId']])})
        db.collection('deliveryAgent').document(currentOrder['deliveryAgentId']).update({'isAvailable' : True})
        db.collection('deliveryAgent').document(currentOrder['deliveryAgentId']).update({'currentOrderId': ""})
        session['currentOrderDeliveryAgent']=None
        session.modified=True
        return {"message":"Success"}
    except Exception as e:
        return {"message":"error","error":str(e)}
    # return redirect(url_for('deliveryAgentDashboard'))


# This will take the rating from the customer after the order is delivered
# This can be accessed by going in past orders and more details in customer dashboard
# Changing the rating of the restaurant and the delivery agent
@views.route('/ratingCustomer/<orderId>', methods=['POST', 'GET'])
def ratingCustomer(orderId):

    if session['user']['userType']!='customer':
        return {"message":"error"}
        # return redirect(url_for('logout'))


    # orderId=session['customerCurrentOrderChanging']['orderId']
    requestt = json.loads(request.data)

    orderId = requestt['id']

    db.collection('order').document(orderId).update({'updateLevel': 6})
    deliveryAgentId = db.collection("order").document(orderId).get().to_dict()['deliveryAgentId']

    print(deliveryAgentId)
    
    deliveryAgentRating=requestt['ratingDeliveryAgent']
    deliveryAgentRating=int(deliveryAgentRating)

    deliveryAgentRatingId=db.collection('deliveryAgent').document(deliveryAgentId).get().to_dict()['ratingId']
    deliveryAgentRatingObject=db.collection('rating').document(deliveryAgentRatingId).get().to_dict()



    deliveryAgentRatingObject['inputs'] = deliveryAgentRatingObject['inputs'] + 1
    deliveryAgentRatingObject['sum'] = deliveryAgentRatingObject['sum'] + deliveryAgentRating
    deliveryAgentRatingObject['rating'] = deliveryAgentRatingObject['sum']/deliveryAgentRatingObject['inputs']

    db.collection('rating').document(deliveryAgentRatingId).set(deliveryAgentRatingObject)


    restaurantId = db.collection("order").document(orderId).get().to_dict()['restaurantId']
    restaurantRating=requestt['ratingRestaurant']
    restaurantRating=int(restaurantRating)

    restaurantRatingId=db.collection('restaurant').document(restaurantId).get().to_dict()['ratingId']
    restaurantRatingObject=db.collection('rating').document(restaurantRatingId).get().to_dict()

    restaurantRatingObject['inputs'] = restaurantRatingObject['inputs'] + 1
    restaurantRatingObject['sum'] = restaurantRatingObject['sum'] + restaurantRating
    restaurantRatingObject['rating'] = restaurantRatingObject['sum']/restaurantRatingObject['inputs']

    db.collection('rating').document(restaurantRatingId).set(restaurantRatingObject)

    return {"message":"Success"}
    # return redirect(url_for('pastOrder'))
