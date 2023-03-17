import React from "react";

const pages = Array.from(Array(10).keys());

const Pagination = ({ pagination, onChange }) => {
  return (
    <div className="container-pagination">
      {pages.map((item) => (
        <div
          className={`item-pagination ${pagination === item ? "active" : ""}`}
          onClick={() => onChange(item)}
        >
          {item + 1}
        </div>
      ))}
    </div>
  );
};

export default Pagination;
