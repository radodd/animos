# # serializes a user object and returns it as a dictionary format
# def user_serializer(user) -> dict:
#     return {
#         "id": str(user["_id"]),
#         "username": user["username"],
#         "first_name": user["first_name"],
#         "last_name": user["last_name"],
#         "email": user["email"],
#         "zipcode": user["zipcode"],
#         "picture_url": user["picture_url"]
#     }


# # serializes a list of users and calls the user serializer function
# # on each user to serialize it into a dictionary
# # resulting dictionaries are contained in a new list
# # def users_serializer(users) -> list:
# #     return [user_serializer(user) for user in users]
# def users_serializer(users) -> list:
#     return [user_serializer(user) for user in users]
