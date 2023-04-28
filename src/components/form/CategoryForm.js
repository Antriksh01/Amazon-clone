import React from "react";

const CategoryForm = ({ onSubmit, value, setValue }) => {
  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter new Category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
