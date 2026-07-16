import React, { useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import getQuestions from "../utils/getQuestions.jsx";
import { observe } from "../utils/observe.jsx";
import filterAnsweredQuestions from "../utils/filterAnsweredQuestions.jsx";
import Hintsection from "../components/Hintsection.jsx";
import Loader from "../components/Loader.jsx";
import SocialIcons from "../components/SocialIcons";
import Question from "../utils/Question.jsx";
import useHomeStore from "../context/store.js";
import insertUserIfFirstLogin from "../utils/insertUserIfNewUser.jsx";
import CompletedAll from "../components/CompletedAll.jsx";
import SelectACategory from "../components/SelectACategory.jsx";
import updateStreak from "../utils/supabase/updateStreak.jsx";

const Home = () => {
  const lessons = useHomeStore((state) => state.lessons);
  const hintVisible = useHomeStore((state) => state.hintVisible);
  const answers = useHomeStore((state) => state.answers);
  const currentLesson = useHomeStore((state) => state.currentLesson);
  const currentCategory = useHomeStore((state) => state.currentCategory);
  const isIntroDone = useHomeStore((state) => state.isIntroDone);
  const targetRef = useRef(null);
  const scrollContain = useRef(null);

  const currentSelectedLesson = lessons.find(
    (l) => l.name === currentLesson.name
  );
  const isAnsweredAll = currentSelectedLesson?.isAnsweredAll || false;
  const currentQuestions = currentSelectedLesson?.questions || [];
  const maxReached = currentSelectedLesson?.maxReached || false;
  const { user } = useHomeStore();

  // Initial setups
  useEffect(() => {
    insertUserIfFirstLogin(); // fix this shit

    // checking if category selected
    if (currentCategory.isSelected && currentLesson.isSelected) {
      // checking if answered
      if (answers.length > 0) {
        filterAnsweredQuestions(currentQuestions);
      }
      // fetching the questions for initials
      getQuestions();
      return;
    }
    updateStreak();
  }, []);

  // Stopping scrolling on hint container toggle
  useEffect(() => {
    if (scrollContain.current === null) return;
    if (hintVisible) {
      scrollContain.current.style.overflow = "hidden";
    } else {
      scrollContain.current.style.overflow = "auto";
    }
  }, [hintVisible]);

  // Intersection Observer
  useEffect(() => {
    if (currentSelectedLesson?.maxReached) return;
    const observer = observe();
    if (targetRef.current) {
      observer.observe(targetRef.current);
    }
    return () => {
      if (targetRef.current) observer.unobserve(targetRef.current);
    };
  }, [currentQuestions, currentSelectedLesson?.maxReached]);

  // NO categories and lesson is selected
  if (!currentLesson?.isSelected && !currentCategory?.isSelected && isIntroDone) {
    return <SelectACategory />;
  }

  // Showing when all questions are answered
  if (isAnsweredAll) {
    return <CompletedAll />;
  }

  // NO questions are available
  if (currentQuestions.length === 0 && maxReached === false && isIntroDone) {
    return <Loader />;
  }

  // Auto scroll to next after the answer selection
  const handleScroll = (questionIndex) => {
    setTimeout(() => {
      const nextSection = document.querySelectorAll(".snap-start")[questionIndex + 1];
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 450); // increased delay slightly for user to digest answer
  };

  return (
    <div className="relative h-full w-full bg-[var(--bg)] flex custom-scrollbar md:h-full overflow-hidden">

      {/* Ambient Premium Background Layer */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[var(--color-primary)] opacity-[0.12] blur-[120px] rounded-full animate-pulse-glow" style={{ animationDuration: '8s' }}></div>
        <div className="absolute top-[40%] right-[-10%] w-[50%] h-[50%] bg-indigo-600 opacity-[0.08] blur-[120px] rounded-full animate-pulse-glow" style={{ animationDuration: '12s', animationDelay: '2s' }}></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[60%] bg-emerald-500 opacity-[0.05] blur-[130px] rounded-full animate-pulse-glow" style={{ animationDuration: '10s', animationDelay: '4s' }}></div>
        {/* Subtle grid overly */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTAgMGgwLjV2NDBIMHptMCAwaDQwdjAuNUgweiIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAzKSIvPgo8L3N2Zz4=')] opacity-50"></div>
      </div>

      {/* Main Content */}
      <main
        ref={scrollContain}
        className="flex-1 w-full overflow-y-scroll snap-y snap-mandatory relative z-10"
      >
        {Array.isArray(currentQuestions) &&
          currentQuestions.map((q, index) => (
            <div
              key={index}
              className="snap-start question-container overflow-hidden min-h-full py-16 flex items-center justify-center relative"
            >
              {/* Subtle gradient divider behind each question */}
              {index !== 0 && (
                <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
              )}

              <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 relative z-20 px-4 md:px-8">
                {/* Question Area */}
                <div className="w-full flex-1 flex items-center justify-center">
                  <Question
                    q={q}
                    handleScroll={handleScroll}
                    questionIndex={index}
                  />
                </div>

                {/* Social Sidebar Area (like tiktok) */}
                <div className="mt-6 md:mt-0 md:self-end flex md:flex-col justify-end">
                  <SocialIcons q={q} />
                </div>
              </div>

              {index === currentQuestions.length - 2 && (
                <div ref={targetRef} className="absolute bottom-0 h-10 w-full" />
              )}
            </div>
          ))}
      </main>

      <Hintsection />
      <ToastContainer
        autoClose={100}
        theme="dark"
        toastClassName="bg-[#18181b] backdrop-blur-xl border border-white/10 text-white rounded-xl shadow-2xl"
      />
    </div>
  );
};

export default Home;
