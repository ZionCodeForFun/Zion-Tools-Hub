import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import "../adminStyles/admin.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const { data, error: resetError } =
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/admin/login`,
      });

    if (resetError) {
      setError(resetError.message || "Failed to send reset email");
    } else {
      setMessage("Password reset link sent. Check your inbox.");
    }
  };

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        // if already logged in, redirect to dashboard; no need to reset
        window.location.href = "/admin/dashboard";
      }
    });
  }, []);

  return (
    <div className="admin-container">
      <form className="admin-form" onSubmit={handleSubmit}>
        <h2 className="admin-form-title">Forgot Password</h2>
        {message && <div className="admin-success">{message}</div>}
        {error && <div className="admin-error">{error}</div>}
        <input
          type="email"
          placeholder="Email"
          className="admin-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="admin-btn admin-btn-primary">
          Send Reset Link
        </button>
      </form>
    </div>
  );
}
