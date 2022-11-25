import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthProvider";


const BookingModal = ({product, setProduct}) => {
    const {_id,
        img, title, location, 
        price, orgPrice, used, 
        postTime, seller, sellerMail,
         condition, phone, description} = product
  const {user} = useContext(AuthContext)
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;



  const handleBooking = event => {
    event.preventDefault();
    const form = event.target;
    const customer = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const meeting = form.meeting.value;
    const product = form.product.value;
    const price = form.price.value;
    // console.log( customer, email, phone, meeting, product, price)

    const booking = {
        customer : customer,
        email : email,
        phone : phone,
        meeting : meeting,
        product : product,
        price : price,
        date, sellerMail,
        sellerPhone : phone, 
        productImg: img
    }
    console.log(booking)

    

    fetch('http://localhost:5000/bookings', {
      method : 'POST',
      headers : {
        'content-type' : 'application/json'
      },
      body : JSON.stringify(booking)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if(data.acknowledged){
        setProduct(null)
      toast.success('Booking confirmed')
      }
      else{
        toast.error(data.message)
      }
    })
    form.reset();
  }


  return (
    <>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>

          <form onSubmit={handleBooking} className="grid grid-cols-1 gap-3 mt-6">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              defaultValue={user?.displayName}
              readOnly
              className="input input-bordered input-primary w-full"
            />
            <input
              type="email"
              name="email"
              defaultValue={user?.email}
              readOnly
              placeholder="Email"
              className="input input-bordered input-primary w-full"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              required
              className="input input-bordered input-primary w-full"
            />
            <input
              type="text"
              name="meeting"
              placeholder="Meeting Location"
              required
              className="input input-bordered input-primary w-full"
            />
            <input
              type="text"
              name="product"
              defaultValue={title}
              placeholder="Product Name"
              readOnly
              className="input input-bordered input-primary w-full"
            />
            <input
              type="text"
              name="price"
              placeholder="Product Price"
              defaultValue={price}
              readOnly
              className="input input-bordered input-primary w-full"
            />

            <input
              className="btn btn-accent w-full"
              type="submit"
              value="Place Order"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingModal;
