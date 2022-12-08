import { UserRepoFiltered } from "../../model/views/showerUser";

/**
 * Updates the repositories according to the parameters in
 * 'page' and 'pageSize'
 * @param page current number of the initial page being showed
 * @param pageSize how many pages are being shown at the same time in the screen
 * @param repos the pull of avaliable repositoreis
 * @param setRepositories the function to set the repositories being presented
 */
function updatePagination(
  page: number,
  pageSize: number,
  repos: UserRepoFiltered[],
  setRepositories: React.Dispatch<React.SetStateAction<UserRepoFiltered[]>>
) {
  setRepositories(repos.slice(page, page + pageSize));
}

/**
 * give a step foward in the pagination, according to the parameters in
 * 'page' and 'pageSize'
 * @param page current number of the initial page being showed
 * @param setPage the function to set the state of the which is the current page
 * starting the current paggination being shown
 * @param pageSize how many pages are being shown at the same time in the screen
 * @param repos the pull of avaliable repositoreis
 * @param setRepositories the function to set the repositories being presented
 * @returns the success state of the operaiton
 */
function nextPage(
  page: number,
  setPage: React.Dispatch<React.SetStateAction<number>>,
  pageSize: number,
  repos: UserRepoFiltered[],
  setRepositories: React.Dispatch<React.SetStateAction<UserRepoFiltered[]>>
) {
  let nextpage = page + pageSize;

  if (nextpage === page || nextpage > repos.length - 1) {
    return false;
  }

  setPage(nextpage);
  updatePagination(nextpage, pageSize, repos, setRepositories);

  return true;
}

/**
 * give a step back in the pagination, according to the parameters in
 * 'page' and 'pageSize'
 * @param page current number of the initial page being showed
 * @param setPage the function to set the state of the which is the current page
 * starting the current paggination being shown
 * @param pageSize how many pages are being shown at the same time in the screen
 * @param repos the pull of avaliable repositoreis
 * @param setRepositories the function to set the repositories being presented
 * @returns the success state of the operaiton
 */
function prevPage(
  page: number,
  setPage: React.Dispatch<React.SetStateAction<number>>,
  pageSize: number,
  repos: UserRepoFiltered[],
  setRepositories: React.Dispatch<React.SetStateAction<UserRepoFiltered[]>>
) {
  let prevpage = Math.max(page - pageSize, 0);

  if (prevpage === page) {
    return false;
  }

  setPage(prevpage);
  updatePagination(prevpage, pageSize, repos, setRepositories);

  return true;
}

/**
 * Go to the first page of the pagination
 * @param page current number of the initial page being showed
 * @param setPage the function to set the state of the which is the current page
 * starting the current paggination being shown
 * @param pageSize how many pages are being shown at the same time in the screen
 * @param repos the pull of avaliable repositoreis
 * @param setRepositories the function to set the repositories being presented
 * @returns the success state of the operaiton
 */
function initialPage(
  page: number,
  setPage: React.Dispatch<React.SetStateAction<number>>,
  pageSize: number,
  repos: UserRepoFiltered[],
  setRepositories: React.Dispatch<React.SetStateAction<UserRepoFiltered[]>>
) {
  const initialPage = 0;

  if (page === initialPage) {
    return initialPage;
  }

  setPage(initialPage);
  updatePagination(initialPage, pageSize, repos, setRepositories);

  return true;
}

/**
 * Go to the last available page of the pagination
 * @param page current number of the initial page being showed
 * @param setPage the function to set the state of the which is the current page
 * starting the current paggination being shown
 * @param pageSize how many pages are being shown at the same time in the screen
 * @param repos the pull of avaliable repositoreis
 * @param setRepositories the function to set the repositories being presented
 * @returns the success state of the operaiton
 */
function lastPage(
  page: number,
  setPage: React.Dispatch<React.SetStateAction<number>>,
  pageSize: number,
  repos: UserRepoFiltered[],
  setRepositories: React.Dispatch<React.SetStateAction<UserRepoFiltered[]>>
) {
  let rest = repos.length % pageSize;
  const lastpage = rest ? repos.length - rest : repos.length - pageSize;

  if (lastpage === page) {
    return false;
  }

  setPage(lastpage);
  updatePagination(lastpage, pageSize, repos, setRepositories);
  return true;
}

export default {
  updatePagination,
  nextPage,
  prevPage,
  initialPage,
  lastPage,
};
