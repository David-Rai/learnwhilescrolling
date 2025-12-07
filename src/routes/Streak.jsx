import React from "react";
import { checkUser } from "../utils/checkUser";
import streakImage from '../../public/streak.png'
import { useState, useEffect } from "react";
import supabase from "../config/supabase";
import useHomeStore from "../context/store";

const Streak = () => {
  const { user } = useHomeStore();
  const [streak,setStreak]=useState(0)
  useEffect(() => {
    getStreak();
  }, []);

  const getStreak = async () => {
    const res = await checkUser();
    if (!res.exist) return;
    const user_id = res.user.id;
    const { data, error } = await supabase
      .from("streaks")
      .select()
      .eq("user_id", user_id)
      .single()
    if (error) return;
    setStreak(data)
  };

  return (
     <main className="h-full w-full flex px-2">
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
          <p className="text-base font-medium">
            Current Streak!
          </p>
        </div>
      </section>
    </main>
  );
};

export default Streak;
