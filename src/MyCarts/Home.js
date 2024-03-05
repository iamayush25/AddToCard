import React, { useEffect, useState } from 'react'
import './style.css'
import { json } from 'react-router-dom'

function Home() {
    const [data, setData] = useState([])
    const [itemData, setitemData] = useState([])


    const addItem = (item) => {
        localStorage.setItem('data' , JSON.stringify([...itemData , { title: item.title, image: item.image, price: item.price , itemQuantity : 1 }]))
        setitemData(JSON.parse(localStorage.getItem('data')))
    }

    useEffect(() => {
        const GetItem = async () => {
            let response = await fetch("https://fakestoreapi.com/products")
            const data = await response.json();
            // console.log(data);
            setData(data)
        }
        GetItem()
    }, [])

    const DisplayItem = () => {
        return (
            <div className='main'>
                {data.map((item, index) => {
                    return (
                        <div className="card" style={{ width: "18rem" }} key={item.id}>
                            <h3 className="card-text">{item.category}</h3>
                            <img src={`${item.image}`} className="card-img-top" />
                            <h5 className="card-title">{item.title}</h5>
                            <p className="card-text">Price : {item.price}</p>
                            <button onClick={() => addItem(item)} className="btn btn-primary" >ADD TO CART</button>
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