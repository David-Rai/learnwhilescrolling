import React, { useRef } from "react";
import supabase from "../config/supabase";
import { ArrowLeft, Pencil, Camera } from "lucide-react";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import useHomeStore from "../context/store";

const EditProfile = () => {
  const { user } = useHomeStore();
  const [userProfile, setUserProfile] = useState(null);
  const [userAvatar, setUserAvatar] = useState(userProfile?.avatar);
  const nameRef = useRef(null);
  const navigate = useNavigate();
  //Fetching User data
  const fetchUserData = async () => {
    try {
      const user_id = user.id;
      const { data, error } = await supabase
        .from("board")
        .select()
        .eq("user_id", user_id);

      if (error) {
        console.log(error);
      }

      if (data) {
        // console.log("Profile data", data);
        setUserProfile(data[0]);
        setUserAvatar(data[0].avatar);
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

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

  //random images
  function getRandomAvatar() {
    const num = Math.floor(Math.random() * 8) + 1; // generates 1 to 5
    return avatars[num];
  }

  const handleChange = () => {
    const randomAvatar = getRandomAvatar();
    setUserAvatar(randomAvatar);
  };

  const handleUpdate = async () => {
    const user_id = user.id;
    const name = nameRef.current.value;

    if (!name) {
      return;
    }

    if (!user_id) return;
    const res = await supabase
      .from("board")
      .update({ username: name, avatar: userAvatar })
      .eq("user_id", user_id);
    navigate("/goto_profile");
  };
  return (
    <main className="min-h-dvh bg-bg flex flex-col items-center px-4 py-6">
      {/* Header */}
      <header
        onClick={() => navigate(-1)}
        className="w-full max-w-xl flex items-center gap-2 text-text cursor-pointer mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Back</span>
      </header>

      <h1 className="text-2xl font-semibold text-text mb-6">Edit Profile</h1>

      {/* Main content */}
      <section className="w-full max-w-xl flex flex-col items-center gap-5">
        {/* Avatar */}
        <div className="relative group w-32 h-32 md:w-40 md:h-40">
          <img
            src={userAvatar}
            alt="Profile"
            className="rounded-full w-full h-full object-cover border-4 border-primary shadow-2xl"
          />

          {/* Change Icon */}
          {/* Change Icon */}
          <button
            onClick={handleChange}
            className="
    absolute bottom-2 left-2
    flex items-center gap-2
    bg-primary text-white
    px-4 py-2
    rounded-full shadow-lg
    backdrop-blur-sm
    hover:scale-105 hover:shadow-xl
    transition-all duration-200
  "
          >
            <Pencil className="w-5 h-5" />
            <span>Edit</span>
          </button>
        </div>

        {/* Name Field */}
        <label htmlFor="name" className="text-text font-medium">
          New Name
        </label>
        <input
          type="text"
          id="name"
          ref={nameRef}
          defaultValue={userProfile?.username}
          className="input w-full max-w-sm"
        />

        {/* Save Button */}
        <button
          onClick={handleUpdate}
          className="button bg-primary text-white px-6  w-auto
      py-2 rounded-xl font-medium shadow-lg hover:scale-[1.02] transition"
        >
          Save Changes
        </button>
      </section>
    </main>
  );
};

export default EditProfile;
