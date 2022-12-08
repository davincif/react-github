import { Dispatch, SetStateAction } from "react";
import { AxiosError } from "axios";

import { UserRepo } from "../../repositories/users/usersRepo";
import {
  UserProfileResponse,
  UserProfileResponseError,
} from "../../model/repositores/UserRepo";

const userRepo = UserRepo.getInstance();

/**
 * Saerch on Github the requested user profile
 * @param event button or form input event so the function can stop the
 * propagation of undesired actions
 * @param userNick The requrest user nick on Github
 * @param setErrorMsg The requrest user nick on Github
 * @returns All the users info from Github
 */
async function searchGithubUser(
  event: React.FormEvent<HTMLFormElement>,
  userNick: string,
  setErrorMsg: Dispatch<SetStateAction<string>>
) {
  event.stopPropagation();
  event.preventDefault();

  // params consistency check
  if (!userNick) {
    setErrorMsg("missing user nick");
    throw Error("");
  }

  // actual user request request error treatment
  let userInfo: UserProfileResponse | undefined;
  try {
    userInfo = await userRepo.getUserInfo(userNick);
  } catch (error) {
    const err: AxiosError<UserProfileResponseError> = error as any;

    setErrorMsg(err.response?.data.message || 'Unidentified error :"(');

    throw error;
  }

  return userInfo;
}

export default {
  searchGithubUser,
};
