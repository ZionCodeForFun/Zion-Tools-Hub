import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import AdminProductForm from "./AdminProductForm";
import SkeletonLoader from "../components/SkeletonLoader";
import "../adminStyles/admin.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/admin/login");
      } else {
        setSession(session);
      }
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/admin/login");
      } else {
        setSession(session);
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  if (loading) {
    return <SkeletonLoader type="dashboard" />;
  }

  return (
    <div className="admin-dashboard">
      <AdminHeader onLogout={handleLogout} />
      <div className="admin-main">
        <AdminSidebar />
        <div className="admin-content">
          <AdminProductForm />
        </div>
      </div>
    </div>
  );
}
