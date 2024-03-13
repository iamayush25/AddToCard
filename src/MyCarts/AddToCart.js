import React, { useEffect, useState } from 'react'

function AddToCart() {

  const [cartData, setCartData] = useState([])
  const [price, setPrice] = useState([])

        // increase Quantity of items ......
    const increaseQuantity = (item, index) => {
    cartData[index].itemQuantity = item.itemQuantity + 1
    cartData[index].price = (item.price / (item.itemQuantity - 1)) * cartData[index].itemQuantity 
    setCartData([...cartData])
    updateLocalStorage([...cartData])
    console.log(item.itemQuantity);
    console.log(item.price);

  }

        // decrease Quantity of items .......
  const decreaseQuantity = (item, index) => {
    if (item.itemQuantity > 1) {
      cartData[index].itemQuantity = item.itemQuantity - 1
      cartData[index].price = price[0] * cartData[index].itemQuantity
      setCartData([...cartData])
      updateLocalStorage([...cartData])
    
    }

    else if (item.itemQuantity === 1) {
      cartData.splice(index, 1)
      setCartData([...cartData])
      updateLocalStorage([...cartData])
    }
  }
         // Update localStorage ......
  const updateLocalStorage = (data) => {
    localStorage.setItem('data', JSON.stringify(data));
  };

  // useEffect hook for get cart data from localStorage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('data')) || []
    setCartData(data)
    const maping = data.map((product) => product.price)
    setPrice(maping)
    console.log(maping , "about");
    
  }, [])

        // Display In cart .......
  return (
    <div className='container'>
      {cartData.map((item, index) => {
        return (
          <div className="Addcard" key={index}>
            <img src={`${item.image}`} className="card-img" />
            <div className='card-Details'>
              <h5 className="card-title">{item.title}</h5>
              <p className="card-text">Price : {item.price} $</p>
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
