import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const Signup = () => {
    const {register, formState:{errors},  handleSubmit} = useForm();
    const googleProvider = new GoogleAuthProvider();
    const navigate = useNavigate();
    const { createUser, updateUser, googleSignin} = useContext(AuthContext);
    const [signupError, setSignupError] = useState('');


     // sign in with google 
     const handleGoogleLogin = () => {
        googleSignin(googleProvider)
            .then(result => {
                const user = result.user
                console.log(user)
                navigate('/')
                saveUser(user.displayName, user.email)
            })
            .catch(error => console.log(error))
    }

    // sign up with email and password 
    const handleSignUp = data =>{
        console.log(data)
        setSignupError('');
        createUser(data.email, data.password)
        .then(result => {
            const user = result.user;
            console.log(user)
            navigate('/')
            toast.success(`account create succesfull by ${user?.email}`)
            const userInfo = {
                displayName : data.name,
                role : data.role
              }
              console.log(userInfo)
              updateUser(userInfo)
              .then(()=>{
                saveUser(data.name, data.email, data.role)
              })
              .catch(error => console.error(error))
        })
        .catch(error => {
            console.log(error)
            setSignupError(error)
        })
    }

    const saveUser = (name, email, role = 'buyer') =>{
        const user = {name, email, role};
        console.log(user)
        fetch('http://localhost:5000/allUsers', {
          method : 'POST',
          headers : {
            'content-type' : 'application/json'
          },
          body : JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
          console.log(data);
        })
      }



    return (
        <div className="h-[800px] flex justify-center items-center bg-blue-400 mx-8 my-8">
            <div className="w-96 p-7">
        <h2 className="text-2xl text-center font-bold"> SignUp </h2>
        <form onSubmit={handleSubmit(handleSignUp)}>
          <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Name</span>
                </label>
                <input type="text" {...register('name')} className="input input-bordered w-full max-w-xs" />  
        </div>
          <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input type="email" {...register('email', {
                    required : 'please enter your email'
                })} className="input input-bordered w-full max-w-xs" /> 
                {errors.email && <p className='text-red-500'>{errors.email.message}</p>} 
        </div>

        <div className="form-control w-full max-w-xs">
                <label className="label"> <span className="label-text">Password</span> </label>
                <input type="password" {...register('password',{
                    required : "Please Enter Password",
                    minLength : {value : 6, message : 'password should be 6 character long'}
                })} className="input input-bordered w-full max-w-xs" />
                {errors.password && <p className='text-red-500 mt-3'>{errors.password.message}</p>}
        </div>
        <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">I want to become a</span> </label>
                        <select
                        {...register('role')}
                         className="select select-bordered w-full max-w-xs mb-2">
                            <option>seller</option>
                            <option>buyer</option> 
                        </select>
                </div>
          {/* <p>{data}</p> */}
          <input className="btn btn-outline w-full" value='submit' type="submit" />
          {/* {signupError && <p className='text-red-500'>{signupError.message}</p>} */}
        </form>
        <p>Already have an Account ? <Link to='/login' className="text-white font-bold">Login</Link></p>
        {signupError && <p className='text-red-500'>{signupError.message}</p>}
        <div className="divider">OR</div>
        <button onClick={handleGoogleLogin} className="btn btn-outline w-full">Continue With Google</button>
      </div>
        </div>
    );
};

export default Signup;