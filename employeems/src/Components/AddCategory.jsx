import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!category.trim()) {
      setError("Category name cannot be empty!");
      return;
    }

    axios
      .post("http://localhost:3000/auth/add_category", { category })
      .then((result) => {
        if (result.data.status) {
          navigate("/dashboard/category");
        } else {
          setError(result.data.Error);
        }
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to add category. Please try again.");
      });

    console.log("Category Added:", category);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4 w-50 border-0 rounded-3">
        <h3 className="text-center text-primary mb-3">
          <i className="bi bi-tags-fill me-2"></i> Add Category
        </h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="category" className="form-label fw-bold">
              Category Name:
            </label>
            <input
              type="text"
              id="category"
              name="category"
              className="form-control shadow-sm"
              placeholder="Enter Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-outline-success w-100">
            <i className="bi bi-plus-circle me-2"></i> Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
