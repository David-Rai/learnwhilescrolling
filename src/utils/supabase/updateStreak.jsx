import supabase from "../../config/supabase";
import useHomeStore from "../../context/store";

//Fomates dates to 2023-12-2 format
const formatDate = (date) => {
  return date.toISOString().split("T")[0];
};

//Updating the Streak
const updateStreak = async () => {
  const { user } = useHomeStore.getState();
  const user_id = user.id;
  const date = new Date();
  const today_date = formatDate(date);
  const yesterday_date = new Date();
  yesterday_date.setDate(yesterday_date.getDate() - 1);

  //Checking if already updated the streak
  const lastUpdated = localStorage.getItem("streak_last_updated");
  console.log(lastUpdated);
  if (lastUpdated === today_date) {
    return console.log("already updated the streak today");
  } else {
    localStorage.setItem("streak_last_updated", today_date);
  }

  //Getting user streak datas
  const { data, error } = await supabase
    .from("streaks")
    .select()
    .eq("user_id", user_id);
  if (error) return;

  //1(if new user)
  if (data.length === 0) {
    await supabase.from("streaks").insert({
      user_id,
      streak_count: 1,
      last_active_date: today_date,
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
  } else {
    //4 (not yesterday nor today)
    await supabase
      .from("streaks")
      .update({ streak_count: 1, last_active_date: today_date })
      .eq("user_id", user_id);
  }
};

export default updateStreak;
