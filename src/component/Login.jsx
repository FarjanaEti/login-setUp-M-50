import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { auth } from '../firebase.init';
import { Link } from 'react-router-dom';

const Login = () => {
     const [success,setSuccess]=useState(false);
     const [errorMsg, setErrormsg]=useState('')
      const emailRef=useRef();
     const handleLogIn=(e)=>{
      e.preventDefault();
       
      const email=e.target.email.value;
      const password=e.target.password.value;
      console.log(email,password)
      setSuccess(false)
      setErrormsg('')

      signInWithEmailAndPassword(auth,email,password)
      .then(res=>{
          console.log(res.user)

          if(!res.user.emailVerified){
            setErrormsg('Please enter a verified email')
          }
          else{

            setSuccess(true)
          }
      })
      .catch(error => {
          console.error("Error:", error.message);
          setErrormsg(error.message)
      })
      
     }
     const handleForgetPassword=()=>{
      console.log('email',emailRef.current.value)
      const email=emailRef.current.value;
       if(!email){
        console.log('please provide a valid email')
       }
       else{
        sendPasswordResetEmail(auth,email)
        .then(()=>{
         alert('Please check your email password send')
        })
       }
     }

  return (
     <div className="hero bg-base-200 min-h-screen">
     <div className="hero-content flex-col lg:flex-row-reverse">
     
       <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
         <form onSubmit={handleLogIn} className="card-body">
           <div className="form-control">
             <label className="label">
               <span className="label-text">Email</span>
             </label>
             <input type="email" ref={emailRef} name='email' placeholder="email" className="input input-bordered" required />
           </div>
           <div className="form-control">
             <label className="label">
               <span className="label-text">Password</span>
             </label>
             <input type="password" name='password' placeholder="password" className="input input-bordered" required />
             <label onClick={handleForgetPassword} className="label">
               <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
             </label>
           </div>
           <div className="form-control mt-6">
             <button className="btn btn-primary">Login</button>
           </div>
         </form>
         {
          success && <p>Successfully loged In</p>
         }
         {
          errorMsg && <p>{errorMsg}</p>
         }
         <p>New to this website? Please <Link to='/signup'>sign up</Link></p>
       </div>
     </div>
   </div>
);
};

export default Login;