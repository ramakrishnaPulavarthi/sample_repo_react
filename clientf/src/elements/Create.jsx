import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';



function Create() {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    name:'',
    email:'',
    age:'',
    gender:''
  })

  function handleSubmit(e){
    e.preventDefault()
    axios.post('/add_student', values)
    .then((res)=>{
      
      navigate('/')
      console.log(res);
    })
    .catch((err)=>console.log(err))
  }

  return (
    <div>
      <style>
        {`
          .form {
            display: flex;
            flex-direction: column;
            gap: 10px;
            max-width: 350px;
            padding: 20px;
            border-radius: 20px;
            position: relative;
            background-color: #1a1a1a;
            color: #fff;
            border: 1px solid #333;
          }
          
          .title {
            font-size: 28px;
            font-weight: 600;
            letter-spacing: -1px;
            position: relative;
            display: flex;
            align-items: center;
            padding-left: 30px;
            color: #00bfff;
          }
          
          .title::before {
            width: 18px;
            height: 18px;
          }
          
          .title::after {
            width: 18px;
            height: 18px;
            animation: pulse 1s linear infinite;
          }
          
          .title::before,
          .title::after {
            position: absolute;
            content: "";
            height: 16px;
            width: 16px;
            border-radius: 50%;
            left: 0px;
            background-color: #00bfff;
          }
          
          .message, 
          .signin {
            font-size: 14.5px;
            color: rgba(255, 255, 255, 0.7);
          }
          
          .signin {
            text-align: center;
          }
          
          .signin a:hover {
            text-decoration: underline royalblue;
          }
          
          .signin a {
            color: #00bfff;
          }
          
          .flex {
            display: flex;
            width: 100%;
            gap: 6px;
          }
          
          .form label {
            position: relative;
          }
          
          .form label .input {
            background-color: #333;
            color: #fff;
            width: 100%;
            padding: 20px 05px 05px 10px;
            outline: 0;
            border: 1px solid rgba(105, 105, 105, 0.397);
            border-radius: 10px;
          }
          
          .form label .input + span {
            color: rgba(255, 255, 255, 0.5);
            position: absolute;
            left: 10px;
            top: 0px;
            font-size: 0.9em;
            cursor: text;
            transition: 0.3s ease;
          }
          
          .form label .input:placeholder-shown + span {
            top: 12.5px;
            font-size: 0.9em;
          }
          
          .form label .input:focus + span,
          .form label .input:valid + span {
            color: #00bfff;
            top: 0px;
            font-size: 0.7em;
            font-weight: 600;
          }
          
          .input {
            font-size: medium;
          }
          
          .submit {
            border: none;
            outline: none;
            padding: 10px;
            border-radius: 10px;
            color: #fff;
            font-size: 16px;
            transform: .3s ease;
            background-color: #00bfff;
          }
          
          .submit:hover {
            background-color: #00bfff96;
          }
          
          @keyframes pulse {
            from {
              transform: scale(0.9);
              opacity: 1;
            }
          
            to {
              transform: scale(1.8);
              opacity: 0;
            }
          }
        `}
      </style>
   
    <div className='container vh-100 vw-100 bg-primary'>
      <div className='row'>
        <h3>Add Student</h3>
        <div className='d-flex justify-content-end'>
          <Link to="/" className="btn btn-success">Home</Link>
        </div>
        <form className='form' onSubmit={handleSubmit}>
          <div className='form-group my-3'>
              <label htmlFor='name'>Name</label>
              <input type='text' name='name' required onChange={(e)=> setValues({...values, name: e.target.value})}/>
          </div>
          <div className='form-group my-3'>
              <label htmlFor='email'>Email</label>
              <input type='email' name='email' required onChange={(e)=> setValues({...values, email : e.target.value})}/>
          </div>
          <div className='form-group my-3'>
              <label htmlFor='gender'>Gender</label>
              <input type='text' name='gender' required onChange={(e)=> setValues({...values, gender: e.target.value})}/>
          </div>
          <div className='form-group my-3'>
              <label htmlFor='age'>age</label>
              <input type='number' name='age' required onChange={(e)=> setValues({...values, age: e.target.value})}/>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
    </div>
  )
}

export default Create
