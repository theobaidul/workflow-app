import { Avatar, Button } from "antd";
import {
  PlusCircleOutlined,
  GoogleOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../utils/firebase.js";
import { logIn, logOut } from "../redux/features/user/userSlice.js";
import { toggleModal } from "../redux/features/FormModal/formModalSlice.js";
import { toast } from "react-hot-toast";

const SidebarContent = () => {
  const dispatch = useDispatch();
  const { loggedIn, userInfo: currentUserInfo } = useSelector(
    (state) => state?.user || {}
  );
  const { photoURL } = currentUserInfo || {};

  const signInUser = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const { displayName, email, photoURL, uid } = result?.user || {};
      const userInfo = { displayName, email, photoURL, uid };
      dispatch(logIn(userInfo));
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    } catch (error) {
      toast.error(error?.message || "Something went wrong!");
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      dispatch(logOut());
      localStorage.removeItem("userInfo");
    } catch (error) {
      toast.error(error?.message || "Something went wrong!");
    }
  };
  const createStory = () => {
    dispatch(
      toggleModal({
        formName: "StoryForm",
        formTitle: "Create Story",
      })
    );
  };

  const createNote = () => {
    dispatch(
      toggleModal({
        formName: "NoteForm",
        formTitle: "Create Note",
      })
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <Avatar
        src={photoURL}
        icon={<UserOutlined />}
        size={100}
        style={{
          backgroundColor: "#fde3cf",
          color: "#f56a00",
          marginBottom: "20px",
        }}
      />
      {loggedIn ? (
        <>
          <Button
            onClick={createStory}
            ghost
            block
            style={{
              marginBottom: "10px",
            }}
          >
            <PlusCircleOutlined />
            Create Story
          </Button>
          <Button
            onClick={createNote}
            ghost
            block
            style={{
              marginBottom: "10px",
            }}
          >
            <PlusCircleOutlined />
            Create Note
          </Button>
          <Button type="primary" onClick={signOutUser} block>
            <LogoutOutlined />
            Sign Out
          </Button>
        </>
      ) : (
        <Button type="primary" onClick={signInUser} block>
          <GoogleOutlined />
          SignIn With Google
        </Button>
      )}
    </div>
  );
};
export default SidebarContent;
