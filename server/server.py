from flask import Flask, request, jsonify
from flask_cors import CORS
from supabase import create_client, Client
from dotenv import load_dotenv
import os

load_dotenv()
POSTGRES_URL = os.getenv("POSTGRES_URL")
POSTGRES_KEY = os.getenv("POSTGRES_KEY")

supabase: Client = create_client(POSTGRES_URL, POSTGRES_KEY)

app = Flask(__name__)
CORS(app)


@app.route('/login', methods=['POST'])
def login():

    # Get Request Body
    data = request.get_json()
    password = data.get("password")
    is_new_user = data.get("isNewUser")

    if (is_new_user):
        email = data.get("email")

        # user already exist?
        if supabase.table("users").select("email").eq("email", email).execute().data:
            return jsonify(success=False, message="User already exists"), 400
        
        # create new user
        supabase.table("users").insert({"email" : email, "password" : password}).execute()
        return jsonify(success=True, message=email), 200 # returns email for local storage
    else:
        # if user entered username and not email
        # if data exists for that username, set it to the email associated with it; if not set it to req body 
        email = supabase.table("users").select("email").eq("username", data.get("email")).execute().data[0]["email"] if supabase.table("users").select("email").eq("username", data.get("email")).execute().data else data.get("email")
        print(f"email after if: {email}")

        # if email doesn't exists in db
        if not supabase.table("users").select("email").eq("email", email).execute().data:
            return jsonify(success=False, message="User doesn't exists"), 400

        required_password = supabase.table("users").select("password").eq("email", email).execute().data[0]["password"]
        
        if required_password == password:
            return jsonify(success=True, message=email), 200
        return jsonify(success=False, message="Incorrect password"), 401
    
    


# Route to handle login and user creation
# @app.route('/login/<int:is_new_user>/<name_email>/<password>')
# def handleLogin(is_new_user, name_email, password):
#     # is_new_user: 1 (new user), 0 (existing user)

#     # if user entered username, fetch email from db
#     required_email = supabase.table("users").select("email").eq("username", name_email).execute() if supabase.table("users").select("email").eq("username", name_email).execute().data else name_email

#     # look for password in db
#     required_password = supabase.table("users").select("password").eq("email", required_email).execute().data[0]['password'] if supabase.table("users").select("password").eq("email", required_email).execute().data else None

#     # checks if user is new or existing
#     if is_new_user == 1:
#         # Is email already registered
#         if required_password:
#             return "<h1>User already exists</h1>"
        
#         supabase.table("users").insert({"email" : required_email, "password" : password}).execute()
#         return {required_email}, 200
#     else:
#         # user exist?
#         if not required_password:
#             return "false", 400
        
#         # password match?
#         if required_password == password:
#             return {required_email}, 200
#         return "false", 401
