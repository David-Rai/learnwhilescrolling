import supabase from "../config/supabase";
import checkLimit from "./checkLimit";
import checkIsAnsweredAll from "./checkIsAnsweredAll";
import useHomeStore, { useScrollLimit } from "../context/store";

//Handling Answering
export const checkAnswer = async (q, opt) => {
  const { answers = [], setAnswers, user } = useHomeStore.getState();
  const { scrollLimit, updateScrollLimit } = useScrollLimit.getState();

  // prevent re-clicking
  if (answers.find((ans) => ans.id === q.id)) return;

  const isCorrect = q.a === opt;

  // save the answer
  setAnswers([...answers, { id: q.id, selectedOption: opt, isCorrect }]);

  //Checking if all answers are answered in this category lesson
  checkIsAnsweredAll();

  //For scrollLimits
  if (!user) {
    checkLimit();
    const state = scrollLimit.scrollCount >= 5 ? true : false;
    const count = scrollLimit.scrollCount + 1;
    updateScrollLimit({ shouldLimit: state, scrollCount: count });
  }

  // //Increase the streak
  // if (user) {
  //   const updateStreak = async () => {
  //     //1(if not yesterday nor today)
  //     const res = await supabase.from("streaks").eq("user_id", user.id);
  //     console.log(res)
  //   };
  //   updateStreak()
  // }

  //Increase the points and insert into user answers
  if (user?.id) {
    const scoreDelta = isCorrect ? 5 : -5;

    await supabase.rpc("increment_points", {
      uid: user.id,
      delta: scoreDelta,
    });

    await supabase.from("user_answer").insert({
      user_id: user.id,
      q_id: q.id,
      answer: opt,
      isRight: isCorrect,
    });
  }
};
