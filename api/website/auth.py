from flask import Blueprint, request, redirect, url_for, session, render_template,json
from .models import db,pyrebase_pb
from firebase_admin import auth
import time


Auth = Blueprint('Auth',__name__)


@Auth.route('/customerLogin',methods=['GET','POST'])
def customerLogin():
    if request.method == 'POST':
        requestt = json.loads(request.data)
        # print(requestt)
        email = requestt['email']
        password = requestt['password']

        try:

            time.sleep(0.01)
            user = pyrebase_pb.auth().sign_in_with_email_and_password(email, password)

            type_json = db.collection("userType").document(user["localId"]).get().to_dict()
            print(type_json)
            if (type_json["type"]!="customer"):
                message="Invalid credentials!"
                return {"message": message}

            json_data = db.collection("customer").document(user["localId"]).get().to_dict()
            session['user'] = json_data
            session['userId'] = session['user']['customerId']
            session['user']['userType'] = "customer"
            return {"message": "Success"}


            


        except Exception as e:
            message=e
            message+="Unable to process request"
            return {"message": message}




@Auth.route('/customerSignup',methods=['GET','POST'])
def customerSignup():
    if request.method == 'POST':
        requestt = json.loads(request.data)
        # print(requestt)
        name = requestt['name']
        email = requestt['email']
        gender = requestt['gender']
        mobile = requestt['mobile']
        area = requestt['area']        
        address = requestt['address']

        password = requestt['password']
        confirmpassword = requestt['confirmpassword']

        #checks...
        if len(name)<2 or len(address)<2 or password!=confirmpassword:
            if(len(name))<2:
                message="Name is too short"
            elif len(address)<2:
                message="Address is too short"
            elif password!=confirmpassword:
                message="Both the passwords don't match"

            return {"message":message}
        else:
            #add user to database
            try:

                user = auth.create_user(email=email, password=password)

            except ValueError as v:
                message="Error "+str(v)
                return {"message":message}
            except Exception as e:
                message="Error "+str(e)
                message+="Unable to process request!"
                return {"message":message}
            
            try:
                rating_ref = db.collection("rating").document()
                rating_json_data = {"inputs":0, "sum":0.0, "rating":0.0, "ratingId":rating_ref.id}
                rating_ref.set(rating_json_data)

                customer_json_data = {
                    "name": name,
                    "email": email,
                    "customerId":user.uid,
                    "ratingId":rating_ref.id,
                    "gender": gender,
                    "mobileNumber": mobile,
                    "area": area,
                    "address": address,
                    "pendingOrderId": []
                    #fill it up....
                }
                db.collection("customer").document(user.uid).set(customer_json_data)
                db.collection("userType").document(user.uid).set({"type":"customer"})
                # db.collection("userType").document(user.uid).set({"type":"customer"})
                
            except Exception as e:
                message="Error: "+str(e)
                message+=". Unable to process request!"
                return {"message":message}

            message="Success"
            return {"message": message}
     
    



@Auth.route('/restaurantLogin',methods=['GET','POST'])
def restaurantLogin():
    if request.method == 'POST':
        requestt = json.loads(request.data)
        print(requestt)
        email = requestt['email']
        password = requestt['password']

        try:

            time.sleep(0.01)
            user = pyrebase_pb.auth().sign_in_with_email_and_password(email, password)

            type_json = db.collection("userType").document(user["localId"]).get().to_dict()
            if (type_json["type"]!="restaurant"):
                message="Invalid credentials!"
                return {"message":message}
                # return redirect(url_for('Auth.restaurantLogin'))


            json_data = db.collection("restaurant").document(user["localId"]).get().to_dict()

            session['user'] = json_data
            session['userId'] = session['user']['restaurantId']
            session['user']['userType'] = "restaurant"

            # return redirect(url_for('views.restaurantDashboard'))
            return {"message":"Success"}


        except Exception as e:
            # print(e)
            # print("Unable to process request")
            message=str(e)
            message+=" Unable to process request"
            # return redirect(url_for('Auth.restaurantLogin'))
            return {"message":message}

    # return render_template('restaurant-login.html')


@Auth.route('/restaurantSignup',methods=['GET','POST'])
def restaurantSignup():
    if request.method == 'POST':
        requestt = json.loads(request.data)
        print(requestt)
        name = requestt['name']
        email = requestt['email']
        area = requestt['area']

        password = requestt['password']
        confirm_password = requestt['confirmpassword']

        #checks...
        if len(name)<2 or password!=confirm_password:
            if len(name)<2:
                message="Name is too short"
            else:
                message="Both the passwords don't match!"

            # return render_template('restaurant-signup.html',
            #                 name=name,
            #                 email=email,
            #                 area=area,
            #                 areas=areas)
            return {"message":message}
        else:
            #add user to database
            try:

                user = auth.create_user(email=email, password=password)

            except ValueError as v:
                print("Error: "+str(v))
                message=str(v)
                return {"message":message}
                # return render_template('restaurant-signup.html',
                #                 name=name,
                #                 email=email,
                #                 area=area,
                #                 areas=areas)

            except Exception as e:
                message="Error "+str(e)
                message+=" Unable to process request!"
                return {"message":message}
                # print("Error: "+str(e))
                # print("Unable to process request!")
                # return render_template('restaurant-signup.html',
                #                 name=name,
                #                 email=email,
                #                 area=area,
                #                 areas=areas)
            
            try:
                rating_ref = db.collection("rating").document()
                rating_json_data = {"inputs":0, "sum":0.0, "rating":0.0, "ratingId":rating_ref.id}
                rating_ref.set(rating_json_data)

                restaurant_json_data = {
                    "name": name,
                    "email": email,
                    "restaurantId":user.uid,
                    "ratingId":rating_ref.id,
                    "area": area,
                    "pendingOrderId": [],
                    "isRecommended": False
                    #fill it up....
                }
                db.collection("restaurant").document(user.uid).set(restaurant_json_data)
                db.collection("userType").document(user.uid).set({"type":"restaurant"})
                
            except Exception as e:
                message="Error: "+str(e)
                message+="Unable to process request!"
                # return redirect(url_for('Auth.restaurantSignup'))
                return {"message":message}

            # print("Successfully signed up. Now login with the same credentials!")
            
            # return redirect(url_for('Auth.restaurantLogin'))
            return {"message":"Success"}
     
    # return render_template('restaurant-signup.html',areas=areas)



@Auth.route('/deliveryAgentLogin',methods=['GET','POST'])
def deliveryAgentLogin():
    if request.method == 'POST':
        requestt = json.loads(request.data)
        print(requestt)
        email = requestt['email']
        password = requestt['password']

        try:

            time.sleep(0.01)
            user = pyrebase_pb.auth().sign_in_with_email_and_password(email, password)

            type_json = db.collection("userType").document(user["localId"]).get().to_dict()
            if (type_json["type"]!="deliveryAgent"):
                message="Invalid credentials!"
                return {"message": message}


            json_data = db.collection("deliveryAgent").document(user["localId"]).get().to_dict()

            session['user'] = json_data
            session['userId'] = session['user']['deliveryAgentId']
            session['user']['userType'] = "deliveryAgent"

            return {"message":"Success"}


        except Exception as e:
            message=str(e)
            message+=". Unable to process request"
            return {"message":message}

    

@Auth.route('/deliveryAgentSignup',methods=['GET','POST'])
def deliveryAgentSignup():
    if request.method == 'POST':
        requestt = json.loads(request.data)
        print(requestt)
        name = requestt['name']
        email = requestt['email']
        gender = requestt['gender']
        area = requestt['area']
        mobile = requestt['mobile']

        password = requestt['password']
        confirmpassword = requestt['confirmpassword']

        #checks...
        if len(name)<2 or password!=confirmpassword:
            if len(name)<2:
                message="Name is too short"
            elif password!=confirmpassword:
                message="Both the passwords don't match!"

            return {"message": message}
        else:
            #add user to database
            try:

                user = auth.create_user(email=email, password=password)

            except ValueError as v:
                message="Error: "+str(v)
                return {"message": message}

            except Exception as e:
                message="Error: "+str(e)
                message+="Unable to process request!"
                return {"message":message}
            
            try:
                rating_ref = db.collection("rating").document()
                rating_json_data = {"inputs":0, "sum":0.0, "rating":0.0, "ratingId":rating_ref.id}
                rating_ref.set(rating_json_data)

                deliveryAgent_json_data = {
                    "name": name,
                    "email": email,
                    "deliveryAgentId":user.uid,
                    "ratingId":rating_ref.id,
                    "mobileNumber": mobile,
                    "gender": gender,
                    "area": area,
                    "isAvailable": True,
                    "currentOrderId": ""
                    #fill it up....
                }
                db.collection("deliveryAgent").document(user.uid).set(deliveryAgent_json_data)
                db.collection("userType").document(user.uid).set({"type":"deliveryAgent"})
                # return {"message": "Success"}
                
            except Exception as e:
                message="Error: "+str(e)
                message="Unable to process request!"
                return {"message":message}

            message="Successfully signed up. Now login with the same credentials!"
            return {"message":"Success"}
     
    



@Auth.route('/managementLogin',methods=['GET','POST'])
def managementLogin():
    if request.method == 'POST':
        requestt = json.loads(request.data)
        print(requestt)
        email = requestt['email']
        password = requestt['password']

        try:

            time.sleep(0.01)
            user = pyrebase_pb.auth().sign_in_with_email_and_password(email, password)

            type_json = db.collection("userType").document(user["localId"]).get().to_dict()
            if (type_json["type"]!="admin"):
                message="Invalid credentials!"
                return {"message": message}


            json_data = db.collection("admin").document(user["localId"]).get().to_dict()

            session['user'] = json_data
            session['userId'] = session['user']['adminId']
            session['user']['userType'] = "admin"

            return {"message":"Success"}


        except Exception as e:
            message=str(e)
            message+=". Unable to process request"
            return {"message":message}

# @Auth.route('/managementSignup',methods=['GET','POST'])
# def managementSignup():
#     # if request.method == 'POST':
#     #     email = request.form.get('email')
#     #     password = request.form.get('password')

#     #     #....to complete..
     
#     return "<p>management sign up page</p>"


@Auth.route('/logout')
def logout():
    session.clear()
    return {'message' : 'Success'}