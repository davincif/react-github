import { Dispatch, SetStateAction } from "react";

import { UserRepo } from "../../repositories/users/usersRepo";
import { UserRepoFiltered } from "../../model/views/showerUser";

const userRepo = UserRepo.getInstance();

/**
 * Gets the Github's profile's information about the given user
 * @param userNick Github nick (login) of the user to be searched
 * @param setRepos a function to update the state of all availale repositories to
 * be shown
 */
async function getRepos(
  userNick: string,
  setRepos: Dispatch<SetStateAction<UserRepoFiltered[]>>
): Promise<UserRepoFiltered[]> {

  // check cached answer
  const repos = await userRepo.getUserRepos(userNick);

  const filteredRepos: UserRepoFiltered[] = repos.map((repo) => {
    return {
      name: repo.name,
      description: repo.description ?? "",
    };
  });

  setRepos(filteredRepos);

  return filteredRepos;
}

export default {
  getRepos,
};
