import axios from "axios";

import { UserRepoResponse } from "../../model/repositores/UserRepo";

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
  public async getUserInfo(userNick: string): Promise<UserRepoResponse> {
    const userInfo = await axios.get<UserRepoResponse>(
      `${this.githubHost}/users/${userNick}`
    );

    return userInfo.data;
  }
}
