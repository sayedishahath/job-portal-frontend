import axios from 'axios'
import {useState} from 'react'
export default function JobForm(){
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [minSalary,setMinSalary] = useState('')
    const [maxSalary,setMaxSalary] = useState('')
    const [requiredSkills,setRequiredSkills]= useState([])
    const [deadline,setDeadline] = useState('')
    const [location,setLocation] = useState('')
    const [formError,setFormError] = useState([])

   
    const errors = {}
    const validationResult =()=>{
        if(title.trim().length===0){
            errors.title = 'title is required'
        }
        if(description.trim().length===0){
            errors.description = 'description is required'
        }
        if(minSalary.trim().length===0){
            errors.minSalary = 'min salary is required'
        }
        if(maxSalary.trim().length===0){
            errors.maxSalary = 'max salary is required'
        }
        if(requiredSkills.trim().length===0){
            errors.requiredSkills = 'skills are required'
        }
        if(deadline.trim().length===0){
            errors.deadline = 'deadline is required'
        }
        if(location.trim().length===0){
            errors.location = 'location is required'
        }
    }
    

    const handleSubmit =async(e)=>{
        e.preventDefault()
        const formData ={
            title:title,
            description:description,
            salaryRange:{
                min:minSalary,
                max:maxSalary
            },
            requiredSkills:requiredSkills.split(','),
            deadline:deadline,
            location:location
        }
        validationResult()
        if(Object.keys(errors).length===0){
            try{
                const response = await axios.post('http://localhost:3055/api/jobs/create',formData,{ headers: {
                    Authorization: localStorage.getItem('token')
                }})
                alert('job created')
                console.log(response.data)
            }catch(err){
                alert(err)
                console.log(err)
            }   
        }else{
            setFormError(errors)
        } 
    }
    return(
        <div>
            <h2>create job</h2>
            <hr/>
            <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title: </label>
            <input 
            type='text' 
            id='title' 
            value={title}
            onChange={e=> setTitle(e.target.value)}/>
            {formError.title&&<span style={{color:"red"}}>{formError.title}</span>}<br/>


            <label htmlFor="description">Description: </label>
            <input 
            type='textarea' 
            id='description' 
            value={description}
            onChange={e=> setDescription(e.target.value)}/>
            {formError.description&&<span style={{color:"red"}}>{formError.description}</span>}<br/>

            <label htmlFor="minSalary">min salary: </label>
            <input 
            type='text' 
            id='minSalary' 
            value={minSalary}
            onChange={e=> setMinSalary(e.target.value)}/>
            {formError.minSalary&&<span style={{color:"red"}}>{formError.minSalary}</span>}<br/>

            <label htmlFor="maxSalary">max salary: </label>
            <input 
            type='text' 
            id='maxSalary' 
            value={maxSalary}
            onChange={e=> setMaxSalary(e.target.value)}/>
            {formError.maxSalary&&<span style={{color:"red"}}>{formError.maxSalary}</span>}<br/>

            <label htmlFor="requiredSkills">required Skills: </label>
            <input 
            type='text' 
            id='requiredSkills' 
            value={requiredSkills}
            onChange={e=> setRequiredSkills(e.target.value)}/>
            {formError.requiredSkills&&<span style={{color:"red"}}>{formError.requiredSkills}</span>}<br/>

            <label htmlFor="deadline">Deadline : </label>
            <input 
            type='date' 
            id='deadline' 
            value={deadline}
            onChange={e=> setDeadline(e.target.value)}/>
            {formError.deadline&&<span style={{color:"red"}}>{formError.deadline}</span>}<br/>

            <label htmlFor="location">location: </label>
            <input 
            type='text' 
            id='location' 
            value={location}
            onChange={e=> setLocation(e.target.value)} />
            {formError.deadline&&<span style={{color:"red"}}>{formError.deadline}</span>}<br/>
            
            <input type = "submit" />
            </form>
           
        </div>
    )
}