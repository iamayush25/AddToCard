import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home';
import AddToCart from './AddToCart';
import './style.css'

// Navbar ......
function Navbar() {
    const [flag, setFlag] = useState("")

    return (
        <div>
            <header className='Navbar-Main'>
                <h1>ShopCart</h1>
                <span className='navItem'>
                    <span className='inputs'>
                        {/*<input className='inputBox' type='search' placeholder=' Search Item' />*/}
                        <div>
                            <datalist id="suggestions">
                                <option>Second Option</option>
                                <option>First option</option>
                            </datalist>
                            <input autoComplete="on" list="suggestions" />
                        </div>
                        <button className='searchBtn'>Search</button>
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
                <Route path='/' element={<Home />} />
                <Route path='cart' element={<AddToCart />} />
            </Routes>
        </div>
    )

}

export default Navbar
