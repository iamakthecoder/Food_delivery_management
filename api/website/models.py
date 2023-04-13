import pyrebase
import firebase_admin
import json
from firebase_admin import credentials, firestore, storage,auth

cred = credentials.Certificate('website/fbadminconfig.json')
firebase = firebase_admin.initialize_app(cred, json.load(open('website/fbconfig.json')))
pyrebase_pb = pyrebase.initialize_app(json.load(open('website/fbconfig.json')))
db = firestore.client()
bucket = storage.bucket()


# def areaDatabase():
#     areas = ["Delhi","Mumbai","Calcutta"]

#     area_ref = db.collection("area").stream()
#     included_areas = []
#     for area in area_ref:
#         temp_dict = area.to_dict()
#         included_areas.append(temp_dict['name'])


#     for area in areas:
#         if area not in included_areas:
#             new_area_ref = db.collection('area').document()
#             new_area_json = {
#                 "name": area,
#                 "areaId": new_area_ref.id,
#                 "restaurantId": [],
#                 "orderIdForPickup": []
#             }
# # 
#             new_area_ref.set(new_area_json)


# def getDatabaseAreas():
#     areaDatabase()

#     areas_ref = db.collection('area').stream()
#     areas = []

#     for area in areas_ref:
#         temp_dict = area.to_dict()
#         areas.append(temp_dict)

#     return areas

# areas = getDatabaseAreas()

def addAdmins():
    names = ['Apoorv','Om','Ronit']
    emails = ['kumar@gmail.com','sadhwani@gmail.com','nanwani@gmail.com']
    passwords = ['123456','123456','123456']

    for i in range(len(emails)):
        try:
            user = auth.create_user(email=emails[i],password=passwords[i])
            admin_data = {
                "name":names[i],
                "email":emails[i],
                "adminId":user.uid
            }
            db.collection('admin').document(user.uid).set(admin_data)
            db.collection("userType").document(user.uid).set({"type":"admin"})
        except Exception as e:
            print(e)
            continue