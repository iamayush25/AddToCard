import React, { useEffect, useState } from 'react'
import './style.css'
import { json } from 'react-router-dom'
import AddToCart from './AddToCart'


function Home({filteredData}) {
    const [data, setData] = useState([])
    const [itemData, setitemData] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('');

    //  Adding Items into cart 

    const addItem = (item) => {
        let storedData = JSON.parse(localStorage.getItem('data')) || [];
        // Check item is already available in the cart ..........
        const existingItemIndex = storedData.findIndex((storedItem) => storedItem.title === item.title);
        if (existingItemIndex !== -1) {
            alert("This product is already exist in the cart, if you want to increase it's quantity please go to cart.")
        } else {
            // If item doesn't exist, add it to the cart......
            storedData.push({ title: item.title, image: item.image, price: item.price, itemQuantity: 1 });
        }

        // Update localStorage .......
        localStorage.setItem('data', JSON.stringify(storedData));

        // Update state
        setitemData(storedData);
    };


    // Fetch items fron the API ......
    useEffect(() => {
        const GetItem = async () => {
            let response = await fetch("https://fakestoreapi.com/products")
            const data = await response.json();
            setData(data)
        }
        GetItem()
    }, [])

    // Display all the items...
    return (
        <div className='outer'>
            <div className='addsImg'>
                <img className='addimg-1' src={require('./Image/offer.jpg')} />
            </div>
            <hr />
            <span className='letestHeading'><h1>Letest Products</h1></span>
            <hr />
            <div className='main'>
                {filteredData.map((item, index) => {
                    return (
                        <div className="card" style={{ width: "18rem" }} key={item.id}>
                            <h2 className="card-text">{item.category.toUpperCase()}</h2>
                            <hr />
                            <img src={`${item.image}`} className="card-img-top" />
                            <hr />
                            <h5 className="card-title">{item.title}</h5>
                            <p className="card-text">Price : {item.price} ₹</p>
                            <button onClick={() => addItem(item)} className="btn btn-primary" >ADD TO CART</button>

                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default Home;