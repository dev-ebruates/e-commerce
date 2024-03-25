import { useEffect, useState } from "react";
import ReviewForm from "./ReviewForm";
import ReviewItem from "./ReviewItem";
import "./Reviews.css";
import PropTypes from "prop-types";
import { message } from "antd";

const Reviews = ({ activeTab, singleProduct, setSingleProduct }) => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [users, setUsers] = useState([]);
  const thisReview = [];
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/user`);
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          message.error("Veri Getirme Başarısız.");
        }
      } catch (error) {
        console.log("Veri Hatası:", error);
      }
    };
    fetchUsers()
  }, [apiUrl]);
  console.log("users",users)
  singleProduct.reviews.forEach((review)=>{
    const matchingUsers = users?.filter((user)=> user._id === review.user);
    matchingUsers.forEach((matchingUser) =>{
      thisReview.push(({
        review: review,
        user:matchingUser,
      }))
    })
  })


  return (
    <div
      className={`tab-panel-reviews  ${
        activeTab === "reviews" ? " content active" : "content"
      }`}
    >
      {singleProduct.reviews.length > 0 ? (
        <>
          <h3>2 reviews for Basic Colored Sweatpants With Elastic Hems</h3>
          <div className="comments">
            <ol className="comment-list">
              {thisReview.map((item, index) => (
                <ReviewItem key={index} item={item} reviewItem={item} />
              ))}
            </ol>
          </div>
        </>
      ) : (
        <h3>Hiç yorum yok...</h3>
      )}

      <div className="review-form-wrapper">
        <h2>Add a review</h2>
        <ReviewForm
          singleProduct={singleProduct}
          setSingleProduct={setSingleProduct}
        />
      </div>
    </div>
  );
};

export default Reviews;
Reviews.propTypes = {
  activeTab: PropTypes.string,
  singleProduct: PropTypes.object,
  setSingleProduct: PropTypes.func,
};
