import { INewUser } from "../../types";

import { ID } from "appwrite";
import { account } from "./config";

export async function createUserAccount(user: INewUser) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    if (!newAccount) throw Error;

    // const avatarUrl = avatars.getInitials(user.name);

    // const newUser = await saveUserToDB({
    //   accountId: newAccount.$id,
    //   name: newAccount.name,
    //   email: newAccount.email,
    //   username: user.username,
    //   imageUrl: avatarUrl,
    // });

    // return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}
