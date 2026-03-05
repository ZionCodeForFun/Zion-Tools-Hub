import React from "react";
import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <nav className="admin-sidebar">
      <ul>
        <li>
          <Link to="/admin/dashboard">Dashboard</Link>
        </li>
        {/* future links: products, orders, categories, etc. */}
      </ul>
    </nav>
  );
}
