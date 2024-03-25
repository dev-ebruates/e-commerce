
import PropTypes from  "prop-types"
const CartItem = ({cartItem, removeFromCart}) => {

  

  return (
    <tr className="cart-item">
    <td></td>
    <td className="cart-image">
        <img src={cartItem.img[0]} alt=""/>
        <i className="bi bi-x delete-cart" onClick={()=>removeFromCart(cartItem._id)}></i>
    </td>
    <td>{cartItem.name}</td>
    <td>${Number(cartItem.price).toFixed(2)}</td>
    <td className="product-quantity">{cartItem.quantity}</td>
    <td className="product-subtotal">${Number((cartItem.price)*(cartItem.quantity)).toFixed(2)}</td>
   </tr>
  )
}

export default CartItem

CartItem.propTypes= {
  cartItem: PropTypes.object,
  removeFromCart:PropTypes.func,
}