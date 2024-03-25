import { Button, Result } from "antd";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CardProvider";

const Success = () => {
  const { setCardItems } = useContext(CartContext);
  //ödeme sonrası sepeti temizleyelim
  useEffect(() => {
    setCardItems([]);
  }, [setCardItems]);

  return (
    <div className="success-page">
      <div className="container">
        <Result
          status="success"
          title="Ödeme Başarılı!"
          subTitle="Siparişiniz başarıyla tamamlandı"
          extra={[
            <Link to={"/"} key="home">
              <Button type="primary">Ana Sayfa</Button>,
            </Link>,

            <a href="/admin/orders" key={"orders"}>
              <Button key="buy">Siparişlerim</Button>,
            </a>,
            
          ]}
        />
      </div>
    </div>
  );
};

export default Success;
