import React from "react";
import { checkUser } from "../utils/checkUser";
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
      {/* Top section */}
      <section className="w-full flex flex-col justify-center items-center">
        <h1>{streak?.streak_count || 0}</h1>
        <p>Current Streak!</p>
      </section>
      
    </main>
  );
};

export default Streak;
