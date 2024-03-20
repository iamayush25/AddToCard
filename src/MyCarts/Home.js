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
                            <h2 className="card-text">{item.category.toUpperCase()}</h2>
                            <hr />
                            <img src={`${item.image}`} className="card-img-top" />
                            <hr />
                            <h5 className="card-title">{item.title}</h5>
                            <p className="card-text">Price : {item.price} $</p>
                            <button onClick={() => addItem(item, index)} className="btn btn-primary" >ADD TO CART</button>
                        </div>


                    )
                })}
            </div>

            {/*Footer*/}

            <div class="card mb-3" style={{width : "76em"}}>
                <img src="..." className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <p className="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
                    </div>
            </div>
        </div>
    )
}

export default Home;