import React, { useEffect, useState } from "react";
import logo from "../../Logo1.jpg";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  useEffect(() => {
    localStorage.clear();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });


      const result = await response.json();

      if (!response.ok) {
        return alert(result.error || "Login failed");
      }
      localStorage.setItem("token", result.data.token);
      navigate('/place');
    } catch (error) {
      console.error('Sign in failed' || error.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-success-subtle position-relative" style={{ height: '100vh' }}>
      <div className="position-absolute top-0 start-0 z-0">
        <img src={logo} alt="Logo" height={100}/>
      </div>
      <div className="shadow-lg rounded-3 p-4 bg-light text-center">
        <h4>Login</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="username"
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
          <button type="submit" className="btn btn-primary mt-3 me-2">Login</button>
          <button type="button" onClick={() => {
            navigate('/userRegister')
          }} className="btn btn-secondary mt-3">Signup</button>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
