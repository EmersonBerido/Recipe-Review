from flask import Flask
from supabase import create_client, Client
from dotenv import load_dotenv
import os

load_dotenv()
POSTGRES_URL = os.getenv("POSTGRES_URL")
POSTGRES_KEY = os.getenv("POSTGRES_KEY")

supabase: Client = create_client(POSTGRES_URL, POSTGRES_KEY)

app = Flask(__name__)
#print(supabase.table("users").select("*").execute())

@app.route('/login/<int:is_new_user>/<email>/<password>')
def handleLogin(is_new_user, email, password):
    # fetch user from db, 
    if is_new_user == 1:
        # Means new user, add to db
        return f"New user created: {email} with password {password}"
    else:
        # Means existing user, fetch from db, verify password
        return "Hello, World!"