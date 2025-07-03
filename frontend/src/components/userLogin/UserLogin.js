import React, { useEffect, useState } from "react";
import logo from "../../Logo1.jpg";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../services/loginApi";

const UserLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.clear();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      await loginApi(formData, navigate);
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-success-subtle min-vh-100 position-relative">
      <div className="position-absolute top-0 start-0 m-3 z-0">
        <img src={logo} alt="Logo" height={80} />
      </div>

      <div className="bg-light shadow-lg rounded-4 p-4 text-center w-100" style={{ maxWidth: "450px" }}>
        <h4 className="mb-4">Login</h4>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              minLength="8"
              required
            />
          </div>

          {error && <div className="alert alert-danger mb-3">{error}</div>}

          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">Login</button>
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="btn btn-outline-secondary"
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
