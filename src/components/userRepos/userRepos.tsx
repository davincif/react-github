import { useEffect, useState } from "react";

import style from "./userRepos.module.sass";
import { UserRepoFiltered } from "../../model/views/showerUser";
import userReposPresenter from "./userRepos.presenter";

function UserRepos({ repos }: { repos: UserRepoFiltered[] }) {
  /**First page being shown */
  const [page, setPage] = useState<number>(0);
  const [repositories, setRepositores] = useState<UserRepoFiltered[]>([]);
  const pageSize = 10;

  useEffect(() => {
    userReposPresenter.updatePagination(page, pageSize, repos, setRepositores);
  }, [repos]);

  return (
    <div className={style.wrapper}>
      {repositories.length > 0 ? (
        <>
          <div className={style.list}>
            {repositories.map((e, index) => (
              <div className={style.item} key={"item-" + index.toString()}>
                <span aria-label="repository name"  className={style["item--name"]}>{e.name}</span>
                <span aria-label="repository description"> {e?.description || "~ empty ~"}</span>
              </div>
            ))}
          </div>

          <div className={style.controllers}>
            <button
              id="userRepo-btn-initialpage"
              className="g-button"
              aria-label="go to last repository initial page"
              onClick={() =>
                userReposPresenter.initialPage(
                  page,
                  setPage,
                  pageSize,
                  repos,
                  setRepositores
                )
              }
            >
              <span className="material-symbols-outlined">
                keyboard_double_arrow_left
              </span>
            </button>
            <button
              id="userRepo-btn-prevPage"
              className="g-button"
              aria-label="go to last repository previous page"
              onClick={() =>
                userReposPresenter.prevPage(
                  page,
                  setPage,
                  pageSize,
                  repos,
                  setRepositores
                )
              }
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>

            <div
              className={style.pagination}
              id="userRepos-page-indicator"
              aria-label={`page ${
                Math.ceil(page / pageSize) + 1
              } of ${Math.ceil(repos.length / pageSize)}`}
            >
              {Math.ceil(page / pageSize) + 1} /{" "}
              {Math.ceil(repos.length / pageSize)}
            </div>

            <button
              id="userRepo-btn-nextPage"
              className="g-button"
              aria-label="go to last repository next page"
              onClick={() =>
                userReposPresenter.nextPage(
                  page,
                  setPage,
                  pageSize,
                  repos,
                  setRepositores
                )
              }
            >
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
            <button
              id="userRepo-btn-lastPage"
              aria-label="go to last repository page"
              className="g-button"
              onClick={() =>
                userReposPresenter.lastPage(
                  page,
                  setPage,
                  pageSize,
                  repos,
                  setRepositores
                )
              }
            >
              <span className="material-symbols-outlined">
                keyboard_double_arrow_right
              </span>
            </button>
          </div>
        </>
      ) : (
        <div className={style.notFound}>
          <h3>No repository to be shown</h3>
        </div>
      )}
    </div>
  );
}

export default UserRepos;
