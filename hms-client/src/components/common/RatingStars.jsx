import React from "react";

const RatingStars = ({ rating = 0 }) => {
  const totalStars = 5;

  return (
    <div className="flex items-center space-x-1">
      {[...Array(totalStars)].map((_, index) => (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          fill={index < rating ? "#facc15" : "none"}
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="#facc15"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.166 4.388a.563.563 0 00.424.307l4.846.705a.562.562 0 01.312.959l-3.51 3.422a.563.563 0 00-.162.498l.828 4.827a.562.562 0 01-.815.592l-4.336-2.282a.563.563 0 00-.524 0l-4.336 2.282a.562.562 0 01-.815-.592l.828-4.827a.563.563 0 00-.162-.498L2.732 9.858a.562.562 0 01.312-.959l4.846-.705a.563.563 0 00.424-.307l2.166-4.388z"
          />
        </svg>
      ))}
    </div>
  );
};

export default RatingStars;
