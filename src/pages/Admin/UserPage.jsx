import { Button, Table, message, Popconfirm } from "antd";
import { useCallback, useEffect, useState } from "react";


const apiUrl = import.meta.env.VITE_API_BASE_URL;
const UserPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (imgSrc) => (
        <img
          src={imgSrc}
          alt="Avatar"
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
          }}
        />
      ),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <Popconfirm
          title="Siliniyor..."
          description="Silmek istediğinize emin misiniz?"
          okText="Evet"
          cancelText="Hayır"
          onConfirm={()=> deleteUser(record.email,record.username)}
        >
          <Button type="primary" danger>
           Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];
  const fetchUsers = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/api/user`);
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
    fetchUsers();
  }, [fetchUsers]);
  

  const deleteUser = async(userEmail, username)=>{
    try {
      const response = await fetch(`${apiUrl}/api/user/${userEmail}`,{method:"DELETE",});
      if (response.ok) {
        message.success(`${username}, kullanıcı başarıyla silindi!`)
     fetchUsers();
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

export default UserPage;
