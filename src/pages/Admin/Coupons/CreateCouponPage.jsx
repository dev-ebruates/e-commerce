
import { Button, Form, Input, Spin, message } from "antd";
import { useState } from "react";


const apiUrl = import.meta.env.VITE_API_BASE_URL;

const CreateCouponPage = () => {
  const [loading, setLoading] = useState(false); 
  const [form] = Form.useForm();


  const onFinish = async (values) => {
    setLoading(true);
    try {
      console.log(values);
      const response = await fetch(`${apiUrl}/api/coupons/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        message.success("Kupon başarıyla oluşturuldu.");
        //formu oluşturduktan sonra temizleyelim.
        form.resetFields();
      } else {
        message.error("Kupon oluşturulurken bir hata oluştu.");
      }
    } catch (error) {
      console.log("Kupon oluşturma hatası:", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <Spin spinning={loading}>
      <Form name="basic" layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          label="Kupon kodu"
          name="code"
          rules={[
            {
              required: true,
              message: "Kupon kodunu giriniz lütfen!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="İndirim Yüzdesi"
          name="discountPercent"
          rules={[
            {
              required: true,
              message: "İndirim yüzdesini giriniz lütfen!",
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

export default CreateCouponPage;
