
from logging import exception
from os import name
import os
import firebase_admin
from flask.helpers import url_for
import pyrebase
from firebase_admin import credentials, auth, firestore, storage
import json
import datetime
import requests
from requests.exceptions import HTTPError


cred = credentials.Certificate('website/fbadminconfig.json')
firebase = firebase_admin.initialize_app(cred, json.load(open('website/fbconfig.json')))
pyrebase_pb = pyrebase.initialize_app(json.load(open('website/fbconfig.json')))
db = firestore.client()



DEBUG=True



def testRestaurantsignup(email,password,area,name):
    
    error_message=[]
    try:
        user = auth.create_user(
            email=email,
            password=password
        )
        
    except Exception as e:
        error_message.append(str(e))
    try:
        json_data = {
            "name" : name,
            "areaId" : area,
            "ratingId": "",
            "restaurantId" : user.uid,
            
            "pendingOrderId": [],
            "completedOrderId": [],
            "email" : email,
            "isRecommended" : False
        }
        db.collection("restaurant").document(user.uid).set(json_data)
        db.collection("userType").document(user.uid).set({"userType" : "restaurant"})
        
    except Exception as e:
        error_message.append(str(e))
    

    if(len(error_message)==0):
        return "PASSED"
    else :
        if DEBUG:
            print("testRestaurantsignup")
            print(error_message)
        return "FAILED"
    
def testDeliveryAgentsignup(email,password,gender,area,mobile,name):
    
    error_message=[]
    try:
        user = auth.create_user(
            email=email,
            password=password
        )
        
    except Exception as e:
        error_message.append(str(e))
    
    try:
        json_data = {
            "name" : name,
            
            "mobileNumber" : mobile,
            
            "email" : email,
            "gender" : gender,
            "areaId" : area,
            "deliveryAgentId" : user.uid,
            "ratingId" : "",
            "isAvailable" : True
        }
        db.collection("deliveryAgent").document(user.uid).set(json_data)
        db.collection("userType").document(user.uid).set({"userType" : "deliveryAgent"})
    except Exception as e:
        error_message.append(str(e))
    

    if(len(error_message)==0):
        return "PASSED"
    else :
        if DEBUG:
            print("testDeliveryAgentsignup")
            print(error_message)
        return "FAILED"


def testCustomerSignup(email,password,gender,area,mobile,name):

    error_message=[]
    

    try:
        user = auth.create_user(
            email=email,
            password=password
        )
        
    except Exception as e:
        error_message.append(str(e))
    
    # add data in fire-store
    try:
        json_data = {
            "name" : name,
        
            "mobileNumber" : mobile,
            "email" : email,
            "gender" : gender,
            "areaId" : area,
            "customerId":user.uid,
            "ratingId":"",
            
        }
        db.collection("customer").document(user.uid).set(json_data)
        db.collection("userType").document(user.uid).set({"userType" : "customer"})
    except Exception as e:
        error_message.append(str(e))

    

    if(len(error_message)==0):
        return "PASSED"
    else :
        if DEBUG:
            print("testCustomerSignup")
            print(error_message)
        return "FAILED"
    
def testGetAllCustomer():
    customerList=[]
    error_message=[]
    try:
        docs=db.collection('customer').stream()
        for doc in docs:
            temp_dict=doc.to_dict()
            temp_dict['user_id']= doc.id
            customerList.append(temp_dict)
    except Exception as e:
        error_message.append(str(e))

    if(len(error_message)==0):
        return "PASSED - fetch "+str(len(customerList))+" customers"
    else :
        if DEBUG:
            print("testGetAllCustomer")
            print(error_message)
        return "FAILED"


def testGetAllDelivery():
    deliveryList=[]
    error_message=[]
    try:
        docs=db.collection('deliveryAgent').stream()
        for doc in docs:
            temp_dict=doc.to_dict()
            temp_dict['user_id']= doc.id
            deliveryList.append(temp_dict)
    except Exception as e:
        error_message.append(str(e))

    if(len(error_message)==0):
        return "PASSED - fetch "+str(len(deliveryList))+" delivery agents"
    else :
        if DEBUG:
            print("testGetAllDelivery")
            print(error_message)
        return "FAILED"
    
def testGetAllRestaurant():
    restaurantList=[]
    error_message=[]
    try:
        docs=db.collection('restaurant').stream()
        for doc in docs:
            temp_dict=doc.to_dict()
            temp_dict['user_id']= doc.id
            restaurantList.append(temp_dict)
    except Exception as e:
        error_message.append(str(e))

    if(len(error_message)==0):
        return "PASSED - fetch "+str(len(restaurantList))+" restaurants"
    else :
        if DEBUG:
            print("testGetAllRestaurant")
            print(error_message)
        return "FAILED"
    

def testdelete_user(user_id):

    error_message=[]

    user_type=""

    try:
        auth.delete_user(user_id)
    except Exception as e:
        error_message.append(str(e))

    try:
        user_type = db.collection('userType').document(user_id).get().to_dict()["userType"]
        # if(user_type=="restaurant"):
        #     # If you have larger collections, you may want to delete the documents in smaller batches to avoid out-of-memory errors.
        #     delete_collection(db.collection("restaurant").document(user_id).collection("foodItem"),1000)
        db.collection(user_type).document(user_id).delete()
        db.collection("userType").document(user_id).delete()
    except Exception as e:
        error_message.append(str(e))

    

    if(len(error_message)==0):
        return "PASSED"
    else :
        if DEBUG:
            print("delete_user")
            print(error_message)
        return "FAILED"

    

if __name__ == "__main__":

    '''
    these are the caller functions
    '''

    # print(testRestaurantsignup("7stars@gmail.com","1234056","Delhi","5star"))
    # print(testDeliveryAgentsignup("omsadhwani@gmail.com","234567","Male","vadodara",1236547890,"Om"))
    # print(testCustomerSignup("ou@gmail.com","546321","Female","jflks",1236547890,"iopl"))
    # print(testGetAllCustomer())
    # print(testGetAllDelivery())
    # print(testGetAllRestaurant())
    #print(testdelete_user("5Jm3XBHGRgd4GSIXcf0gwzJ6BLu1"))
    
    # calltestdelete_user()
    # calltestfoodItemAdder()
    # calltestGetMenu()
    # calltestSignIn()
    # calltestGetAllRestaurant()
    # calltestGetAllCustomer()
    # calltestGetAllDelivery()
    # calltestchangeRecommendFoodItem()
    # calltestchangeRecommendedRestaurant()
    # calltestgetRecommendedRestaurant()
