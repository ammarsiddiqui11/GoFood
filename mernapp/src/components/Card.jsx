import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
  let data = useCart();
  let navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const priceRef = useRef();

  let options = props.options;
  let priceOptions = Object.keys(options);
  let foodItem = props.foodItem;

  // Debugging log to ensure foodItem is defined
  console.log('Food Item:', foodItem);

  const dispatch = useDispatchCart();

  const handleAddToCart = () => {
    const token = localStorage.getItem("authToken");
    console.log('Token:', token); // Debugging: Log the token to check its value

    if (!token) {
      console.log('Redirecting to login'); // Debugging: Log when redirecting
      navigate("/login");
      return;
    }

    // Debugging log to ensure data and foodItem are defined
    console.log('Data:', data);
    console.log('Food Item ID:', foodItem?._id);

    let food = data.find(item => item.id === foodItem?._id);

    if (food) {
      if (food.size === size) {
        dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty });
      } else {
        dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size, img: props.imgsrc });
      }
    } else {
      dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size, img: props.imgsrc });
    }
  };

  const handleQty = (e) => {
    setQty(e.target.value);
  };

  const handleOptions = (e) => {
    setSize(e.target.value);
  };

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  let finalPrice = qty * parseInt(options[size]);

  return (
    <div>
      <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
        <img src={props.imgsrc} className="card-img-top" alt={props.foodName} style={{ height: "120px", objectFit: "fill" }} />
        <div className="card-body">
          <h5 className="card-title">{props.foodName}</h5>

          <div className='container w-100 p-0' style={{ height: "38px" }}>
            <select className="m-2 h-100 w-20 bg-success text-black rounded" onChange={handleQty}>
              {Array.from(Array(6), (e, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>

            <select className="m-2 h-100 w-20 bg-success text-black rounded" ref={priceRef} onChange={handleOptions}>
              {priceOptions.map((i) => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>

            <div className='d-inline ms-2 h-100 w-20 fs-5'>
              ₹{finalPrice}/-
            </div>
          </div>
          <hr></hr>
          <button className={`btn btn-success justify-center ms-2`} onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
