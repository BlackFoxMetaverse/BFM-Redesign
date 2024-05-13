import { auth } from "@/utils/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { checkExistingUser } from "../checkUser";

export async function handleGoogleSignIn() {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    const token = result.user.accessToken;
    const { displayName, email, uid } = result.user;

    sessionStorage.setItem("bfm-seller-token", token);
    sessionStorage.setItem("bfm-seller-uid", uid);

    const data = await checkExistingUser(token);
    if (data.isSeller) {
      return { username: data?.username, uid, isExistingUser: true };
    } else {
      return {
        name: displayName,
        email,
        isExistingUser: false,
      };
    }
  } catch (error) {
    return Promise.reject(error);
  }
}
