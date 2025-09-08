import React, { createContext, useState } from 'react'
import { useEffect } from 'react'
// import all_product from '../assets/all_product'

export const ShopContext = createContext(null)
const getDefaultCard = () => {
  let cart = {}
  for (let index = 0; index < 300 + 1; index++) {
    cart[index] = 0
  }
  return cart
}

const ShopContextProvider = (props) => {
  const [all_product, setAll_Proudct] = useState([])
  const [cartItems, setCartItems] = useState(getDefaultCard())

  useEffect(() => {
    // fetch('http://localhost:4000/allproducts')
    fetch('http://e-commerce.railway.internal/allproducts')
      .then((response) => response.json())
      .then((data) => setAll_Proudct(data))

    if (localStorage.getItem('auth-token')) {
      // fetch('http://localhost:4000/getcart', {
      fetch('http://e-commerce.railway.internal/getcart', {
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'auth-token': `${localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json',
        },
        body: '',
      })
        .then((response) => response.json())
        .then((data) => setCartItems(data))
    }
  }, [])

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
    // console.log(cartItems)
    if (localStorage.getItem('auth-token')) {
      // fetch('http://localhost:4000/addtocart', {
      fetch('http://e-commerce.railway.internal/addtocart', {
        method: 'POST',
        headers: {
          Accept: 'appplication/json',
          'auth-token': `${localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
    }
  }

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    if (localStorage.getItem('auth-token')) {
      // fetch('http://localhost:4000/removefromcart', {
      fetch('http://e-commerce.railway.internal/removefromcart', {
        method: 'POST',
        headers: {
          Accept: 'appplication/form-data',
          'auth-token': `${localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
    }
  }

  const getTotalCartAmount = () => {
    let totalAmount = 0
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find(
          (product) => product.id === Number(item)
        )
        totalAmount += itemInfo.new_price * cartItems[item]
      }
    }
    return totalAmount
  }

  const getTotalCartItems = () => {
    let totalItem = 0
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item]
      }
    }
    return totalItem
  }

  const contextValue = {
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
  }
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider
