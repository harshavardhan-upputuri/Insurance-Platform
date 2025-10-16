import { useEffect, useState } from "react";
import {
  deleteReview,
  fetchReviewByProductId,
  updateReview,
} from "../../State/Customer/ReviewSlice";
import { useDispatch, useSelector } from "react-redux";

const ReviewList = ({ productId }) => {
  const dispatch = useDispatch();
  const { reviews, loading } = useSelector((state) => state.review);
  const jwt = localStorage.getItem("jwt");
//   const [userId, setUserId] = useState(null);

  // For editing
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editRating, setEditRating] = useState(0);

  useEffect(() => {
    dispatch(fetchReviewByProductId({ productId }));
  }, [dispatch, productId]);

  // Decode JWT to get current userId
//   useEffect(() => {
//     if (jwt) {
//       try {
//         const payload = JSON.parse(atob(jwt.split(".")[1]));
//         setUserId(payload.id);
//       } catch (err) {
//         console.log("Invalid JWT");
//       }
//     }
//   }, [jwt]);

  if (loading) return <p>Loading reviews...</p>;

  if (!reviews || reviews.length === 0)
    return <p className="text-gray-500 italic">No reviews yet. Be the first to write one!</p>;

  return (
    <div className="space-y-4">
      {reviews.map((review) => {
        const isEditing = editingReviewId === review.id;

        return (
          <div key={review.id} className="p-4 border rounded-xl shadow-sm bg-[#f9f9f9]">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-[16px]">
                  {review.user?.fullName || "Anonymous"}
                </h4>
                <div className="text-yellow-500">
                  {"★".repeat(Math.round(review.rating)) +
                    "☆".repeat(5 - Math.round(review.rating))}
                </div>
              </div>

              {(
                <div className="flex gap-3">
                  {isEditing ? (
                    <>
                      <button
                        onClick={() => {
                          dispatch(
                            updateReview({
                              reviewId: review.id,
                              jwt,
                              req: {
                                reviewText: editText,
                                reviewRating: editRating,
                              },
                            })
                          ).then(() => {
                            setEditingReviewId(null);
                            dispatch(fetchReviewByProductId({ productId }));
                          });
                        }}
                        className="text-green-600 text-sm hover:underline"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingReviewId(null)}
                        className="text-gray-500 text-sm hover:underline"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setEditingReviewId(review.id);
                          setEditText(review.reviewText);
                          setEditRating(review.rating);
                        }}
                        className="text-blue-500 text-sm hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          dispatch(deleteReview({ reviewId: review.id, jwt })).then(() => {
                            dispatch(fetchReviewByProductId({ productId }));
                          });
                        }}
                        className="text-red-500 text-sm hover:underline"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Review Content */}
            {isEditing ? (
              <div className="mt-3 space-y-2">
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  rows="2"
                ></textarea>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-700">Rating:</span>
                  <select
                    value={editRating}
                    onChange={(e) => setEditRating(Number(e.target.value))}
                    className="border p-1 rounded-md"
                  >
                    {[1, 2, 3, 4, 5].map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ) : (
              <>
                <p className="mt-2 text-gray-700">{review.reviewText}</p>
                <p className="text-[12px] text-gray-400 mt-1">
                  {new Date(review.createdAt).toLocaleString()}
                </p>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ReviewList;
