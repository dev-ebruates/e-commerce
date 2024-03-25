import { Button, Table, message, Popconfirm, Space } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



const CategoryPage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const columns = [
    {
      title: "Kategori Görseli",
      dataIndex: "img",
      key: "img",
      render: (imgSrc) => (
        <img
          src={imgSrc}
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
      render:(text) => <b>{text}</b>,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <Space>
          <Button type="primary"
          onClick={()=>navigate(`/admin/categories/update/${record._id}`)} >Güncelle</Button>
           <Popconfirm
          title="Siliniyor..."
          description="Silmek istediğinize emin misiniz?"
          okText="Evet"
          cancelText="Hayır"
          onConfirm={()=> deleteCategory(record._id)}
        >
          <Button type="primary" danger>
           Delete
          </Button>
        </Popconfirm>
        </Space>
       
      ),
    },
  ];
  const fetchCategory = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/api/categories`);
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
    fetchCategory();
  }, [fetchCategory]);
  

  const deleteCategory = async(categoryId)=>{
    try {
      const response = await fetch(`${apiUrl}/api/categories/${categoryId}`,{method:"DELETE",});
      if (response.ok) {
        message.success(`kategori başarıyla silindi!`)
        fetchCategory();
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

export default CategoryPage;
