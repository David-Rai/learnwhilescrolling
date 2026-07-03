import supabase from "../config/supabase";
import avatars from "../constant/avatars";

const randomAvatar = getRandomAvatar();

//random images
function getRandomAvatar() {
  const num = Math.floor(Math.random() * 5) + 1; // generates 1 to 5
  return avatars[num - 1];
}

const setUserBoard = async (id, username) => {
  await supabase.from("board")
    .insert({ user_id: id, avatar: randomAvatar, username })
  console.log('user board added')
}

export default setUserBoard