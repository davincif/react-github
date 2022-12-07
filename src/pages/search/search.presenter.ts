import { Dispatch, SetStateAction } from "react";
import { AxiosError } from "axios";

import { UserRepo } from "../../repositories/users/usersRepo";
import {
  UserRepoResponse,
  UserRepoResponseError,
} from "../../model/repositores/UserRepo";

interface SaerchPresenterData {
  /** Error msg to be presented on the generically on the form */
  errorMsg: [string, Dispatch<SetStateAction<string>>];
}

export class SaerchPresenter {
  private userRepo: UserRepo;
  private params: SaerchPresenterData;

  constructor(params: SaerchPresenterData) {
    this.userRepo = UserRepo.getInstance();
    this.params = params;
  }

  /**
   * Saerch on Github the requested user profile
   * @param event button or form input event so the function can stop the
   * propagation of undesired actions
   * @param userNick The requrest user nick on Github
   * @returns All the users info from Github
   */
  public async searchGithubUser(
    event: React.FormEvent<HTMLFormElement>,
    userNick: string
  ) {
    event.stopPropagation();
    event.preventDefault();

    // params consistency check
    if (!userNick) {
      this.params.errorMsg[1]("missing user nick");
      throw null;
    }

    // actual user request request error treatment
    let userInfo: UserRepoResponse | undefined;
    try {
      userInfo = await this.userRepo.getUserInfo(userNick);
    } catch (error) {
      const err: AxiosError<UserRepoResponseError> = error as any;

      this.params.errorMsg[1](
        err.response?.data.message || 'Unidentified error :"('
      );

      throw error;
    }

    return userInfo;
  }
}
