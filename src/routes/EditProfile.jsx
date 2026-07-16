import React, { useRef, useEffect, useState } from "react";
import supabase from "../config/supabase";
import { ArrowLeft, Camera, Check } from "lucide-react";
import { useNavigate, useLocation } from "react-router";
import useHomeStore from "../context/store";

const avatars = [
  "/profiles/1.jpg",
  "/profiles/2.jpg",
  "/profiles/3.jpg",
  "/profiles/4.jpg",
  "/profiles/5.jpg",
  "/profiles/6.jpg",
  "/profiles/7.jpg",
  "/profiles/8.jpg",
  "/profiles/9.jpg",
];

const EditProfile = () => {
  const { user } = useHomeStore();
  const location = useLocation();
  const [userProfile, setUserProfile] = useState(location.state?.userProfile || null);
  const [userAvatar, setUserAvatar] = useState(location.state?.userProfile?.avatar || avatars[0]);
  const [isSaving, setIsSaving] = useState(false);
  const [showAvatars, setShowAvatars] = useState(false);
  const nameRef = useRef(null);
  const navigate = useNavigate();

  // Fetching User data
  const fetchUserData = async () => {
    try {
      const user_id = user?.id;
      if (!user_id) return;
      const { data, error } = await supabase
        .from("board")
        .select()
        .eq("user_id", user_id);

      if (error) {
        console.log(error);
      }

      if (data && data.length > 0) {
        setUserProfile(data[0]);
        if (!location.state?.userProfile) {
          setUserAvatar(data[0].avatar || avatars[0]);
        }
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  useEffect(() => {
    if (user && !location.state?.userProfile) {
      fetchUserData();
    }
  }, [user]);

  const handleUpdate = async () => {
    const user_id = user?.id;
    const name = nameRef.current.value.trim();

    if (!name || !user_id) return;

    setIsSaving(true);
    await supabase
      .from("board")
      .update({ username: name, avatar: userAvatar })
      .eq("user_id", user_id);

    setIsSaving(false);
    navigate(`/profile/${user_id}`);
  };

  return (
    <main className="min-h-dvh bg-bg flex flex-col items-center px-4 py-6 md:py-12 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[var(--color-primary)] opacity-20 blur-[100px] rounded-full pointer-events-none" />

      {/* Header */}
      <header className="w-full max-w-2xl flex flex-col gap-6 relative z-10">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-light)] border border-gray-700/50 shadow-lg transition-all"
        >
          <ArrowLeft className="w-5 h-5 text-gray-300" />
        </button>
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 drop-shadow-md">
            Edit Profile
          </h1>
          <p className="text-gray-400 text-sm md:text-base mt-2">
            Customize how your profile looks to other learners.
          </p>
        </div>
      </header>

      {/* Main content glass pane */}
      <section className="w-full max-w-2xl mt-8 p-6 md:p-10 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-3xl shadow-2xl relative z-10 flex flex-col items-center gap-10">

        {/* Avatar Section */}
        <div className="flex flex-col items-center gap-6 w-full">
          <div className="relative group mx-auto">
            <div className="absolute inset-0 bg-[var(--color-primary)] rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
            <img
              src={userAvatar}
              alt="Profile"
              className="relative rounded-full w-32 h-32 md:w-40 md:h-40 object-cover border-[3px] border-[var(--color-primary)] shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-transform duration-300"
            />
            <button
              onClick={() => setShowAvatars(!showAvatars)}
              className="absolute bottom-1 right-1 flex items-center justify-center bg-[var(--color-primary)] hover:bg-purple-600 outline outline-4 outline-[#0f0f13] text-white w-10 h-10 rounded-full shadow-lg hover:scale-110 transition-all duration-300 z-10"
              title="Change Avatar"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>

          {/* Avatar Selector Grid */}
          <div className={`w-full overflow-hidden transition-all duration-500 ease-in-out ${showAvatars ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="pt-2 pb-4">
              <p className="text-sm text-gray-400 mb-3 text-center">Choose an avatar</p>
              <div className="flex flex-wrap justify-center gap-3 md:gap-4 bg-black/20 p-4 rounded-2xl border border-white/5">
                {avatars.map((avatar, idx) => (
                  <div
                    key={idx}
                    onClick={() => setUserAvatar(avatar)}
                    className={`relative cursor-pointer rounded-full w-12 h-12 md:w-14 md:h-14 overflow-hidden border-2 transition-all duration-300 ${userAvatar === avatar
                        ? "border-[var(--color-primary)] scale-110 shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                        : "border-transparent hover:border-gray-500 hover:scale-105"
                      }`}
                  >
                    <img src={avatar} alt={`Avatar ${idx + 1}`} className="w-full h-full object-cover" />
                    {userAvatar === avatar && (
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap-2 relative">
            <label htmlFor="name" className="text-xs md:text-sm font-semibold tracking-wide text-gray-400 uppercase ml-1">
              Display Name
            </label>
            <input
              type="text"
              id="name"
              ref={nameRef}
              defaultValue={userProfile?.username || ""}
              placeholder="Enter your new name"
              className="w-full bg-[#16161a]/80 text-white placeholder-gray-500 rounded-xl px-5 py-4 outline-none border border-gray-700/50 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all shadow-inner"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="w-full pt-4">
          <button
            onClick={handleUpdate}
            disabled={isSaving}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-6 py-4 rounded-xl font-bold md:text-lg shadow-lg hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {isSaving ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </section>
    </main>
  );
};

export default EditProfile;
