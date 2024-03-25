import { Button, Form, Input, Spin, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_BASE_URL;

const UpdateCategoryPage = () => {
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [form] = useForm();
  const categoryId = params.id;
  console.log(categoryId);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      console.log(values);
      const response = await fetch(`${apiUrl}/api/categories/${categoryId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        message.success("Kategori başarıyla güncellendi.");
      } else {
        message.error("Kategori güncellenirken bir hata oluştu.");
      }
    } catch (error) {
      console.log("Kategori güncelleme hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchSingleCategory = async () => {
      setLoading(true);

      try {
        //id ye göre istek attık
        const response = await fetch(`${apiUrl}/api/categories/${categoryId}`);

        if (!response.ok) {
          throw new Error("Verileri getirme hatası");
        }

        const data = await response.json();
        //gelen datalar ile form u dolduruyoruz
        if (data) {
          form.setFieldsValue({
            name: data.name,
            img: data.img,
          });
        }
      } catch (error) {
        console.log("Veri hatası:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSingleCategory();
  }, [apiUrl, categoryId, form]);

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
          Güncelle
        </Button>
      </Form>
    </Spin>
  );
};

export default UpdateCategoryPage;
