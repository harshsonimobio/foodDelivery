import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { FaTrash, FaArrowLeft } from "react-icons/fa";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import { addDoc, collection } from "firebase/firestore";
import fireDB from "../fireConfig";
import { toast } from "react-toastify";
import { Increase, Decrease } from "../redux/action/cartAction";
import { connect } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import "../pages/cartpage.css"

function CartPage() {
  const { cartItems } = useSelector((state) => state.cartReducer);
  const [totalAmount, setTotalAmount] = useState(0);
  // const [totalCount, setTotalCount]= useState(0);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [nameError, setNameError] = useState({});
  const [addressError, setAddressError] = useState({});
  const [pincodeError, setPincodeError] = useState({});
  const [phoneNumberError, setPhoneNumberError] = useState({});
  const [loading, setLoading] = useState(false);
  const [totalCounts, setTotalCounts] = useState(0);
  const [errorr,setErrorr] = useState(false)
  const [buttoncon, setButtoncon] = useState(true)
  useEffect(() => {
    let temp = 0;
    cartItems.forEach((cartItem) => {
      temp = Number(temp) + Number(cartItem.count) * Number(cartItem.price);
    });
    setTotalAmount(temp);
  }, [cartItems]);

  useEffect(() => {
    let temporary = 0;
    cartItems.forEach((cartItem) => {
      temporary = Number(temporary) + Number(cartItem.count);
    });
    setTotalCounts(temporary);
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  const deleteFromCart = (product) => {
    dispatch({ type: "DELETE_FROM_CART", payload: product });
  };

  const increaseItem = (product) => {
    dispatch({ type: "ADD_QUANTITY", payload: product });
  };
  const decreaseItem = (product) => {
    dispatch({ type: "SUB_QUANTITY", payload: product });
  };

  let navigate = useNavigate();

  const formValidation = () => {
    const nameError = {};
    const addressError = {};
    const pincodeError = {};
    const phoneNumberError = {};
    let isValid = false;
    let btncon = false;

    if (name.trim().length > 2 && name.trim().length <50) {
      
      isValid = false;
      btncon = false;
    }

    if (name.trim().length > 0 && name.trim().length < 2) {
      nameError.nameShort = "Name is too short";
      isValid = true;
      btncon = true;
    }

    if (name.trim().length > 50) {
      nameError.nameShort = "Name should not access more than 50 characters";
      isValid = true;
      btncon = true;
    }
    if (address.trim().length > 0 && address.trim().length < 4) {
      addressError.addressShort = "Address is too short";
      isValid = true;
      btncon = true;
    }
    if (address.trim().length > 4) {
      
      isValid = false;
      btncon = false;
    }
    
    if (pincode.trim().length > 0 && pincode.trim().length < 5) {
      pincodeError.pincodeShort = "Provide valid Pincode";
      isValid = true;
      btncon = true;
    }
    if (pincode.trim().length > 6) {
      pincodeError.pincodeShort = "Zip code is of 6 numeric values";
      isValid = true;
      btncon = true;
    }
    if (phoneNumber.trim().length >0 && phoneNumber.trim().length < 9) {
      phoneNumberError.phoneNumberShort = "Provide a valid 10 digit phone no.";
      isValid = true;
      btncon = true;
    }
    if (phoneNumber.trim().length > 10) {
      phoneNumberError.phoneNumberShort = "Phone no. should not access more than 10 digits";
      isValid = true;
      btncon = true;
    }

    setNameError(nameError);
    setAddressError(addressError);
    setPincodeError(pincodeError);
    setPhoneNumberError(phoneNumberError);
    setButtoncon(btncon);
    setErrorr(isValid)
    return errorr;
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    const addressInfo = {
      name,
      address,
      pincode,
      phoneNumber,
    };
    console.log(addressInfo);

    const orderInfo = {
      cartItems,
      addressInfo,
      email: JSON.parse(localStorage.getItem("currentUser")).user.email,
      userid: JSON.parse(localStorage.getItem("currentUser")).user.uid,
    };

    try {
      
        // formValidation()
      setLoading(true);
      const result = await addDoc(collection(fireDB, "orders"), orderInfo);
      console.log(errorr,"submit")
      setLoading(false);
      toast.success("You have successfully placed your order");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setLoading(false);
      toast.error("Order failed");
    }
  };

  return (
    <Layout loading={loading}>
      {cartItems.length !== 0 && <h1>Cart</h1>}
      <div className="TableLayout">
      {
                        cartItems.length === 0 && <div className="empty" >
                            <div>(0) items in your cart. Please add some items in cart </div> <br />
                            <div className="return"><Link to="/"><FaArrowLeft />Return to Home page</Link></div>
                        </div>
      }
      {cartItems.length > 0 &&<table className="table mt-3">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => {
            return (
              <tr>
                <td>
                  <img src={item.imageURL} height="80" width="80" />
                </td>

                <td className="tdAdjust">{item.name}</td>
                <td className="tdAdjust">{item.price}</td>
                <td className="tdiad">
                  <button onClick={() => increaseItem(item)}>
                    <AiOutlinePlus />
                  </button>
                  <p>{item.count}</p>
                  <button onClick={() => decreaseItem(item)}>
                    <AiOutlineMinus />
                  </button>
                </td>
                <td className="tdAdjust">{item.price * item.count}</td>
                <td>
                  <button className="delete">
                  <FaTrash style={{cursor: "pointer"}} onClick={() => deleteFromCart(item)} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
}
      </div>

      <div className="total">
        <p className="total-amount">
          Total Quantity = {totalCounts} & Total Amount = {totalAmount} RS/-
        </p>
      </div>
      <div className="d-flex justify-content-end mt-3">
        <button className="buttonPlace" onClick={handleShow}>PLACE ORDER</button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <form onChange={formValidation}>
        <Modal.Header closeButton>
          <Modal.Title>Add your address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <div className="register-form">
            <h2>Register</h2>
            <label htmlFor="quantity">Total No. of Quantity</label>
            <input
              type="text"
              className="form-control"
              required
              value={totalCounts}
              readOnly
            />
            <br />
            <label htmlFor="Total amount">Price to Pay</label>
            <input
              type="text"
              className="form-control"
              required
              value={totalAmount}
              readOnly
            />
            <hr />
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setNameError()
              }}
              
            />
            {Object.keys(nameError).map((key) => {
              return <div style={{ color: "red" }}>{nameError[key]}</div>;
            })}
            <label htmlFor="name">Address</label>
            <textarea
              className="form-control"
              rows={3}
              type="text"
              placeholder="address"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                setAddressError()
              }}
              
            />
            {Object.keys(addressError).map((key) => {
              return <div style={{ color: "red" }}>{addressError[key]}</div>;
            })}
            <label htmlFor="name">Pin Code</label>
            <input
              className="form-control"
              placeholder="pincode"
              type="number"
              value={pincode}
              onChange={(e) => {
                setPincode(e.target.value);
                setPincodeError()
              }}
              
            />
            {Object.keys(pincodeError).map((key) => {
              return <div style={{ color: "red" }}>{pincodeError[key]}</div>;
            })}
            <label htmlFor="name">Phone no.</label>
            <input
              type="number"
              className="form-control"
              placeholder="phone number"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
                setPhoneNumberError()
              }}
              
            />
            {Object.keys(phoneNumberError).map((key) => {
              return (
                <div style={{ color: "red" }}>{phoneNumberError[key]}</div>
              );
            })}

            <hr />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>Close</button>
          <button disabled={buttoncon} type="submit" onClick={placeOrder}>ORDER</button>
        </Modal.Footer>
        </form>
      </Modal>
      
    </Layout>
  );
}

const mapPropsToState = (dispath) => ({
  increaseItem: (item) => dispath(Increase(item)),
  decreaseItem: (item) => dispath(Decrease(item)),
});
export default connect(null, mapPropsToState)(CartPage);
