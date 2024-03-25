import { useState } from "react";
import Reviews from "../../Reviews/Reviews";
import "./Tabs.css";
import PropTypes from "prop-types"

const Tabs = ({singleProduct, setSingleProduct}) => {
  const [activeTab, setActiveTab] = useState("desc");
  return (
    <div className="single-tabs">
      <ul className="tab-list">
        <li>
          <a
            style={{ cursor: "pointer" }}
            className={`tab-button ${activeTab === "desc" ? "active" : ""}`}
            data-id="desc"
            onClick={() => setActiveTab("desc")}
          >
            Description
          </a>
        </li>
        <li>
          <a
            style={{ cursor: "pointer" }}
            className={`tab-button ${activeTab === "info" ? "active" : ""}`}
            data-id="info"
            onClick={() => setActiveTab("info")}
          >
            Additional information
          </a>
        </li>
        <li>
          <a
            style={{ cursor: "pointer" }}
            className={`tab-button ${activeTab === "reviews" ? "active" : ""}`}
            data-id="reviews"
            onClick={() => setActiveTab("reviews")}
          >
            Reviews
          </a>
        </li>
      </ul>
      <div className="tab-panel">
        <div
          className={`tab-panel-descriptions content ${
            activeTab === "desc" ? "active" : ""
          }`}
          id="desc"
        >
        <div
        className="product-description"
        // burada html kodlarını uygulayıp gösteriyor
        dangerouslySetInnerHTML={{ __html: singleProduct.description }}
      ></div>
        </div>
        <div
          className={`tab-panel-information content ${
            activeTab === "info" ? "active" : ""
          }`}
          id="info"
        >
          <h3>Additional information</h3>
          <table>
            <tbody>
              <tr>
                <th>Color</th>
                <td>
                  <p>
                    Apple Red, Bio Blue, Sweet Orange, Blue, Green, Pink, Black,
                    White
                  </p>
                </td>
              </tr>
              <tr>
                <th>Size</th>
                <td>
                  <p>{singleProduct.sizes.map((item,index)=><span key={index}>
                    {item.toUpperCase()}
                  <br/></span>)}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <Reviews activeTab={activeTab} singleProduct={singleProduct} setSingleProduct={setSingleProduct} />
        </div>
      </div>
    </div>
  );
};

export default Tabs;
Tabs.propTypes = {
  singleProduct: PropTypes.object,
  setSingleProduct: PropTypes.func,
};

