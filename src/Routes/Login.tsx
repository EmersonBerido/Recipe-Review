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
      console.log(loginAPI + "/login")
      // get response
      const response = await fetch(loginAPI + "/login", {
        method : 'POST',
        headers : {'Content-Type' : "application/json"},
        body : JSON.stringify({
          email : emailRes,
          password : passwordRes,
          isNewUser : true
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


    // await fetch(`${existingUser ? 0 : 1}/${event.target.userEmail.value}/${event.target.password.value}`)
    //   .then(async res => {
    //     let resText = await res.text();
    //     if (res.status === 200)
    //     {
    //       localStorage.setItem("user", resText);
    //       navigate("/home");
    //     }
    //     else if (res.status === 400)
    //     {
    //       alert("User already exists");
    //     }
    //     else if (res.status === 401)
    //     {
    //       alert("wrong password");
    //     }
    //   })

    //user will be stored with name user, and values name and pfp
    // for now, password will also be stored in local storage

    // const data = localStorage.getItem("user")

    // if (existingUser)
    // {
    //   //check if user exists in database
    //   //local storage for now
    //   if (data === null) // if user doesnt exist
    //   {
    //     alert("User doesn't exist");
    //   }
    //   else if (JSON.parse(data).password === event.target.password.value) // if correct login
    //   {
    //     console.log("User logged in");
    //     navigate("/home");
    //   }
    //   else
    //   {
    //     alert("wrong password");
    //   }
    // }
    // else
    // {
    //   //add user to database; local storage
    //   localStorage.setItem("user",JSON.stringify({
    //     username : event.target.userEmail.value, 
    //     password : event.target.password.value,
    //     picture : "PLACEHOLDER; REPLACE SOON!"
    //   }));
    //   console.log("User created");
    //   navigate("/home");
    // }
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
      <form onSubmit={handleLogin}>
        <input type={existingUser ? "text" : "email"} name="userEmail" placeholder={existingUser ? "Email/Username" : "Email"} required/>
        <input type="password" name="password" placeholder="Password" required/>
        <GoogleLogin 
          onSuccess={(creds) => {
            const loginInfo = jwtDecode<LoginInfo>(creds.credential!);
            console.log(loginInfo.email);
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