import { message } from "antd";
import { useContext, useState } from "react";
import { CartContext } from "../../context/CardProvider";

const CartCoupon = () => {
  const [couponCode, setCouponCode] = useState("");
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const { cartItems, setCardItems } = useContext(CartContext);

  const applyCoupon = async () => {
    if (couponCode.trim().length === 0) {
      return message.warning("Boş değer girilimez...");
    }
    try {
      const response = await fetch(`${apiUrl}/api/coupons/code/${couponCode}`);

      if (!response.ok) {
        return message.warning("Girdiğiniz kupon kodu yanlıştır.");
      }

      const data = await response.json();
      const discountPercent = data.discountPercent;
      const updatedCartItems = cartItems.map((item) => {
        const updatedPrice = item.price * (1 - discountPercent / 100);
        return { ...item, price: updatedPrice };
      });
      setCardItems(updatedCartItems);
      message.success(`${couponCode} kupon kodu başarıyla uygulandı.`);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteCoupon = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/coupons/code/${couponCode}`);
      const data = await response.json();
      const discountPercent = data.discountPercent;
      const updatedCartItems = cartItems.map((item) => {
        const updatedPrice = item.price / (1 - discountPercent / 100);
        return { ...item, price: updatedPrice };
      });
      setCardItems(updatedCartItems);
      message.success(`${couponCode} kupon kodu başarıyla kaldırıldı.`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="coupon">
      <input
        type="text"
        className="input-text"
        placeholder="Coupon code"
        onChange={(e) => setCouponCode(e.target.value)}
        value={couponCode}
      />

      <button className="btn" type="button" onClick={applyCoupon}>
        Apply Coupon
      </button>
      <button
        className="btn"
        onClick={deleteCoupon}
        style={{
          backgroundColor: "red",
        }}
        type="button"
      >
        Delete Coupon
      </button>
    </div>
  );
};

export default CartCoupon;
