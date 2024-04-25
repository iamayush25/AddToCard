import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home';
import AddToCart from './AddToCart';
import './style.css'

// Navbar ......
function Navbar() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [CategoryList, setCategoryList] = useState([]);
    const [value, setValue] = useState('Search');
    const [Data , setData] = useState([]);



    useEffect(() => {
        const GetItem = async () => {
            let response = await fetch("https://fakestoreapi.com/products")
            const data = await response.json();
            getCategory(data)
            setData(data)
        }
        GetItem()
    }, [])

    const handleChange = (event) => {
        setValue(event.target.value);
        setSelectedCategory(event.target.value)
    };

    const getCategory = (item) => {
        const newCategoryList = [];
        for (let i = 0; i < item.length; i++) {
            if (!newCategoryList.includes(item[i].category)) {
                newCategoryList.push(item[i].category)
            }

        }
        setCategoryList([...newCategoryList])

    }
        
    const filterItem = selectedCategory !== "All" ? Data.filter((item => item.category.toLowerCase() === selectedCategory.toLowerCase())):Data;

    
    
    return (
        <div>
            <header className='Navbar-Main'>
                <h1 className='shopCartLogo'>ShopCart</h1>
                <span className='navItem'>
                    <span className='inputs'>
                        {/* <input className='inputBox' type='search' placeholder=' Search Item' /> */}
                        <div className="row">
                            <form className="col-md-4" >
                                <select className="form-control inputBox" value={value} onChange={handleChange}>
                                    <option className='SearchOption'>Search</option>
                                    <option value='All'>All</option>
                                    {CategoryList.map((category) => {
                                        return (
                                            <option value={category}>{category}</option>
                                        )

                                    })}
                                </select>
                            </form>
                        </div>

                        {/* <button className='searchBtn'>Search</button> */}

                    </span>
                    <ul className='links' >
                        <li>
                            <Link className='link' to="/">Home</Link>
                        </li>
                        <li>
                            <Link className='link' to="/cart" ><i className="fa-solid fa-cart-shopping"></i></Link>
                        </li>
                    </ul>
                </span>
            </header>
            <Routes>
                <Route path='/' element={<Home filteredData = {filterItem} />} />
                <Route path='cart' element={<AddToCart />} />
            </Routes>
        </div>
    )

}

export default Navbar
