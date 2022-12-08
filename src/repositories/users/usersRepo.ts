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
   * @param ignoreCache ignore any possibly cached request
   */
  public async getUserInfo(
    userNick: string,
    ignoreCache = false
  ): Promise<UserProfileResponse> {
    const userInfo = await axios.get<UserProfileResponse>(
      `${this.githubHost}/users/${userNick}`
    );

    return userInfo.data;
  }

  /**
   * Gets all the repositories information the given user
   * @param userNick Github user name to be searched
   * @param ignoreCache ignore any possibly cached request
   */
  public async getUserRepos(userNick: string, ignoreCache = false) {
    const userInfo = await axios.get<UserReposResponse[]>(
      `${this.githubHost}/users/${userNick}/repos`
    );

    return userInfo.data;
  }
}
