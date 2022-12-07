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
          onSubmit={(event) =>
            searchPresenter.searchGithubUser(event, userNick)
          }
        >
          <div className="g-form-field">
            <label htmlFor="userNick">User Profile Nick</label>
            <div className="g-form-field__input-wrapper">
              <div className="g-form-field__input-icon">@</div>
              <input
                type="text"
                name="userNick"
                id="search_user-nick"
                placeholder="davincif"
                value={userNick}
                onChange={(event) => setUserNick(event.target.value)}
                className={!errorMsg ? "" : "g-form-field__input--rejected"}
              />
            </div>
          </div>
          {errorMsg ? <span>{errorMsg}</span> : null}

          <button className="g-button" type="submit">
            search
          </button>
        </form>
      </div>
    </div>
  );
}

export default Search;
