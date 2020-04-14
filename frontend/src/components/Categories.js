import React from "react";
import { useSelector } from "react-redux";

const Categories = (props) => {
  const categories = useSelector((state) => state.categories);

  return categories.map((category) => (
    <p key={category.id} data-testid="category-item">
      {category.name}
    </p>
  ));
};

export default Categories;
