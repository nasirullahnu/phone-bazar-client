import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthProvider";

const ReportModal = ({ product, setProduct }) => {
    const {title, _id, img, seller, sellerMail} = product
    const {user} = useContext(AuthContext)

    const {register, formState:{errors}, handleSubmit} = useForm()

    const reportAdmin = data => {
        // console.log(data.report)
        const report = {
            report : data.report,
            reporter : user.displayName,
            reporterEmail : user.email,
            productName : title,
            productImg : img,
            productSeller : seller,
            productSellerMail : sellerMail,
            productId : _id
        } 
        console.log(report)
        
        fetch('https://phone-server-ten.vercel.app/reports', {
            method : 'POST',
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify(report)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.acknowledged){
                setProduct(null)
            toast.success('Thank you for your valuable review. Stay with us')
            }
            else{
                toast.error(data.message)
            }
        })

    }

  return (
    <div>
      <input type="checkbox" id="report-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <label
            htmlFor="report-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="font-bold text-3xl">{title}</h3>
          <h3 className="font-bold">Seller : {seller}</h3>
          <h3 className="font-bold">Seller Email : {sellerMail}</h3>
          <p className="py-4">What you think about this product?</p>


          <form onSubmit={handleSubmit(reportAdmin)}>


          <div className="form-control w-full">
                            <textarea className="textarea textarea-success w-full mb-4" {...register('report', {
                                required : 'maybe you forgot to add report?'
                            })} placeholder="Add report"></textarea>
                            {errors.report && <p className='text-black mb-4 mt-1 '>{errors.report.message}</p>} 
            </div>
          <input className="btn btn-accent w-full" value='Report to Admin' type="submit" />
        </form>

        </div>
      </div>
    </div>
  );
};

export default ReportModal;
