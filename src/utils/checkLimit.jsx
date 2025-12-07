import React from "react";
import supabase from "../config/supabase";
import { checkUser } from "./checkUser";
import { useScrollLimit } from "../context/store";

//checking scroll limit on the localstorage
const checkLimit = async () => {
  const res = await checkUser();
  const { updateScrollLimit } = useScrollLimit.getState();

  //Increase the streak
  if (res.exist) {
    const formatDate = (date) => {
      return date.toISOString().split("T")[0];
    };

    const updateStreak = async () => {
      const user_id = res.user.id;
      const date = new Date();
      const today_date = formatDate(date);
      const yesterday_date = new Date();
      yesterday_date.setDate(yesterday_date.getDate() - 1);

      const { data, error } = await supabase
        .from("streaks")
        .select()
        .eq("user_id", res.user.id);
      if (error) return;

      //1(if new user)
      if (data.length === 0) {
        await supabase.from("streaks").insert({
          user_id,
          streak_count: 1,
          last_active_date: today_date,
          updated_today: true,
        });

        console.log("new user streak 1");
        return;
      }

      //2 (if already updated)
      if (data[0].last_active_date === today_date) {
        return console.log("already updated the streak today");
      }

      //3 (if yesterday was active)
      if (formatDate(yesterday_date) === data[0].last_active_date) {
        console.log("yesterday was active and today just now");
        const newStreak = data[0].streak_count + 1;
        await supabase
          .from("streaks")
          .update({ streak_count: newStreak, last_active_date: today_date })
          .eq("user_id", user_id);
      }
      else
        {
        //4 (not yesterday nor today)
          await supabase
          .from("streaks")
          .update({ streak_count: 1, last_active_date: today_date })
          .eq("user_id", user_id);
      }
    };
    updateStreak();
  }

  //checking if user is loggedin
  if (res.exist)
    return updateScrollLimit({ shouldLimit: false, scrollCount: 0 });

  const data = localStorage.getItem("scrollLimit");
  const scrollLimitData = JSON.parse(data);

  if (scrollLimitData) {
    if (scrollLimitData.scrollCount >= 5)
      return updateScrollLimit({ shouldLimit: true, scrollCount: 5 });
    return updateScrollLimit(scrollLimitData);
  }
  return updateScrollLimit({ shouldLimit: false, scrollCount: 0 });
};

export default checkLimit;
