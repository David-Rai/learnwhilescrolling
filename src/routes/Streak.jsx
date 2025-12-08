import React from "react";
import { getStats } from "../utils/getStats";
import { checkUser } from "../utils/checkUser";
import streakImage from "../../public/streak.png";
import { useState, useEffect } from "react";
import supabase from "../config/supabase";
import useHomeStore from "../context/store";
import Loader from "../components/Loader";

const Streak = () => {
  const { user } = useHomeStore();
  const [streak, setStreak] = useState(null);
  const [stats, setStats] = useState(null);
  useEffect(() => {
    getStreak();
    getAttemptQuestions();
  }, []);

  //Getting the streak from supabase
  const getStreak = async () => {
    const res = await checkUser();
    if (!res.exist) return;
    const user_id = res.user.id;
    const { data, error } = await supabase
      .from("streaks")
      .select()
      .eq("user_id", user_id)
      .single();

    if (error) return;
    setStreak(data);
  };

  //Get all attempts questions
  const getAttemptQuestions = async () => {
    const res = await checkUser();
    if (!res.exist) return;
    const user_id = res.user.id;
    const userStats = await getStats(user_id);
    setStats(userStats);
  };

  if (!streak || !stats) {
    return <Loader />;
  }

  return (
    <main className="h-full w-full flex px-2 flex-col">
      <section className="w-full flex flex-col justify-center items-center gap-3 py-8">
        {/* Streak Image with subtle hover effect */}
        <div className="transform transition-transform duration-300 hover:scale-105">
          <img
            src={streakImage}
            alt="streak image"
            className="h-32 w-32 transition-opacity duration-300 hover:opacity-90"
          />
        </div>

        {/* Streak Count */}
        <div className="text-center space-y-1 transform transition-all duration-300 hover:scale-105">
          <h1 className="text-5xl font-bold transition-transform duration-300">
            {streak?.streak_count || 0}
          </h1>
          <p className="text-base font-medium">Current Streak!</p>
        </div>
      </section>

      {/* Bottom section */}
      <section className="w-full flex items-center justify-center px-6">
        <div className="flex flex-col items-center w-full justify-center py-4 bg-secondary rounded-md">
          <h1 className="text-black font-semibold">Todays stats</h1>

          <section className="flex gap-4 bg-bg p-4 rounded-md">
            <div className="flex flex-col items-center">
              <p className="text-gray-400">Days</p>
              <h1 className="text-black font-bold">
                {streak?.streak_count || 0}
              </h1>
            </div>

            <div className="flex flex-col items-center">
              <p className="text-gray-400">Questions</p>
              <h1 className="text-black font-bold">{stats?.total || 0}</h1>
            </div>

            <div className="flex flex-col items-center">
              <p className="text-gray-400">Points</p>
              <h1 className="text-black font-bold">{stats?.point || 0}</h1>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
};

export default Streak;
