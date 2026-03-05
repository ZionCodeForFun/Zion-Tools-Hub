import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import "../adminStyles/admin.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (authError) {
      setError(authError.message || "Login failed");
    } else {
      // Redirect to dashboard on success
      navigate("/admin/dashboard");
    }
  };

  // if there's already a session, send to dashboard
  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/admin/dashboard");
      }
    });
  }, [navigate]);

  return (
    <div className="admin-container">
      <form className="admin-form" onSubmit={handleSubmit}>
        <h2 className="admin-form-title">Admin Login</h2>
        {error && <div className="admin-error">{error}</div>}
        <input
          type="email"
          placeholder="Email"
          className="admin-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="admin-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="admin-btn admin-btn-primary" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="admin-form-footer">
          <Link to="/admin/forgot-password">Forgot password?</Link>
        </p>
      </form>
    </div>
  );
}
