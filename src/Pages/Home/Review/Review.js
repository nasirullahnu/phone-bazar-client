import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const Review = () => {
    const {register, formState:{errors},  handleSubmit} = useForm();
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();

    const addReview = data => {
        console.log(data.review)
        const review = {
            message : data.review,
            reviewer : user.displayName,
            reviewerEmail : user.email
        }
        console.log(review)
        fetch('http://localhost:5000/reviews', {
            method : 'POST',
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify(review)
        })
        .then(res => res.json())
        .then(data => {
        console.log(data)
        if(data.acknowledged){
            navigate('/')
        toast.success('Thank you for your valuable Review')
        }
        else{
             toast.error(data.message)
         }
        })
    }

    return (
        <div className='my-10'>
            <div className='flex justify-center'>
                <div>
                    <h2 className='text-3xl'>You can add a <span>Feedback/Review</span></h2>
                    <h2>We are very friend for our visitors Review and we always try to imporve</h2>
                </div>
            </div>
            <div className='flex justify-center my-5'>
                <form onSubmit={handleSubmit(addReview)} className='w-1/2'>
                    <div className="form-control w-full">
                        <textarea className="textarea textarea-success mb-4" {...register('review', {
                                        required : 'maybe you forgot to add review?'
                            })} placeholder="Please Describe your thoughts about our website">
                        </textarea>
                        {errors.review && <p className='text-red-400 mb-4 mt-1 '>{errors.review.message}</p>} 
                    </div>

                    {user?.uid ? (
                        <input className="btn btn-accent w-full" value='Add Review' type="submit" />
                    ) : (
                        <p>
                            Please Log In first to add a review{" "}
                            <Link to="/login" className="font-bold text-yellow-400">
                            Login
                            </Link>
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Review;