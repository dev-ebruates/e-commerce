import React from "react";
import Category from "../components/Categories/Category";
import Products from "../components/Products/Products";
import CampaignSingle from "../components/CampaignSingle/CampaignSingle";

const ShopPage = () => {
  return (
    <React.Fragment>
      <Category />
      <Products />
      <CampaignSingle />
      <Products />
    </React.Fragment>
  );
};

export default ShopPage;
