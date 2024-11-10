import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../firebase.init';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa6';
//password validation regex.jas
const Signup = () => {

      const [errorMsg,setErrormsg]=useState('');
     const [success,setSuccess]=useState(false);
     const [showPassword, setShowPassword]=useState(false)
     

     const handleSignUp=(event)=>{
       event.preventDefault();
       setErrormsg('');
       setSuccess(false)

       const email=event.target.email.value;
       const password=event.target.password.value;
       const terms=event.target.terms.checked
       const name=event.target.name.value;
       const url=event.target.url.value;
        console.log(name,url)
       if(password.length<6){
           setErrormsg("Password should be at least 6 charecter") 
           return;                  
       } 

       const PasswordRegex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
        if(!PasswordRegex.test(password)){
          setErrormsg('password should have one upper case one lower case one special case')
          return;
        }
        if(!terms){
          setErrormsg('please accept our terms and service')
        }

        //account toiri hoy signIn a
        //Created id
       createUserWithEmailAndPassword(auth,email,password)
       .then(res=>{
          console.log(res)
          setSuccess(true);      

          sendEmailVerification(auth.currentUser)
          .then(()=>{
            console.log('verification email sent')
          })
          //update
          const profile={
            displayName:name,
            photoURL:url,
          }
          updateProfile(auth.currentUser,profile)
           .then(()=>{
            console.log('user profile updated')
           })
           .catch(error=>console.log(error))
       })
       .catch(error=>{
         console.log(error)
        setErrormsg(error.message)
        
       })
     }


 return (
   <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <h2 className='text-3xl text-pink-300 text-center my-4'>SignUP</h2>                         
   <form onSubmit={handleSignUp} className="card-body">
     <div className="form-control">
       <label className="label">
         <span className="label-text">Name</span>
       </label>
       <input type="text" name='name' placeholder="Name" className="input input-bordered" required />
     </div>
     <div className="form-control">
       <label className="label">
         <span className="label-text">PHoto url</span>
       </label>
       <input type="text" name='url' placeholder="Photo url" className="input input-bordered" required />
     </div>
     <div className="form-control">
       <label className="label">
         <span className="label-text">Email</span>
       </label>
       <input type="email" name='email' placeholder="email" className="input input-bordered" required />
     </div>
     <div className="form-control relative">
       <label className="label">
         <span className="label-text">Password</span>
       </label>
       <input name='password' 
       type={showPassword?"text": "password" }
       placeholder="password" className="input input-bordered" required />
       <button
       onClick={()=>setShowPassword(!showPassword)}
       className='btn btn-xs absolute right-3 top-12'>
        {
          showPassword ?<FaEye></FaEye> :<FaEyeSlash></FaEyeSlash>
        }
        </button>
       <label className="label">
         <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
       </label>
     </div>

     <div className="form-control">
  <label className="label cursor-pointer">
    <span className="label-text">Remember me</span>
    <input type="checkbox" name='terms' className="checkbox" />
  </label>
</div>

     <div className="form-control mt-6">
       <button className="btn btn-primary">Login</button>
     </div>
   </form>
   {
    errorMsg && <p className='text-red-600'>{errorMsg}</p>                          
   }
   {
     success && <p className='text-green-700'>SignUp is successful</p>                         
   }
 </div>
 );
};

export default Signup;