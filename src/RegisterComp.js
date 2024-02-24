import axios from 'axios'
import {useState} from  'react'
import _ from 'lodash'
export default function Register(){
    const [name,setName] =useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword] =useState('')
    const [role,setRole] = useState('')
    const [serverError,setServerError] = useState({
        name:'',
        email:'',
        password:'',
        role:''
    })

    const [formError,setFormError]=useState({})
    const errors = {}
    const validateErrors =()=>{
        if(name.trim().length === 0){
            errors.name = 'name is required'
        }
        if(email.trim().length===0){
            errors.email = 'email is required'
        }
        if(password.trim().length === 0){
            errors.password = 'password is required'
        }
        if(role.length===0){
            errors.role = 'role is required'
        }
    }

    const handleSubmit =async (e)=>{
        e.preventDefault()
        const formData = {
            userName:name,
            email:email,
            password:password,
            role:role
        }
        validateErrors()
        if(_.isEmpty(errors)){
            try{
                const response =await axios.post('http://localhost:3055/api/user/register',formData)
                console.log(response.data)
                alert('registered succesfully')
                setFormError({})
                setServerError({
                    name:'',
                    email:'',
                    password:'',
                    role:''
                })

            }catch(err){
                alert(err.message)
                // console.log(err)
                const errors = err.response.data.error
                const serverErrors= {}
                serverErrors.name=errors.find((e)=>{
                    return e.path =='name'
                })
                serverErrors.email=errors.find((e)=>{
                    return e.path=='email'
                })
                serverErrors.password=errors.find((e)=>{
                    return e.path=='password'
                })
                serverErrors.role=errors.find((e)=>{
                    return e.path=='role'
                })
                console.log(serverError)
                setServerError(serverErrors)
            }   
        }else{
            setFormError(errors)
            console.log(formError)
        }
    }
    return(
        <div>
            <h3>Sign Up Here!</h3>
            <form onSubmit ={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input 
                type="text"
                value={name}
                onChange={(e)=>{
                    setName(e.target.value)
                }} />
                {formError.name&&<span style={{color:'red'}}>{formError.name}</span>}<br/>

                <label htmlFor="email">Email:</label>
                <input 
                type="text"
                value={email}
                onChange={(e)=>{
                    setEmail(e.target.value)
                }} />
                {(formError.email&&<span style={{color:'red'}}>{formError.email}</span>)}
                {(serverError.email?<span>{serverError.email.msg}</span>:<span></span>)}
                <br/>

                <label htmlFor="password">Password:</label>
                <input 
                type="password"
                value={password}
                onChange={(e)=>{
                    setPassword(e.target.value)
                    console.log(password)
                }} />
                {(formError.password&&<span style={{color:'red'}}>{formError.password}</span>)}
                {(serverError.password&&<span>{serverError.password.msg}</span>)}
                <br/>

                <sapn>select role:</sapn> 
                <label htmlFor="role">Candidate</label>
                <input 
                name ='role'
                id="role"
                type="radio"
                value='candidate'
                checked={role==='candidate'}
                onChange={(e)=>{
                    console.log(role)
                    setRole(e.target.value)
                }} />
                <label htmlFor="role">Recruiter</label>
                <input 
                name='role'
                id ="role"
                type="radio"
                value='recruiter'
                onChange={(e)=>{
                    setRole(e.target.value)
                    console.log(role)
                }} />
                {formError.role&&<span style={{color:'red'}}>{formError.role}</span>}<br/>
                <input type ="submit"/>
            </form>
        </div>
    )
}