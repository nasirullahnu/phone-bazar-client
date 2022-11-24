import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const Signup = () => {
    const {register, formState:{errors},  handleSubmit} = useForm();
    const {user, createUser} = useContext(AuthContext)
    const [signupError, setSignupError] = useState('')

    // sign up with email and password 
    const handleSignUp = data =>{
        console.log(data)
        createUser(data.email, data.password)
        .then(result => {
            const user = result.user;
            console.log(user)
        })
        .catch(error => {
            console.log(error)
            setSignupError(error)
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
        <button className="btn btn-outline w-full">Continue With Google</button>
      </div>
        </div>
    );
};

export default Signup;