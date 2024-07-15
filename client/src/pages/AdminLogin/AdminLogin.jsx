import { Button, Input } from "@mantine/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { adminLogin } from "../../Action/AuthAction";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({
    password: "",
    email: "",
  });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const validateEmail = (value) => {
    if (!value.trim()) {
      return <h1 className="text-red-500  text-right">Email is required</h1>;
    }
    return null;
  };

  const validatePassword = (value) => {
    if (!value.trim()) {
      return <h1 className="text-red-500  text-right">Password is required</h1>;
    } else if (value.length < 6) {
      return (
        <h1 className="text-red-500  text-right">
          Password must be at least 6 characters
        </h1>
      );
    }
    return null;
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const passwordError = validatePassword(formData.password);
    const nameError = validateEmail(formData.email);
    setErrors({ password: passwordError, email: nameError });
    dispatch(adminLogin(formData));
  };

  return (
    <div className="grid h-[100vh] w-full grid-cols-1 lg:grid-cols-2">
      <div className="hidden h-screen overflow-hidden lg:block bg-blue-500 rounded-r-2xl ">
        <img src="/admin-login.svg" alt="Admin Illustration" className="  " />
      </div>
      <div className="flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Welcome back!</h1>
            <p className="text-muted-foreground">
              Sign in to your account to continue
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-3">
              <label htmlFor="username">Email</label>
              <Input
                id="email"
                type="email"
                placeholder="Admin123@gmail.com"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            {errors.email && <p className="error">{errors.email}</p>}

            <div className="space-y-3">
              <label>Password</label>
              <Input
                id="password"
                type="password"
                placeholder="Admin123"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            {errors.password && <p className="error">{errors.password}</p>}
            <Button type="submit" className="w-full bg-blue-600">
              Sign in
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
