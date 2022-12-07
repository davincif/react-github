import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import style from "./showUser.module.sass";
import { UserRepoResponse } from "../../model/repositores/UserRepo";

function ShowUsers() {
  const location = useLocation();
  const [avatar, setAvatar] = useState<string>(
    "https://upload.wikimedia.org/wikipedia/en/1/1b/NPC_wojak_meme.png"
  );
  const [userName, setUserName] = useState<string>("");
  const [userRepoAmount, setUserRepoAmount] = useState<number>(0);
  const [repositories, setRepositores] = useState<
    { name: string; description: string | undefined }[]
  >([
    {
      name: "repo1",
      description: "a very good repo",
    },
    {
      name: "repo2",
      description: undefined,
    },
    {
      name: "repo3",
      description: "another repo",
    },
  ]);

  useEffect(() => {
    const userInfo = location.state.user as UserRepoResponse;
    console.log("userInfo", userInfo);
    console.log("userInfo.avatar_url", userInfo.avatar_url);
    setAvatar(userInfo.avatar_url);
    setUserName(userInfo.name);
    setUserRepoAmount(userInfo.public_repos);
    //eslint-disable-nextline
  }, []);

  return (
    <div className={style.wrapper}>
      <div className={style.profile}>
        <img src={avatar} alt="user" />
        <p>{userName}</p>
        <p>Repositories: {userRepoAmount}</p>
      </div>
      <div className={style.list}>
        {repositories.map((e, index) => (
          <div className={style.item} key={"item-" + index.toString()}>
            {e.name}
            <br />
            {e?.description ?? "Not informed"}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowUsers;
