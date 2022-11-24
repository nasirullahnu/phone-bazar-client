import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const Login = () => {
    const {register, formState:{errors}, handleSubmit} = useForm()
    const {logIn} = useContext(AuthContext)
    const [loginError, setLoginError] = useState('')

    const handleLogin = data =>{
        console.log(data)
        logIn(data.email, data.password)
      .then(result => {
        const user = result.user;
        console.log(user)
        toast.success(`welcome Mr./Mrs. ${user?.email}`)
      })
      .catch(error => {
        console.log(error)
        setLoginError(error.message)
      })
    }


    return (
        <div className="h-[700px] flex justify-center items-center bg-blue-400 mx-8 my-8">
            <div className="w-96 p-7">
        <h2 className="text-2xl text-center font-bold">Please Login </h2>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input type="text" 
                {...register("email", {
                  required : 'please endter an email address'
                  })} className="input input-bordered w-full max-w-xs" />
                  {errors.email && <p role='alert'>{errors.email?.message}</p>}
            </div>

          <div className="form-control w-full max-w-xs">
                <label className="label"> <span className="label-text">Password</span> </label>
                <input type="password" 
                {...register("password",{
                  required : 'please enter your password'
                })} 
                className="input input-bordered w-full max-w-xs" />
                {errors.password && <p role='alert'>{errors.password?.message}</p>}
                
                <label className="label"> <span className="label-text">Forget Password</span> </label>
            </div>
          {/* <p>{data}</p> */}
          <input className="btn btn-outline w-full" value='login' type="submit" />
          {loginError && <p className="text-red-500">{loginError}</p>}
        </form>
        <p>New to Phone Bazar? <Link to='/signup' className="text-white font-bold">Signup</Link></p>
        <div className="divider">OR</div>
        <button className="btn btn-outline w-full">Continue With Google</button>
      </div>
        </div>
    );
};

export default Login;