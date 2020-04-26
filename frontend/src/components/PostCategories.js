import React from "react";

const PostCategories = ({ categories }) => {
  if (!categories) {
    return null;
  }

  return (
    <>
      {categories.map((category, index) => (
        <p key={index} data-testid="category">
          {category}
        </p>
      ))}
    </>
  );
};

export default PostCategories;
