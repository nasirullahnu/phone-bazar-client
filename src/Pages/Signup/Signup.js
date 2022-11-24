import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const Signup = () => {
    const {register, formState:{errors},  handleSubmit} = useForm();

    const handleSignUp = data =>{
        console.log(data)
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

        <div className="form-control w-full max-w-xs mb-6">
                <label className="label"> <span className="label-text">Password</span> </label>
                <input type="password" {...register('password',{
                    required : "Please Enter Password",
                    minLength : {value : 6, message : 'password should be 6 character long'}
                })} className="input input-bordered w-full max-w-xs" />
                {errors.password && <p className='text-red-500 mt-3'>{errors.password.message}</p>}
        </div>
          {/* <p>{data}</p> */}
          <input className="btn btn-outline w-full" value='submit' type="submit" />
          {/* {signupError && <p className='text-red-500'>{signupError.message}</p>} */}
        </form>
        <p>Already have an Account ? <Link to='/login' className="text-white font-bold">Login</Link></p>
        <div className="divider">OR</div>
        <button className="btn btn-outline w-full">Continue With Google</button>
      </div>
        </div>
    );
};

export default Signup;