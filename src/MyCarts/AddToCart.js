import React, { useEffect, useState , createContext , useContext } from 'react';
import './style.css';
import Home from './Home';


const Context = createContext();

function AddToCart() {
  const [cartData, setCartData] = useState([]);
  const [price, setPrice] = useState([]);

    // Increase Item Quantity 
  const increaseQuantity = (item, index) => {
    cartData[index].itemQuantity = item.itemQuantity + 1;
    cartData[index].price = (item.price / (item.itemQuantity - 1)) * cartData[index].itemQuantity;
    setCartData([...cartData]);
    updateLocalStorage([...cartData]);
  };

    // Decrease Item Quantity 

  const decreaseQuantity = (item, index) => {
    if (item.itemQuantity > 1) {
      cartData[index].itemQuantity = item.itemQuantity - 1;
      cartData[index].price = price[0] * cartData[index].itemQuantity;
      setCartData([...cartData]);
      updateLocalStorage([...cartData]);
    } else if (item.itemQuantity === 1) {
      cartData.splice(index, 1);
      setCartData([...cartData]);
      updateLocalStorage([...cartData]);
    }
  };

  const updateLocalStorage = (data) => {
    localStorage.setItem('data', JSON.stringify(data));
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('data')) || [];
    setCartData(data);
    const maping = data.map((product) => product.price);
    setPrice(maping);
  }, []);

  return (
    <div className='cart-main-outer'>
      <div className='cartHeading'><h1>Cart Items</h1></div>
      <hr/>
      <div className='container'>
        {cartData.map((item, index) => (
          <div className="Addcard" key={index}>
            <img src={`${item.image}`} className="card-img" alt={item.title} />
            <div className='card-Details'>
              <div className='cart-title-div'>
                <h1 className="card-item-title">{item.title}</h1>
              </div>
              <div className='cart-price'>
                <p className="card-text">Price: {item.price} $</p>
                <div className="quantity-buttons">
                  <button onClick={() => decreaseQuantity(item, index)} className="quantity-btn">-</button>
                  <button className="quantity-display">{item.itemQuantity}</button>
                  <button onClick={() => increaseQuantity(item, index)} className="quantity-btn">+</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddToCart;
