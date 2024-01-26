import { useState } from "react";
import { Outlet } from "react-router-dom";
import { DashboardNav } from "../components/DashboardNav";
import SideNavDashboard from "../components/Dashboard/SideNavDashboard";
const Dashboard = () => {
  const [activeLink, setActiveLink] = useState("");
  const [sidebar, setSidebar] = useState(false);
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
    </div>
  );
};

export default Dashboard;
