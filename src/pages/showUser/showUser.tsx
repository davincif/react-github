import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import style from "./showUser.module.sass";
import { UserProfileResponse } from "../../model/repositores/UserRepo";
import UserRepos from "../../components/userRepos/userRepos";
import showUserPresenter from "./showUser.presenter";
import { UserRepoFiltered } from "../../model/views/showerUser";

function ShowUsers() {
  const location = useLocation();
  const [avatar, setAvatar] = useState<string>(
    "https://upload.wikimedia.org/wikipedia/en/1/1b/NPC_wojak_meme.png"
  );
  const [userName, setUserName] = useState<string>("");
  const [userNick, setUserNick] = useState<string>("");
  const [repos, setRepos] = useState<UserRepoFiltered[]>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state) {
      navigate("/");
      return;
    }

    const userInfo = location.state.user as UserProfileResponse;
    setAvatar(userInfo.avatar_url);
    setUserName(userInfo.name || userInfo.login);
    setUserNick(userInfo.login);
    showUserPresenter.getRepos(userInfo.login, setRepos);
    // eslint-disable-next-line
  }, []);

  return (
    <div className={style.wrapper}>
      <div className={style.profile}>
        <img src={avatar} alt="user" />
        <p>{userName}</p>
        <p>Repositories: {repos?.length ?? 0}</p>
        <button
          id="showUser-button-back"
          className="g-button g-button-info"
          aria-label="get back to the last page"
          onClick={() => navigate(-1)}
        >
          back
        </button>
      </div>
      <UserRepos repos={repos} />
    </div>
  );
}

export default ShowUsers;
