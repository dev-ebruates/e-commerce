import { Button, Table, message, Popconfirm, Space } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const apiUrl = import.meta.env.VITE_API_BASE_URL;
const CouponPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const columns = [
    {
      title: "Kupon Kodu",
      dataIndex: "code",
      key: "code",
      render:(code) => <b>{code}</b>,
    },
    {
      title: "İndirim Yüzdesi",
      dataIndex: "discountPercent",
      key: "discountPercent",
      render:(text) => <b>%{text}</b>,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <Space>
          <Button type="primary"
          onClick={()=>navigate(`/admin/coupons/update/${record._id}`)} >Güncelle</Button>
           <Popconfirm
          title="Siliniyor..."
          description="Silmek istediğinize emin misiniz?"
          okText="Evet"
          cancelText="Hayır"
          onConfirm={()=> deleteCoupon(record._id)}
        >
          <Button type="primary" danger>
           Sil
          </Button>
        </Popconfirm>
        </Space>
       
      ),
    },
  ];
  const fetchCoupon = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/api/coupons`);
      if (response.ok) {
        const data = await response.json();
        setDataSource(data);
      } else {
        message.error("Veri Getirme Başarısız.");
      }
    } catch (error) {
      console.log("Veri Hatası:", error);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchCoupon();
  }, [fetchCoupon]);
  

  const deleteCoupon = async(couponId)=>{
    try {
      const response = await fetch(`${apiUrl}/api/coupons/${couponId}`,{method:"DELETE",});
      if (response.ok) {
        message.success(`kategori başarıyla silindi!`)
        fetchCoupon();
      } else {
        message.error("Silme İşlemi Başarısız.");
      }
    } catch (error) {
      console.log("Silme İşlemi Hatası:", error);
    }
  };

  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(record) => record._id}
        loading={loading}
      />
    </div>
  );
};

export default CouponPage;
