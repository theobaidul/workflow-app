import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logIn } from "../redux/features/user/userSlice.js";

export default function useAuthCheck() {
  const [authChecked, setAuthChecked] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // if any user info exist in localstorage related to auth, login the user
    const localAuth = localStorage.getItem("userInfo");
    if (localAuth) {
      const userInfo = JSON.parse(localAuth);
      if (userInfo?.uid) {
        dispatch(logIn(userInfo));
      }
    }
    setAuthChecked(true);
  }, [dispatch]);
  return authChecked;
}
