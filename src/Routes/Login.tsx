import {useNavigate} from "react-router-dom";
import {useState} from "react";
import { GoogleLogin } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";

//Important Notes:
// 1. Logging in will send you to /home
// 2. Will use oAuth in the future for authentication
// 3. For now, it will store in local storage
// 4. When logging in, username and pfp will be saved in pfp
// 5. Maybr add a forget password
const loginAPI : string = import.meta.env.VITE_RENDER_API;

function Login() {
  const navigate = useNavigate();
  console.log("hi")

  const [existingUser, setExistingUser] = useState(true);

  async function handleSignup(event : any)
  {
    event.preventDefault();

    try
    {
      const emailRes = event.target.elements.userEmail.value;
      const passwordRes = event.target.elements.password.value;

      const response = await fetch(loginAPI + "/login", {
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({
          email : emailRes,
          password : passwordRes,
          isNewUser : true
        })
      })
        .then(res => res.json())
        .then(response => {
          switch (response.status)
          {
            case 400:
              console.error(response.message);
              break;
            case 200:
              console.log("New user created !");
              localStorage.setItem("username", response.message);
              navigate("/home");
              break;
          }
        })
    }
    catch (error)
    {
      console.error(error);
    }
  }
  // Non-oAuth Login
  async function handleLogin(event : any) 
  {
    
    // - Returning User -
    // Checks if email exists in database
    // if so, checks if password is correct
    // if so, save username/email in local storage
    // nav to home

    // - New User -
    // Post new user to SQL database
    // save username/email in local storage
    // nav to home




    event.preventDefault();
    console.log("Logging in");

    try {
      const emailRes = event.target.elements.userEmail.value;
      const passwordRes = event.target.elements.password.value;

      console.log("before fetch")
      // get response
      const response = await fetch(loginAPI + "/login", {
        method : 'POST',
        headers : {'Content-Type' : "application/json"},
        body : JSON.stringify({
          email : emailRes,
          password : passwordRes,
          isNewUser : false
        })
      })
  
      //check statuscode : 200, 400, 401
      console.log("before switch")
      switch (response.status)
      {
        case 200:
          console.log("login successful");
          const res = await response.json();
          localStorage.setItem("username", res.message);
          navigate("/home");
          break;
        case 400:
          alert("User doesn't exist");
          break;
        case 401:
          alert("Wrong password");
          break;
      }
    }
    catch (error)
    {
      console.error("found error: ", error);
    }

  }

  // OAuth interface; so TS knows what to expect
  interface LoginInfo {
    email : string
  }

  function handleOAuthLogin()
  {
    // TODO: check if email in database using jwtDecode(creds.credential!).email
    // then pass that in to the backend to check if user exists
    // if backend returns true, log in

    if (localStorage.getItem("user") === null)
    {
      
    }
  }

  return (
    <main>
      <h1>Login</h1>
      <form onSubmit={existingUser ? handleLogin : handleSignup}>
        <input type={existingUser ? "text" : "email"} name="userEmail" placeholder={existingUser ? "Email/Username" : "Email"} required/>
        <input type="password" name="password" placeholder="Password" required/>
        <GoogleLogin 
          onSuccess={(creds) => {
            const loginInfo = jwtDecode<LoginInfo>(creds.credential!);
            console.log(loginInfo.email);
            localStorage.setItem("username", loginInfo.email);
            navigate("/home");
          }} 
          onError={() => {
            console.log("Login Failed");
          }}
        />
        <button type="submit">{existingUser ? "Log in" : "Sign Up"}</button>
        {existingUser 
        ? 
          <button type="button" onClick={() => setExistingUser(false)}>
            New User?
          </button>
        : 
          <button type="button" onClick={() => setExistingUser(true)}>
            Have an account?
          </button>
        }
  
      </form>
    </main>
  )
}

export default Login;