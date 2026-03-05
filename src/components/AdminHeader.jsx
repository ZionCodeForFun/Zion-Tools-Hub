import React from "react";
import { FaSignOutAlt } from "react-icons/fa";

export default function AdminHeader({ onLogout }) {
  return (
    <header className="admin-header">
      <div className="admin-header-logo">Zion Tools Hub Admin</div>
      <button className="admin-header-logout" onClick={onLogout}>
        <FaSignOutAlt /> Logout
      </button>
    </header>
  );
}
