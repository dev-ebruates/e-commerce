
import { Button, Form, Input, Spin, message } from "antd";
import { useState } from "react";


const apiUrl = import.meta.env.VITE_API_BASE_URL;

const CreateCategoryPage = () => {
  const [loading, setLoading] = useState(false); 
  const [form] = Form.useForm();


  const onFinish = async (values) => {
    setLoading(true);
    try {
      console.log(values);
      const response = await fetch(`${apiUrl}/api/categories/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        message.success("Kategori başarıyla oluşturuldu.");
        //formu oluşturduktan sonra temizleyelim.
        form.resetFields();
      } else {
        message.error("Kategori oluşturulurken bir hata oluştu.");
      }
    } catch (error) {
      console.log("Kategori oluşturma hatası:", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <Spin spinning={loading}>
      <Form name="basic" layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          label="Kategori ismi"
          name="name"
          rules={[
            {
              required: true,
              message: "Kategori adını giriniz lütfen!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Kategori görseli (link)"
          name="img"
          rules={[
            {
              required: true,
              message: "kategori görsel linkini giriniz lütfen!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Oluştur
        </Button>
      </Form>
    </Spin>
  );
};

export default CreateCategoryPage;
