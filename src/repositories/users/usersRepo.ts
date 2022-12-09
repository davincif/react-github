import axios from "axios";

import {
  UserProfileResponse,
  UserReposResponse,
} from "../../model/repositores/UserRepo";

/**
 * A singleton instance to deal with the request related to the Github User in
 * the project
 */
export class UserRepo {
  private static instance: UserRepo;

  private constructor() {}

  public static getInstance(): UserRepo {
    if (!UserRepo.instance) {
      UserRepo.instance = new UserRepo();
    }

    return UserRepo.instance;
  }

  private githubHost = "https://api.github.com";

  /**
   * Saerchs a given user on the github server
   * @param userNick Github user name to be searched
   */
  public async getUserInfo(userNick: string): Promise<UserProfileResponse> {
    const userInfo = await axios.get<UserProfileResponse>(
      `${this.githubHost}/users/${userNick}`
    );

    return userInfo.data;
  }

  /**
   * Gets all the repositories information the given user
   * @param userNick Github user name to be searched
   */
  public async getUserRepos(
    userNick: string,
    params = { type: "public", sorts: "created", per_page: 100, page: 1 }
  ) {
    let { type, sorts, per_page, page } = params;
    let repos: UserReposResponse[] = [];

    do {
      var userInfo = await axios.get<UserReposResponse[]>(
        `${this.githubHost}/users/${userNick}/repos`,
        { params: { type, sorts, per_page, page } }
      );

      if (userInfo.data.length > 0) {
        repos = repos.concat(userInfo.data);
        page++;
      }
    } while (userInfo.data.length >= per_page);

    return repos;
  }
}
