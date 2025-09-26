import {useNavigate} from "react-router-dom";


function Login() {
  const Navigate = useNavigate();

  return (
    <main>
      <h1>Login</h1>
      <button onClick={() => Navigate("/home")}>Home</button>
    </main>
  )
}

export default Login;