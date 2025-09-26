import {useNavigate} from "react-router-dom";
import {useState} from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
//Important Notes:
// 1. Logging in will send you to /home
// 2. Will use oAuth in the future for authentication
// 3. For now, it will store in local storage
// 4. When logging in, username and pfp will be saved in pfp
// 5. Maybr add a forget password


function Login() {
  const navigate = useNavigate();
  console.log("hi")

  const [existingUser, setExistingUser] = useState(true);

  function handleLogin(event : any) 
  {
    event.preventDefault();
    console.log("Logging in");

    //user will be stored with name user, and values name and pfp
    // for now, password will also be stored in local storage

    const data = localStorage.getItem("user")

    if (existingUser)
    {
      //check if user exists in database
      //local storage for now
      if (data === null)
      {
        alert("User doesn't exist");
      }
      else if (JSON.parse(data).password === event.target.password.value)
      {
        console.log("User logged in");
        navigate("/home");
      }
      else
      {
        alert("wrong password");
      }
    }
    else
    {
      //add user to database; local storage
      localStorage.setItem("user",JSON.stringify({
        username : event.target.username.value, 
        password : event.target.password.value,
        picture : "PLACEHOLDER; REPLACE SOON!"
      }));
      console.log("User created");
      navigate("/home");
    }
  }

  return (
    <main>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input type="text" name="username" placeholder="Username" required/>
        <input type="password" name="password" placeholder="Password" required/>
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