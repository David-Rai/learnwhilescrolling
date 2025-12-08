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
      <main className=" bg-bg h-[calc(100%-80px)] bg-bg text-text flex flex-col items-center">
        <header
          className="flex gap-4 py-2 mx-2 my-4 items-center justify-evenly
            rounded-full bg-secondary md:w-1/2"
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
