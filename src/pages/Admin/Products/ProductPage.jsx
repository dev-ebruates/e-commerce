import { Button, Table, message, Popconfirm, Space } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_BASE_URL;
const ProductPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const columns = [
    {
      title: "Ürün Görseli",
      dataIndex: "img",
      key: "img",
      render: (imgSrc) => (
        <img
          src={imgSrc[0]}
          alt="Image"
          style={{
            width: "100px",
          }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Fiyat",
      dataIndex: "price",
      key: "price",
      render: (text) => <span>{Number(text.current).toFixed(2)}</span>,
    },
    {
      title: "İndirim",
      dataIndex: "price",
      key: "price",
      render: (text) => <span>%{text.discount}</span>,
    },
    {
      title: "Kategori",
      dataIndex: "categoryName",
      key: "categoryName",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <Space>
          <Button
            type="primary"
            onClick={() => navigate(`/admin/products/update/${record._id}`)}
          >
            Güncelle
          </Button>
          <Popconfirm
            title="Siliniyor..."
            description="Silmek istediğinize emin misiniz?"
            okText="Evet"
            cancelText="Hayır"
            onConfirm={() => deleteProduct(record._id)}
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const [categoriesResponse, productsResponse] = await Promise.all([
          fetch(`${apiUrl}/api/categories`),
          fetch(`${apiUrl}/api/products`),
        ]);
        if (!categoriesResponse.ok || !productsResponse.ok) {
          message.error("Veri Getirme Başarısız.");
        }
        const [categoriesData, productsData] = await Promise.all([
          categoriesResponse.json(),
          productsResponse.json(),
        ]);
        const productWitdhCategories = productsData.map((product)=>{
          const categoryId=product.category;
          const category = categoriesData.find((item)=>item._id === categoryId);
       
        return{
          ...product,
          categoryName: category ? category.name : ""

        } });
        setDataSource(productWitdhCategories);
      } catch (error) {
        console.log("Veri Hatası:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(`${apiUrl}/api/products/${productId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        message.success(`Ürün başarıyla silindi!`);
        // fetchProduct();
        setDataSource((prevProducts) => {
          return prevProducts.filter((product =>product._id !== productId))
        });
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

export default ProductPage;
