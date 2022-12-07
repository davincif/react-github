import { useState } from "react";

import style from "./search.module.sass";
import { SaerchPresenter } from "./search.presenter";
import { useNavigate } from "react-router-dom";

function Search() {
  const [errorMsg, setErrorMsg] = useState("");
  const [userNick, setUserNick] = useState("");
  const navigate = useNavigate();

  const searchPresenter = new SaerchPresenter({
    errorMsg: [errorMsg, setErrorMsg],
  });

  async function getUserInfo(event: React.FormEvent<HTMLFormElement>) {
    try {
      var userInfo = await searchPresenter.searchGithubUser(event, userNick);
    } catch (error) {
      throw error;
    }

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
