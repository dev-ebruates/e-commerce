import { useContext } from "react";
import CartItem from "./CartItem";
import { CartContext } from "../../context/CardProvider";

const CartTable = () => {
  const {cartItems, removeFromCart} = useContext(CartContext)
  console.log(cartItems)
  return (
    <table className="shop-table">
      <thead>
        <tr>
          <th className="product-thumbnail">&nbsp;</th>
          <th className="product-thumbnail">&nbsp;</th>
          <th className="product-name">Product</th>
          <th className="product-price">Price</th>
          <th className="product-quantity">Quantity</th>
          <th className="product-subtotal">Subtotal</th>
        </tr>
      </thead>
      <tbody className="cart-wrapper">
         {cartItems.map((item)=>( <CartItem key={item._id} cartItem={item} removeFromCart={removeFromCart} />))}
      </tbody>
    </table>
  );
};

export default CartTable;
