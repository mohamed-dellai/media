import axios from "axios"
import { useState } from "react"


import { useNavigate } from "react-router-dom"
export function SignIn(){

   const [message,setMessage]=useState('')
   let navigate=useNavigate()
   console.log(message)
   const send=async ()=>{
    try{
        const data={
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        }
        const respond= await axios.post("http://localhost:5000/signin",data)
        
        if(respond.request.responseText==="{\"error\":\"exist\"}"){
  
              setMessage("User already exist please try again ")
              
        }
        else if(respond.request.responseText==="{\"error\":\"false\"}"){
          setMessage("signIn succssefully you can logIn")

          setTimeout(()=>navigate("/home"),500)
        }
        else{
          setMessage("Server Error ")
        }

    }
    catch(e){
      console.log(e)
    }
}
    return(
        
    <div className="container1">
     
      <form id="form" action="" method="" >
       
        <h3>signup</h3>
        
        <fieldset>
          <label htmlFor="name">Your name:</label>
          <input type="text" id="name" tabIndex="1" required/>
        </fieldset>
        <fieldset>
            <label htmlFor="email">Email address:</label>
            <input type="email" id="email" required/>
        </fieldset>
        <fieldset>
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="password" required/>
        </fieldset>
        <fieldset>
            <label htmlFor="verifie">Confirm password:</label>
            <input type="password" name="confirm_password" id="confirm_password" required/>
        </fieldset>
        <fieldset>
          <button name="submit" type="button" onClick={send}id="submit">submit</button>
          <p style={{textAlign: "center" , color:"black"}}>{message}</p>
        </fieldset>
        
        <p className="copyright">Already have an account? <a href="/">login</a></p>
        
      </form>
      </div>

    )

}