import React from "react";
import { Outlet } from "react-router";
import { NavLink } from "react-router";

const links = [
  { to: "streak", label: "streak" },
  { to: "leaderboard", label: "leaderboard" },
];

const StreakLeaderboard = () => {
  return (
    <>
      <main className=" bg-bg h-[calc(100%-80px)] g text-text flex flex-col">
        <header
          className="flex gap-4 py-2 mx-2 my-4 items-center justify-evenly
        rounded-full bg-secondary"
        >
          {links.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              end
              className={({ isActive }) =>
                `px-6 py-3 text-gray-300 ${
                  isActive
                    ? "bg-bg rounded-full"
                    : ""
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </header>
        <Outlet />
      </main>
    </>
  );
};

export default StreakLeaderboard;
