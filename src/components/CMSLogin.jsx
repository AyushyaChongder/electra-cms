import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles.css";
import loginimage from "../assets/img/login_vector.png";
import googlelogo from "../assets/img/search.png";
import CircularProgress from "@mui/material/CircularProgress"; // Import MUI CircularProgress

function CMSLogin({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [modalError, setModalError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state for the login button
  const [isModalLoading, setIsModalLoading] = useState(false); // Loading state for the modal button
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true when submitting

    const apiUrl =
      "https://wic4l3ta3m.execute-api.ap-south-1.amazonaws.com/v1/userLogin";

    const requestBody = {
      user_name: username,
      password: password,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        setError("");
        onLogin();
        const from = location.state?.from?.pathname || "/";
        navigate(from, { replace: true });
        toast.success("Login successful!");
      } else {
        setError(data.message || "Invalid username or password.");
        toast.error(
          data.message || "Invalid username or password. Please try again."
        );
      }
    } catch (error) {
      setError("An error occurred during login. Please try again.");
      toast.error("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false); // Stop loading after the response
    }
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    setIsModalLoading(true); // Set loading state for the modal

    if (newPassword !== confirmPassword) {
      setModalError("Passwords do not match. Please try again.");
      toast.error("Passwords do not match. Please try again.");
      setIsModalLoading(false);
      return;
    }

    const resetPasswordApiUrl =
      "https://h363oe6bd1.execute-api.ap-south-1.amazonaws.com/v1/updatePassword";

    const requestBody = {
      user_name: "admin",
      new_password: newPassword,
    };

    try {
      const response = await fetch(resetPasswordApiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        setModalError("");
        setIsModalOpen(false);
        setPassword("");
        toast.success("Password updated successfully! Please log in again.");
      } else {
        setModalError(data.message || "Failed to reset password.");
        toast.error(
          data.message || "Failed to reset password. Please try again."
        );
      }
    } catch (error) {
      setModalError("An error occurred while resetting the password.");
      toast.error(
        "An error occurred while resetting the password. Please try again."
      );
    } finally {
      setIsModalLoading(false); // Stop loading after the response
    }
  };

  return (
    <div className="login-container">
      <ToastContainer />
      <div className="login-content">
        <div className="login-left">
          <img
            src={loginimage}
            alt="Support Illustration"
            className="login-image"
          />
        </div>

        <div className="login-right">
          <h2 className="login-form-heading montserrat-regular">
            Electrapower - CMS
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="login-form-group">
              <label
                htmlFor="username"
                className="login-form-label montserrat-regular"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                className="login-form-input montserrat-regular"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="login-form-group">
              <label
                htmlFor="password"
                className="login-form-label montserrat-regular"
              >
                Password
              </label>
              <div className="login-password-wrapper">
                <input
                  type="password"
                  id="password"
                  className="login-form-input montserrat-regular"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="cms-upload-button montserrat-regular"
              disabled={isLoading} // Disable button when loading
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Sign In"
              )}{" "}
              {/* Show loader when loading */}
            </button>
          </form>

          <div className="text-center login-forgot-password">
            <a
              href="#"
              className="login-text-link montserrat-regular"
              onClick={() => setIsModalOpen(true)}
            >
              Forgot password?
            </a>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="cms-modal-overlay">
          <div className="cms-modal-content">
            <h2 className="montserrat-regular">Reset Your Password</h2>
            <form onSubmit={handleModalSubmit}>
              <label className="montserrat-regular">
                New Password:
                <input
                  type="password"
                  className="cms-input"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </label>
              <label className="montserrat-regular">
                Confirm Password:
                <input
                  type="password"
                  className="cms-input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </label>
              <div className="modal-button-container">
                <button
                  type="submit"
                  className="cms-upload-button montserrat-regular"
                  disabled={isModalLoading} // Disable button when modal loading
                >
                  {isModalLoading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Submit"
                  )}{" "}
                  {/* Show loader in modal */}
                </button>
                <button
                  type="button"
                  className="cms-close-button montserrat-regular"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CMSLogin;


