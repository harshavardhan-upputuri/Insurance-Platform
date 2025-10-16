import { useDispatch } from "react-redux";
import { createReview, fetchReviewByProductId } from "../../State/Customer/ReviewSlice";
import { useState } from "react";

const AddReviewForm = ({ productId }) => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!jwt) {
      alert("Please log in to post a review.");
      return;
    }
    if (reviewRating === 0 || reviewText.trim() === "") {
      alert("Please add both rating and review text.");
      return;
    }

    dispatch(createReview({
      productId,
      jwt,
      req: { reviewText, reviewRating }
    })).then(() => {
      setReviewText("");
      setReviewRating(0);
      dispatch(fetchReviewByProductId({ productId }));
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border rounded-xl bg-[#f7fbfd] mb-6 shadow-sm"
    >
      <h3 className="text-[18px] font-semibold mb-2">Write a Review</h3>

      <div className="flex items-center gap-2 mb-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => setReviewRating(star)}
            className={`cursor-pointer text-[24px] ${star <= reviewRating ? "text-yellow-500" : "text-gray-400"}`}
          >
            ★
          </span>
        ))}
      </div>

      <textarea
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        className="w-full border rounded-lg p-2 text-sm"
        placeholder="Share your experience..."
        rows="3"
      />

      <button
        type="submit"
        className="mt-3 px-4 py-2 bg-[#1e6089] text-white rounded-lg hover:bg-[#164b6a]"
      >
        Submit Review
      </button>
    </form>
  );
};


export default AddReviewForm;