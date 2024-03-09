import React, { useEffect, useState } from 'react'
import './style.css'
import { json } from 'react-router-dom'

function Home() {
    const [data, setData] = useState([])
    const [itemData, setitemData] = useState([])

                //  Adding Items into cart 
    const addItem = (item) => {
        let storedData = JSON.parse(localStorage.getItem('data')) || [] ;
    
                // Check item is already Available in the cart ..........
        const existingItemIndex = storedData.findIndex((storedItem) => storedItem.title === item.title);
        if (existingItemIndex !== -1) {
                // If item already available in the cart , update item quantity......
            storedData[existingItemIndex].price *= storedData[existingItemIndex].itemQuantity
            storedData[existingItemIndex].itemQuantity += 1 ; 
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
    const DisplayItem = () => {
        return (
            <div className='main'>
                {data.map((item, index) => {
                    return (
                        <div className="card" style={{ width: "18rem" }} key={item.id}>
                            <h3 className="card-text">{item.category.toUpperCase()}</h3>
                            <img src={`${item.image}`} className="card-img-top" />
                            <h5 className="card-title">{item.title}</h5>
                            <p className="card-text">Price : {item.price} $</p>
                            <button onClick={() => addItem(item , index)} className="btn btn-primary" >ADD TO CART</button>
                        </div>
                    )
                })}
            </div>
        )
    }

    return (
        DisplayItem()
    )



}

export default Home;