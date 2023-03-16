import React from "react";

const pages = Array.from(Array(12).keys());

const Pagination = ({ page, onChange }) => {
  return (
    <div className="container-pagination">
      {pages.map((item) => (
        <div
          className={`item-pagination ${page === item ? "active" : ""}`}
          onClick={() => onChange(item)}
        >
          {item + 1}
        </div>
      ))}
    </div>
  );
};

export default Pagination;
