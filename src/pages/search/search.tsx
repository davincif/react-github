import "./search.sass";
import { SaerchPresenter } from "./search.presenter";
import { useState } from "react";

function Search() {
  const [errorMsg, setErrorMsg] = useState("");
  const [userNick, setUserNick] = useState("");

  const searchPresenter = new SaerchPresenter({
    errorMsg: [errorMsg, setErrorMsg],
  });

  return (
    <div className="wrapper">
      <div className="container">
        <strong>
          <h1 className="title">React-GitHub</h1>
        </strong>

        <form
          className="g-form"
          onSubmit={(event) =>
            searchPresenter.searchGithubUser(event, userNick)
          }
        >
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
                onChange={(event) => setUserNick(event.target.value)}
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
