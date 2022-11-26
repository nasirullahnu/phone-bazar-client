import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import Loading from '../../Shared/Loading/Loading';

const AddProducts = () => {
    const {register, formState:{errors},  handleSubmit} = useForm();
    const navigate = useNavigate();
    const {loading, user} = useContext(AuthContext)
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    const imageHostKey = process.env.REACT_APP_imgbb_key;
    // console.log(imageHostKey)
    

    if(loading){
        return <Loading></Loading>
    }

    const handleAddProduct = data => {
        const image = data.image[0]
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?&key=${imageHostKey}`
        fetch(url,{
            method : 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(imgData => {
            console.log(imgData)
            if(imgData.success){
                console.log(imgData.data.url)
                const image = imgData.data.url
                const product = {
                    img : image,
                    title : data.title,
                    location : data.location,
                    price : data.price,
                    orgPrice : data.orgPrice,
                    used : data.usedTime,
                    postTime : date,
                    category_id : data.category,
                    seller : user.displayName,
                    sellerMail : user.email,
                    condition : data.condition,
                    phone : data.phone,
                    description : data.description
                }
                fetch('http://localhost:5000/products', {
                    method : 'POST',
                    headers : {
                        'content-type' : 'application/json',
                    },
                    body : JSON.stringify(product)
                })
                .then(res => res.json())
                .then(result => {
                    console.log(result)
                    toast.success('Product added succesfully')
                    navigate('/dashboard/myProducts')
                })
            }
        })


            
 
    }

    return (
        <div className=" p-7">
            <h2 className='text-4xl m-5 text-white'>Add Product</h2>
            <form onSubmit={handleSubmit(handleAddProduct)}>

                {/* product title and price  */}
                <div className='grid gap-2 lg:grid-cols-2 md:grid-cols-2 grid-cols-1'>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-white">Title</span>
                        </label>
                        <input type="text" {...register('title',{
                            required : 'you forgot this?',
                            placeholder : 'Product Name'
                        })} className="input input-bordered w-full mr-2" />
                        {errors.title && <p className='text-white mt-1'>{errors.title.message}</p>}  
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-white">Location</span>
                        </label>
                        <input type="text" {...register('location',{
                            required : 'location must be added !',
                            placeholder : 'product location'
                        })} className="input input-bordered w-full mr-2" />
                        {errors.location && <p className='text-white mt-1'>{errors.location.message}</p>}  
                    </div>
                </div>

                {/* price and phone number  */}
                <div className='grid gap-2 grid-cols-2'>
                    <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-white">Price</span>
                            </label>
                            <input type="text" {...register('price', {
                                required : 'hey text on me',
                                placeholder : 'product price'
                            })} className="input input-bordered w-full" /> 
                            {errors.price && <p className='text-white mt-1'>{errors.price.message}</p>} 
                    </div>
                    <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-white">Phone Number</span>
                            </label>
                            <input type="text" {...register('phone', {
                                required : 'your phone number needed',
                                placeholder : 'Your number'
                            })} className="input input-bordered w-full" /> 
                            {errors.phone && <p className='text-white mt-1'>{errors.phone.message}</p>} 
                    </div>
                </div>


                {/* original price and used time*/}
                <div className='grid gap-2 grid-cols-2'>
                    <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-white">Original Price</span>
                            </label>
                            <input type="text" {...register('orgPrice', {
                                required : 'please enter original price!',
                                placeholder : 'original price'
                            })} className="input input-bordered w-full" /> 
                            {errors.orgPrice && <p className='text-white mt-1'>{errors.orgPrice.message}</p>} 
                    </div>
                    <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-white">Used Time</span>
                            </label>
                            <input type="text" {...register('usedTime', {
                                required : 'fill this',
                                placeholder : 'কতোদিন ব্যাবহার করেছে?'
                            })} className="input input-bordered w-full" /> 
                            {errors.usedTime && <p className='text-white mt-1'>{errors.usedTime.message}</p>} 
                    </div>
                </div>

               
                {/* <div className='grid gap-2 grid-cols-2'>
                    <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-white">Your/Seller Name</span>
                            </label>
                            <input type="text" {...register('sellerName', {
                                // required : 'add your Name',
                                defaultValue : {displayName},
                                placeholder : 'your/seller name'
                            })} className="input input-bordered w-full" /> 
                            {errors.sellerName && <p className='text-white mt-1'>{errors.sellerName.message}</p>} 
                    </div>
                    <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-white">Your/Seller Email</span>
                            </label>
                            <input type="text" {...register('sellerEmail', {
                                // required : 'your email please' ,
                                placeholder : 'Provide your email'
                            })} className="input input-bordered w-full" /> 
                            {errors.sellerEmail && <p className='text-white mt-1'>{errors.sellerEmail.message}</p>} 
                    </div>
                </div> */}

                {/* image and condition  */}
                <div className='grid gap-2 grid-cols-2'>
                    <div className="form-control w-full">
                            <label className="label"> <span className="label-text text-white">Condition</span> </label>
                            <select
                            {...register('condition')}
                            className="select select-bordered w-full mb-2">
                                <option>Fresh</option>
                                <option>Usable</option>
                                <option>Problems</option>
                            </select>
                    </div>
                    <div className="form-control w-full">
                            <label className="label"> <span className="label-text text-white">Select Category</span> </label>
                            <select
                            {...register('category',{
                                required : 'category must be sellected'
                            })}
                            className="select select-bordered w-full mb-2">
                                <option>gaming</option>
                                <option>camera</option>
                                <option>button</option>
                            </select>
                            {errors.category && <p className='text-white mt-1'>{errors.category.message}</p>}
                    </div>
                    
                </div>
                {/* product image  */}
                <div className="form-control w-full mb-2">
                        <label className="label">
                            <span className="label-text text-white">Upload Product Photo</span>
                        </label>
                        <input type="file" {...register('image', {
                            required : 'Photo is Requirded'
                        })} className="file-input file-input-bordered file-input-success w-full" />  
                        {errors.image && <p className='text-white mt-1'>{errors.image.message}</p>}
                </div>
                {/* product desctiption  */}
                <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-white">Product Description</span>
                            </label>
                            <textarea className="textarea textarea-success w-full mb-4" {...register('description', {
                                required : 'maybe you forgot to add description?'
                            })} placeholder="Add our product description"></textarea>
                            {errors.description && <p className='text-white mb-4 mt-1 '>{errors.description.message}</p>} 
                </div>
          <h2 className='text-white my-2'>Your "Seller Name and "Email" will be added automaticly after add this Product</h2>                          
          <input className="btn btn-accent w-full" value='Add Product' type="submit" />
        </form>
        </div>
    );
};

export default AddProducts;