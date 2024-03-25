import Breadcrumb from "./Breadcrumb/Breadcrumb";
import Gallery from "./Gallery/Gallery";
import Info from "./Info/Info";
import "./ProductDetails.css"
import Tabs from "./Tabs/Tabs";
import PropTypes from "prop-types"
const ProductDetails = ({singleProduct, setSingleProduct}) => {
  return (
    <section className="single-product">
      <div className="container">
        <div className="single-product-wrapper">
          {/* <!-- breadcrumb start --> */}
         <Breadcrumb/>
          {/* <!-- breadcrumb end --> */}
          {/* 
            <!-- site main start --> */}
          <div className="single-content">
            <main className="site-main">
              <Gallery singleProduct={singleProduct}/>
             <Info singleProduct={singleProduct}/>
            </main>
          </div>
          {/* <!-- site main end -->

            <!-- tabs start --> */}
          <Tabs singleProduct={singleProduct} setSingleProduct={setSingleProduct}/>
          {/* <!-- tabs end --> */}
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
ProductDetails.propTypes = {
  singleProduct: PropTypes.object,
  setSingleProduct:PropTypes.func,

}
