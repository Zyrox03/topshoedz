import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { DashboardNav } from "../components/DashboardNav";
import SideNavDashboard from "../components/Dashboard/SideNavDashboard";
import Notification from "../widgets/Notification";
import { useSelector } from "react-redux";
import routes from "../routes";
const Dashboard = () => {
  const [activeLink, setActiveLink] = useState("");
  const [sidebar, setSidebar] = useState(false);

  const { pathname } = useLocation();

  useEffect(()=>{

    const currentPage = routes.find(route => pathname.startsWith(route.path));
    setActiveLink(currentPage?.title || 'Bienvenue !')

  },[pathname])

  // notification

  const { notification } = useSelector((state) => state.notification);

  return (
    <div className="min-h-screen bg-slate-300/50 flex flex-col relative ">
      <div className="flex gap-4">
        <SideNavDashboard
          activeLink={activeLink}
          setSidebar={setSidebar}
          sidebar={sidebar}
          setActiveLink={setActiveLink}
        />
        <div className="w-full flex flex-col lg:pl-6 ml-auto lg:w-[80%]">
          <DashboardNav
            activeLink={activeLink}
            sidebar={sidebar}
            setSidebar={setSidebar}
          />
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              <Outlet />
            </div>
          </main>
        </div>
      </div>

      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}
    </div>
  );
};

export default Dashboard;
