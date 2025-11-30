import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router';
import { useForm } from 'react-hook-form';
import styles from './CartPage.module.css'
import { clearCart, removeFromCart, updateQuantity } from '../../../stores/cartSlice';
import { ordersAPI } from '../../../api';

export default function CartPage() {
    const cart = useSelector((state) => state.cart.items)
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    
    const [showModal, setShowModal] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { register, handleSubmit, reset } = useForm()

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = cart.reduce((sum, item) => sum + ((item.discont_price || item.price) * item.quantity), 0)

    const handleQuantityChange = (id, quantity) => {
        if (quantity < 1) {
            dispatch(removeFromCart(id))
        } else {
            dispatch(updateQuantity({ id, quantity }))
        }
    }

    const onSubmit = async (data) => {
        setIsSubmitting(true)
        
        try {
            const orderData = {
                items: cart.map(item => ({
                    productId: item.id,
                    productTitle: item.title,
                    price: item.discont_price || item.price,
                    quantity: item.quantity
                })),
                total: totalPrice,
                address: data.address,
                customerName: data.name,
                customerEmail: data.email,
                customerPhone: data.phone
            }

            const response = await ordersAPI.create(orderData)
            console.log('Order created:', response.data)

            setShowModal(true)
            
            dispatch(clearCart())
            reset()
            
        } catch (error) {
            console.error('Order creation failed:', error)
            alert('Failed to create order. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const closeModal = () => {
        setShowModal(false)
    }

    if (cart.length === 0 && !showModal) {
        return (
            <div className={styles.container}>
                <div className={styles.emptyCart}>
                    <h1>Shopping cart</h1>
                    <p>Looks like you have no items in your basket currently.</p>
                    <NavLink to="/products" className={styles.continueShoppingBtn}>
                        Continue Shopping
                    </NavLink>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            {showModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <h2>Congratulations!</h2>
                        <p>Your order has been successfully placed on the website.</p>
                        <p>A manager will contact you shortly to confirm your order.</p>
                        <button onClick={closeModal} className={styles.modalButton}>
                            OK
                        </button>
                    </div>
                </div>
            )}

            {cart.length > 0 && (
                <>
                    <div className={styles.header}>
                        <h1>Shopping cart</h1>
                        <NavLink to="/products" className={styles.backButton}>
                            Back to the store
                        </NavLink>
                    </div>

                    <div className={styles.content}>
                        <div className={styles.cartItems}>
                            {cart.map(item => (
                                <div key={item.id} className={styles.cartItem}>
                                    <img src={item.image} alt={item.title} className={styles.itemImage} />
                                    
                                    <div className={styles.itemInfo}>
                                        <h3 className={styles.itemTitle}>{item.title}</h3>
                                        
                                        <div className={styles.priceInfo}>
                                          <div className={styles.quantityControls}>
                                            <button 
                                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                disabled={item.quantity <= 1}
                                            >
                                                -
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                                                +
                                            </button>
                                        </div>
                                            <div className={styles.itemPrice}>
                                            ${((item.discont_price || item.price) * item.quantity).toFixed(2)}
                                        </div>
                                        </div>
                                    </div>
                                    
                                    <button 
                                        className={styles.removeButton}
                                        onClick={() => dispatch(removeFromCart(item.id))}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className={styles.orderSection}>
                            <h2>Order details</h2>
                            
                            <div className={styles.orderInfo}>
                                <div className={styles.orderRow}>
                                    <p>{totalItems} items</p>
                                </div>
                                <div className={styles.orderRow}>
                                    <p>Total</p>
                                    <span>${totalPrice.toFixed(2)}</span>
                                </div>
                            </div>

                            <form 
                                onSubmit={handleSubmit(onSubmit)} 
                                className={styles.orderForm}
                            >
                                <input
                                    {...register('name', { 
                                        required: 'Name is required',
                                        value: user?.name || ''
                                    })}
                                    type="text"  
                                    placeholder="Name" 
                                    className={styles.formInput}
                                    disabled={isSubmitting}
                                />
                                
                                <input 
                                    {...register('phone', { 
                                        required: 'Phone is required',
                                        pattern: {
                                            value: /^\+?[\d\s\-\(\)]+$/,
                                            message: 'Invalid phone number'
                                        }
                                    })}
                                    type="text" 
                                    placeholder="Phone number" 
                                    className={styles.formInput}
                                    disabled={isSubmitting}
                                />

                                <input 
                                    {...register('email', { 
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^\S+@\S+$/i,
                                            message: 'Invalid email address'
                                        },
                                        value: user?.email || ''
                                    })}
                                    type="email" 
                                    placeholder="Email" 
                                    className={styles.formInput}
                                    disabled={isSubmitting}
                                />

                                <textarea
                                    {...register('address', { 
                                        required: 'Address is required',
                                        minLength: {
                                            value: 10,
                                            message: 'Address must be at least 10 characters'
                                        }
                                    })}
                                    placeholder="Delivery address"
                                    className={styles.formTextarea}
                                    disabled={isSubmitting}
                                    rows="3"
                                />
                                
                                <button 
                                    type="submit" 
                                    className={styles.orderButton}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Processing..." : `Order for $${totalPrice.toFixed(2)}`}
                                </button>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}