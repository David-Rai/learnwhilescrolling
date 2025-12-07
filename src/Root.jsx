import React, { useEffect } from "react";
import checkLimit from "./utils/checkLimit";
import Signup from "./routes/auth/Signup";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import Sidebar from "./components/Sidebar";
import BottomNav from "./components/BottomNav";
import { useScrollLimit } from "./context/store";

const Layout = () => {
  const { scrollLimit } = useScrollLimit();
  
  useEffect(() => {
    checkLimit();
  }, []);

  return scrollLimit.shouldLimit ? (
    <div className="h-[100dvh]">
      <Signup />
    </div>
  ) : (
    <div className="h-[100dvh] w-full bg-bg md:flex md:flex-row rootLayout">
      <Sidebar />
      <main className="h-[calc(100%-80px)] md:h-screen bg-bg w-full flex flex-col overflow-hidden">
        <Outlet />
      </main>
      <BottomNav />
      <ToastContainer />
    </div>
  );
};

export default Layout;
