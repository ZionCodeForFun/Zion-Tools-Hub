import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import "../styles/pageTransition.css";

const Layout = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {loading && <Spinner />}
      <div className={`page-wrapper ${loading ? "fade-out" : "fade-in"}`}>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;