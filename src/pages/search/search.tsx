import { useState } from "react";

import style from "./search.module.sass";
import { useNavigate } from "react-router-dom";
import searchPresenter from "./search.presenter";

function Search() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [userNick, setUserNick] = useState("");
  const navigate = useNavigate();

  async function getUserInfo(event: React.FormEvent<HTMLFormElement>) {
    setIsLoading(true);

    try {
      var userInfo = await searchPresenter.searchGithubUser(
        event,
        userNick,
        setErrorMsg
      );
    } catch (error) {
      setIsLoading(false);
      throw error;
    }

    setIsLoading(false);
    navigate("/user", { state: { user: userInfo } });
  }

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <strong>
          <h1 className={style.title}>React-GitHub</h1>
        </strong>

        <form className="g-form" onSubmit={(event) => getUserInfo(event)}>
          <div className="g-form-field">
            <label htmlFor="userNick">User Profile Nick</label>
            <div
              className={
                "g-form-field__input-wrapper" +
                (!errorMsg ? "" : " g-form-field__input-wrapper--rejected")
              }
            >
              <div className="g-form-field__input-icon">@</div>
              <input
                type="text"
                name="userNick"
                id="search_user-nick"
                placeholder="davincif"
                value={userNick}
                onChange={(event) => {
                  setUserNick(event.target.value);
                  setErrorMsg("");
                }}
                autoFocus
                disabled={isLoading}
              />
            </div>
          </div>

          <button className="g-button" type="submit">
            Search User
          </button>

          <span className="g-form-field__error">
            {errorMsg ? <p>{errorMsg}</p> : null}
          </span>
        </form>
      </div>
    </div>
  );
}

export default Search;
