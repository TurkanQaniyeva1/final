import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../store/actions/userAction";
import "./login.css";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData, loading, error } = useSelector((state: any) => state.user);

  const initialValues = { email: "", password: "" };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleSubmit = (values: { email: string; password: string }) => {
    dispatch(fetchUser(values.email, values.password));
  };

  useEffect(() => {
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
      navigate(`/profile/${userData.id}`);
    }
  }, [userData, navigate]);

  return (
    <div className="dark-login">
      <div className="dark-login-container">
        <h1 className="dark-login-title">Login</h1>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form className="dark-login-form">
              <div className="dark-form-group">
                <label htmlFor="email">Email address</label>
                <Field type="email" name="email" className="dark-input-field" />
                <ErrorMessage name="email" component="div" className="dark-error-message" />
              </div>
              <div className="dark-form-group">
                <label htmlFor="password">Password</label>
                <div className="dark-password-wrapper">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="dark-input-field"
                  />
                  <span className="dark-password-icon" onClick={togglePasswordVisibility}>
                    {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </span>
                </div>
                <ErrorMessage name="password" component="div" className="dark-error-message" />
              </div>
              {loading && <div className="dark-loading-message">Logging in...</div>}
              {error && <div className="dark-error-message">{error}</div>}
              <button type="submit" disabled={isSubmitting || loading} className="dark-submit-button">
                Log In
              </button>
            </Form>
          )}
        </Formik>
        <div className="dark-register-link">
          <p>Don't have an account? <a href="/register">Register here</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
