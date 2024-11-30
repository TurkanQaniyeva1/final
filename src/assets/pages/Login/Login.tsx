import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "./login.css";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const initialValues = { email: "", password: "" };

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      const response = await fetch("https://6748a18c5801f5153591ac77.mockapi.io/epic-users/Users");
      const users = await response.json();

      const user = users.find(
        (user: { email: string; password: string }) =>
          user.email === values.email && user.password === values.password
      );

      if (user) {
        console.log("Login successful:", user);
        localStorage.setItem("user", JSON.stringify(user)); // Save user to localStorage
        navigate("/");
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <Field type="email" name="email" className="input-field" />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field type="password" name="password" className="input-field" />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>

            <button type="submit" disabled={isSubmitting} className="submit-button">
              Log In
            </button>
          </Form>
        )}
      </Formik>

      <div className="links">
        <a href="#" className="link">Forgot your password?</a>
        <a href="/register" className="link">Create an account</a>
      </div>
    </div>
  );
};

export default LoginForm;
