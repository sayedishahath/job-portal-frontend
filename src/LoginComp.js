import axios from 'axios'
import { useState } from 'react'
import _ from 'lodash'
export default function Login(props){
    const [email,setEmail]=useState('')
    const [password, setPassword] = useState('')
    const [loggedInUser,setLoggedInUser] = useState(null)
    const [formError,setFormError] =useState({})
    const errors ={}

    const validateErrors =()=>{
        if(email.trim().length===0){
            errors.email = 'email is required'
        }
        if(password.trim().length === 0){
            errors.password = 'password is required'
        }
    }
    const handleLogin =async(e)=>{
        e.preventDefault()
        const formData={
            email:email,
            password:password
        }
        validateErrors()
        if(_.isEmpty(errors)){
            try{
                const response = await axios.post('http://localhost:3055/api/user/login',formData)
                console.log(response.data)
                console.log(response.data.data)
                setLoggedInUser(response.data.data)
                const token = response.data.token
                localStorage.setItem('token',token)
                alert('login success')
                props.loginSuccess()
                
            }catch(err){
                alert(err)
            }
        }else{
            setFormError(errors)
            console.log(formError)
        }
       
    }
    return(
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <label htmlFor='email'>email:</label>
                <input
                type="text"
                value={email}
                id="email"
                onChange={(e)=>{
                    setEmail(e.target.value)
                }} />
                {formError.email&&<p style={{color:'red'}}>{formError.email}</p>}

                <label htmlFor='password'>password:</label>
                <input
                type="password"
                value={password}
                id="password"
                onChange={(e)=>{
                    setPassword(e.target.value)
                }} />
                {formError.password&&<p style={{color:'red'}}>{formError.password}</p>}
                <input type="submit" value="Login" />
            </form>
            <hr/>
        </div>
    )
}