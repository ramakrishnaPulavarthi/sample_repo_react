import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

function Read() {
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/get_student/${id}`) // Corrected interpolation of id
      .then((res) => {
        setData(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, [id]); // Add id to the dependency array

  return (
    <div className='container-fluid'>
      <h1>User {id} </h1>
      <Link to='/'>Back</Link>
      <ul className='list-group'>
        <li className='list-group-item'>
          <b>ID: </b>
          {data.id}
        </li>
        <li className='list-group-item'>
          <b>Name: </b>
          {data.name}
        </li>
        <li className='list-group-item'>
          <b>Email: </b>
          {data.email}
        </li>
        <li className='list-group-item'>
          <b>Age: </b>
          {data.age}
        </li>
        <li className='list-group-item'>
          <b>Gender: </b>
          {data.gender}
        </li>
      </ul>
    </div>
  )
}

export default Read;
