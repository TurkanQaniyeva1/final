import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./register.css";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  gameName: Yup.string().nullable(),
});

const RegisterForm: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const initialValues = { firstName: "", lastName: "", email: "", password: "", gameName: "" };

  const handleSubmit = async (
    values: { firstName: string; lastName: string; email: string; password: string; gameName: string },
    { setSubmitting, resetForm }
  ) => {
    try {
      const generatedGameName =
        values.gameName || `${values.firstName}_${Math.random().toString(36).substr(2, 6)}`;

      const response = await fetch("https://6748a18c5801f5153591ac77.mockapi.io/epic-users/Users");
      const users = await response.json();

      const gameNameExists = users.some((user: { gameName: string }) => user.gameName === generatedGameName);

      if (gameNameExists) {
        setSubmitting(false);
        return console.error("This game name already exists");
      }

      const payload = {
        gameName: generatedGameName,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        balance: 0,
        wishlist: [],
        cart: [],
        purchasedGames: [],
      };

      await fetch("https://6748a18c5801f5153591ac77.mockapi.io/epic-users/Users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      setIsSuccess(true); 
      setTimeout(() => {
        navigate("/login");
      }, 2000);

      resetForm();
    } catch (error) {
      console.error("Error while registering user:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="register-container">
      {isSuccess && (
        <div
          className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in"
          role="alert"
        >
          Registration completed successfully!
        </div>
      )}

      <h1 className="register-title">Create an Account</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="register-form">
            <div className="form-group">
              <label htmlFor="gameName" className="label">
                Game Name (optional)
              </label>
              <Field type="text" name="gameName" className="input-field" />
              <ErrorMessage name="gameName" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="firstName" className="label">
                First Name
              </label>
              <Field type="text" name="firstName" className="input-field" />
              <ErrorMessage name="firstName" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="lastName" className="label">
                Last Name
              </label>
              <Field type="text" name="lastName" className="input-field" />
              <ErrorMessage name="lastName" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="label">
                Email Address
              </label>
              <Field type="email" name="email" className="input-field" />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="label">
                Password
              </label>
              <Field type="password" name="password" className="input-field" />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="submit-button"
            >
              {isSubmitting ? "Loading..." : "Register"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;