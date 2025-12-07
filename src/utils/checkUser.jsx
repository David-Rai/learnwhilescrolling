import supabase from "../config/supabase";
import useHomeStore from "../context/store";

// Accept setUser as a parameter
export async function checkUser() {
  const { user, setUser } = useHomeStore.getState();

  if (user) {
    return { user, exist: true };
  }
  
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.log("Error fetching user:", error);
    return false;
  }

  if (data.user) {
    setUser(data.user); // update user in context
    // console.log("User exists");
    return { user: data.user, exist: true };
  } else {
    // console.log("User does not exist");
    return { exist: false };
  }
}
