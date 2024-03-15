import React, { useEffect, useState } from 'react'
import './style.css'
import { json } from 'react-router-dom'
import Navbar from './Navbar'

function Home() {
    const [data, setData] = useState([])
    const [itemData, setitemData] = useState([])

    //  Adding Items into cart 
    const addItem = (item) => {
        let storedData = JSON.parse(localStorage.getItem('data')) || [];

        // Check item is already Available in the cart ..........
        const existingItemIndex = storedData.findIndex((storedItem) => storedItem.title === item.title);
        if (existingItemIndex !== -1) {
            // If item already available in the cart , update item quantity......
            storedData[existingItemIndex].price *= storedData[existingItemIndex].itemQuantity
            storedData[existingItemIndex].itemQuantity += 1;
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
            // console.log(data);
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
                {data.map((item, index) => {
                    return (
                        <div className="card" style={{ width: "18rem" }} key={item.id}>
                            <h3 className="card-text">{item.category.toUpperCase()}</h3>
                            <img src={`${item.image}`} className="card-img-top" />
                            <h5 className="card-title">{item.title}</h5>
                            <p className="card-text">Price : {item.price} $</p>
                            <button onClick={() => addItem(item, index)} className="btn btn-primary" >ADD TO CART</button>
                        </div>


                    )
                })}
            </div>

            {/*Footer*/}

            <footer className='footer'>
                <div className='footerItem'>
                    <ul>
                        <h2>Shop Non-Stop on ShopCart</h2>
                        <li>Support</li>
                        <li>FAQ's</li>
                        <li>Blog</li>
                        <li>Legal templates</li>
                    </ul>
                </div>
                <div className='footerItem'>
                    <ul>
                        <h2>Support & resources</h2>
                        <li>Support</li>
                        <li>FAQ's</li>
                        <li>Blog</li>
                        <li>Legal templates</li>
                    </ul>
                </div>
                <div className='footerItem'>
                    <ul>
                        <h2>Features</h2>
                        <li>Add item in cart</li>
                        <li>Search Item By category</li>
                        <li>Add quantity</li>
                    </ul>
                </div>
                <div className='footerItem'>
                    <ul>
                        <h2>MyOnlineStore</h2>
                        <li>Contact</li>
                        <li>About Us</li>
                    </ul>
                </div>
                <hr className='hr' />
                <div className='socialAccount'>
                    <span className='mails' >ayush22@navgurukul.org</span>
                    <span className='mails' >+91-9993551109</span>
                    <span className='mails' >ayush22@navgurukul.org</span>
                    <span className='mails' >ayush22@navgurukul.org</span>
                    <span className='mails' >ayush22@navgurukul.org</span>
                </div>

            </footer>
        </div>
    )
}

export default Home;