import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'

function AddToCart() {

  const [cartData, setCartData] = useState([])
  const [count, setCount] = useState(1)

  const increaseQuantity = (item, index) => {
    const indexItem = cartData[index] 
    indexItem.itemQuantity = item.itemQuantity + 1
    setCartData([...cartData,indexItem])
  }

  const decreaseQuantity = (item, index) => {
    const indexItem = cartData[index] 
    if (item.itemQuantity > 0) {
      indexItem.itemQuantity = item.itemQuantity - 1
      setCartData([...cartData,indexItem])
    }
    
  }

  useEffect(() => {
    setCartData(JSON.parse(localStorage.getItem('data')))
  }, [])
  console.log(cartData);

  return (
    <div className='container'>
      {cartData.map((item, index) => {
        return (
          <div className="Addcard" key={index}>
            <img src={`${item.image}`} className="card-img" />
            <div className='card-Details'>
              <h5 className="card-title">{item.title}</h5>
              <p className="card-text">Price : {item.price}</p>
              <button onClick={() => decreaseQuantity(item, index)} className="quantity-btn">-</button>
              <button className="quantity-btn">{item.itemQuantity}</button>
              <button onClick={() => increaseQuantity(item, index)} className="quantity-btn">+</button>

            </div>
          </div>
        )
      })}
    </div>
  )
}

export default AddToCart
