import React from "react";
import supabase from "../config/supabase";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import useHomeStore from "../context/store";

const EditProfile = () => {
  const { user } = useHomeStore();
  const [userProfile, setUserProfile] = useState(null);
  // console.log("user", user);
  const [userAvatar,setUserAvatar]=useState(userProfile?.avatar)

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
        setUserAvatar(data[0].avatar)
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
    const num = Math.floor(Math.random() * 9) + 1; // generates 1 to 5
    return avatars[num];
  }

  const handleShow = () => {
    const randomAvatar = getRandomAvatar();
    console.log(randomAvatar)
    setUserAvatar(randomAvatar)
  };

  return (
    <main className="h-full bg-bg flex flex-col items-center justify-center">
      <header onClick={()=> navigate('/profile')}>
        Back
      </header>
      <h1>Edit profile</h1>

      {/* Main content */}
      <section className="flex flex-col items-center gap-4">
        {/* Avatar */}
        <div className="relative group">
          <div className="absolute bg-primary rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
          <div
            onClick={handleShow}
            className="absolute bottom-0 left-0 z-20 cursor-pointor"
          >
            <h1>Change</h1>
          </div>
          <img
            src={userAvatar}
            alt="Profile"
            className="relative rounded-full w-32 h-32
           md:w-40 md:h-40 object-cover border-4 border-[var(--color-primary)] shadow-xl"
          />
        </div>

        {/* Name Field */}
        <label htmlFor="name" className="text-text">
          New name
        </label>
        <input
          type="text"
          id="name"
          className="input"
          defaultValue={userProfile?.username}
        />
        <button className="button w-auto bg-primary">Save Changes</button>
      </section>
    </main>
  );
};

export default EditProfile;
