import { Button, Form, Input, Spin, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_BASE_URL;

const UpdateCouponPage = () => {
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [form] = useForm();
  const couponId = params.id;
  console.log(couponId);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      console.log(values);
      const response = await fetch(`${apiUrl}/api/coupons/${couponId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        message.success("Kupon başarıyla güncellendi.");
      } else {
        message.error("Kupon güncellenirken bir hata oluştu.");
      }
    } catch (error) {
      console.log("Kupon güncelleme hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchSingleCoupon = async () => {
      setLoading(true);

      try {
        //id ye göre istek attık
        const response = await fetch(`${apiUrl}/api/coupons/${couponId}`);

        if (!response.ok) {
          throw new Error("Verileri getirme hatası");
        }

        const data = await response.json();
        //gelen datalar ile form u dolduruyoruz
        if (data) {
          form.setFieldsValue({
            code: data.code,
            discountPercent: data.discountPercent,
          });
        }
      } catch (error) {
        console.log("Veri hatası:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSingleCoupon();
  }, [apiUrl, couponId, form]);

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
          label="İndirim yüzdesi"
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
          Güncelle
        </Button>
      </Form>
    </Spin>
  );
};

export default UpdateCouponPage;
