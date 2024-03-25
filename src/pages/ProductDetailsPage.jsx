import React, { useEffect, useState } from "react"
import CampaignSingle from "../components/CampaignSingle/CampaignSingle"
import ProductDetails from "../components/ProductDetails/ProductDetails"
import { useParams } from "react-router-dom"

const ProductDetailsPage = () => {
const apiUrl = import.meta.env.VITE_API_BASE_URL;
const [singleProduct, setSingleProduct] = useState(null);
  // const params = useParams();
  const { id: productId} = useParams();
  useEffect(() => {
    const fetchSingleProduct = async () => {


      try {
        //id ye göre istek attık
        const response = await fetch(`${apiUrl}/api/products/${productId}`);

        if (!response.ok) {
          throw new Error("Verileri getirme hatası");
        }

        const data = await response.json();
        setSingleProduct(data);
      
      } catch (error) {
        console.log("Veri hatası:", error);
      }
    };
    fetchSingleProduct();
  }, [apiUrl, productId]);
  console.log(singleProduct);
  return singleProduct ? (
    <React.Fragment> 
      
      <ProductDetails singleProduct={singleProduct} setSingleProduct={setSingleProduct}/> 
      <CampaignSingle/>
    </React.Fragment>
  ) : <p>Ürün Yükleniyor</p>
}

export default ProductDetailsPage