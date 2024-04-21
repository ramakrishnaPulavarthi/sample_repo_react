import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
function Home() {
  const [data, setData] = useState([]);

  useEffect(()=>{
    axios.get('/studentList')
    .then((res)=>{
      setData(res.data)
    })
    .catch((err)=>console.log(err))
  },[]);

  function deleteStudent(id){
    axios.delete(`/delete_student/${id}`)
    .then(()=>{
      setData(data.filter(student => student.id !== id));
    })
    .catch((err)=>console.log(err))
  }
  
  return (
    <div className='container-fluid'>
      <h3>Students</h3>
      <div>
        <Link to='/create'>Add Student</Link>
      </div>
      <table>
        <thead>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Gender</th>
          <th>age</th>
        </thead>
        <tbody>
          {
            data.map((student)=>{
              return (<tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.gender}</td>
                <td>{student.age}</td>
                <td>
                  <Link to={`/read/${student.id}`}>Read</Link>
                  <Link to={`/edit/${student.id}`}>EDit</Link>
                  <button onClick={() => deleteStudent(student.id)}>Delete</button>
                </td>
              </tr>)
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default Home
