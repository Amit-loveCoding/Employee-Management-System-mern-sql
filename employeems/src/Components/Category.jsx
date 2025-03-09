import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Category = () => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/category")
      .then((result) => {
        if (result.data.status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container mt-4">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">
          <i className="bi bi-tags-fill text-primary me-2"></i> Category List
        </h3>
        <Link to="/dashboard/add_category" className="btn btn-outline-success">
          <i className="bi bi-plus-lg me-1"></i> Add Category
        </Link>
      </div>

      {/* Category Table */}
      <div className="card shadow-sm">
        <div className="card-body">
          {category.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-striped table-bordered">
                <thead className="table-primary">
                  <tr>
                    <th className="text-center">Category Name</th>
                  </tr>
                </thead>
                <tbody>
                  {category.map((c, index) => (
                    <tr key={index}>
                      <td className="text-center">{c.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <h5 className="text-muted text-center my-3">
              No categories added yet.
            </h5>
          )}
        </div>
      </div>
    </div>
  );
};

export default Category;
