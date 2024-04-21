import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState({
    id: 0,
    name: '',
    email: '',
    age: '',
    gender: '',
    mobileNo: ''
  });

  useEffect(() => {
    axios.get(`/get_student/${id}`)
      .then((res) => {
        setData(res.data[0]); // Set state with fetched data
      })
      .catch((err) => console.log(err));
  }, [id]);

  function handleSubmit(e){
    e.preventDefault()
    axios.post(`/edit_student/${id}`, data)
    .then((res)=>{
      navigate('/')
      console.log(res);
    })
    .catch((err)=>console.log(err))
  }

  // Provide default values if data is not available yet
  const { name, email, age, gender } = data;

  return (
    <div className='container vh-100 vw-100 bg-primary'>
      <div className='row'>
        <h3>Edit Student</h3>
        <div className='d-flex justify-content-end'>
          <Link to="/" className="btn btn-success">Home</Link>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='form-group my-3'>
            <label htmlFor='name'>Name</label>
            <input type='text' name='name' value={name} required onChange={(e)=> setData({...data, name: e.target.value})} />
          </div>
          <div className='form-group my-3'>
            <label htmlFor='email'>Email</label>
            <input type='email' name='email' value={email} required onChange={(e)=> setData({...data, email: e.target.value})}  />
          </div>
          <div className='form-group my-3'>
            <label htmlFor='gender'>Gender</label>
            <input type='text' name='gender' value={gender} required onChange={(e)=> setData({...data, gender: e.target.value})}  />
          </div>
          <div className='form-group my-3'>
            <label htmlFor='age'>Age</label>
            <input type='number' name='age' value={age} required onChange={(e)=> setData({...data, age: e.target.value})}  />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Edit;
