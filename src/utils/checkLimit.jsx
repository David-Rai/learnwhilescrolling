import React from "react";
import { checkUser } from "./checkUser";
import { useScrollLimit } from "../context/store";

//checking scroll limit on the localstorage
const checkLimit = async () => {
  const res = await checkUser();
  const { updateScrollLimit } = useScrollLimit.getState();

  //checking if user is loggedin
  if (res.exist) return updateScrollLimit({ shouldLimit: false, scrollCount: 0 });

  const data = localStorage.getItem("scrollLimit");
  const scrollLimitData = JSON.parse(data);

  if (scrollLimitData) {
    if (scrollLimitData.scrollCount >= 4)
      return updateScrollLimit({ shouldLimit: true, scrollCount: 4 });
    return updateScrollLimit(scrollLimitData);
  }
  return updateScrollLimit({ shouldLimit: false, scrollCount: 0 });
};

export default checkLimit;
