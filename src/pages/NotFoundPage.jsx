import React, { useEffect } from "react";
import { useNavigate } from "react-router";


const NotFoundPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <main className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>Redirecting to the homepage in 3 seconds...</p>
    </main>
  );
};

export default NotFoundPage;