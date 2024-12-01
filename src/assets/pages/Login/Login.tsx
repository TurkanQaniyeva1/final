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
    <div className="login">
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
              <div className="form-group password-group">
                <label htmlFor="password">Password</label>
                <div className="password-wrapper">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="input-field"
                  />
                  <span className="password-icon" onClick={togglePasswordVisibility}>
                    {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </span>
                </div>
                <ErrorMessage name="password" component="div" className="error-message" />
              </div>
              {loading && <div className="loading-message">Logging in...</div>}
              {error && <div className="error-message">{error}</div>}
              <button type="submit" disabled={isSubmitting || loading} className="submit-button">
                Log In
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
