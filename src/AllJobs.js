import axios from "axios"
import { useState, } from "react"

export default function AllJobs(){
const [jobs,setJobs] = useState(null)
const handleViewJobs = async()=>{
    try{
        const response = await axios.get('http://localhost:3055/api/jobs')
        console.log(response.data)
        setJobs(response.data)
    }catch(err){
        alert(err.message)
    }
}
    return(
        <div>
            <button onClick={handleViewJobs}>view jobs</button>
            {jobs&&
                <div> 
               <h2>Jobs list</h2>
               <hr/>
               <table border={1}>
                   <thead>
                       <tr>
                           <th>title</th>
                           <th>description</th>
                           <th>required Skills</th>
                           <th>salary</th>
                           <th>location</th>
                           <th>deadline</th>
                       </tr>
                       </thead>
   
                       <tbody>
                           {jobs.map((job)=>{
                               return (
                                   <tr key={job._id}>
                                       <td>{job.title}</td>
                                       <td>{job.description}</td>
                                       <td>{job.requiredSkills.join(',')}</td>
                                       <td>{`${job.salaryRange.min} -  ${job.salaryRange.max}`}</td>
                                       <td>{job.location}</td>
                                       <td>{job.deadline}</td>
                                   </tr>
                               )
                           })}
                       </tbody>
                   
               </table>
               </div>
            }
         
        </div>
    )
}