import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: JSON.parse(localStorage.getItem('cartItems')) || []
    },
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload
            const existingItem = state.items.find(item => item.id === product.id)

            if (existingItem) {
                existingItem.quantity += 1
            } else {
                state.items.push({ ...product, quantity: 1 })
            }
            
            localStorage.setItem('cartItems', JSON.stringify(state.items))
        },
        
        removeFromCart: (state, action) => {
            const productId = action.payload
            state.items = state.items.filter(item => item.id !== productId)
            localStorage.setItem('cartItems', JSON.stringify(state.items))
        },

        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload
            const existingItem = state.items.find(item => item.id === id)
            
            if (existingItem) {
                if (quantity <= 0) {
                    state.items = state.items.filter(item => item.id !== id)
                } else {
                    existingItem.quantity = quantity
                }
            }
            localStorage.setItem('cartItems', JSON.stringify(state.items))
        },

        clearCart: (state) => {
            state.items = []
            localStorage.removeItem('cartItems')
        }
    }
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer