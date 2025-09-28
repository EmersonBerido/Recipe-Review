from flask import Flask
from supabase import create_client, Client
from dotenv import load_dotenv
import os

load_dotenv()
POSTGRES_URL = os.getenv("POSTGRES_URL")
POSTGRES_KEY = os.getenv("POSTGRES_KEY")

supabase: Client = create_client(POSTGRES_URL, POSTGRES_KEY)

app = Flask(__name__)
print(supabase.table("users").select("*").execute())

@app.route('/login/<int:is_new_user>/<name_email>/<password>')
def handleLogin(is_new_user, name_email, password):
    # is_new_user:
    # 1 for new user
    # 0 for existing user


    # if user entered username, fetch email from db
    required_email = supabase.table("users").select("email").eq("username", name_email).execute() if supabase.table("users").select("email").eq("username", name_email).execute().data else name_email

    # look for password in db
    required_password = supabase.table("users").select("password").eq("email", required_email).execute() if supabase.table("users").select("password").eq("email", required_email).execute().data else None

    # checks if user is new or existing
    if is_new_user == 1:
        # Means new user, add to db
        supabase.table("users").insert({"email" : required_email, "password" : password}).execute()
        return f"New user created: {required_email}"
    else:
        # does user exist?
        if not required_password:
            return "<h1>User doesn't exist</h1>"
        
        # Does password match?
        if required_password == password:
            return "<h1>Login successful</h1>"
        return "<h1>Incorrect password</h1>"
