import { useState } from "react";
import { Button, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getDownloadURL, ref as sref, uploadBytes } from "firebase/storage";
import { ref as dref, set } from "firebase/database";
import { db, storage } from "../../utils/firebase.js";
import StoryUpload from "./StoryUpload";
import getRandomId from "../../utils/getRandomId.js";
import { toggleModal } from "../../redux/features/FormModal/formModalSlice.js";
import { toast } from "react-hot-toast";

const StoryForm = () => {
  const [isLoading, setIsloading] = useState(false);
  const [storyFile, setStoryFile] = useState(null);
  const { loggedIn, userInfo } = useSelector((state) => state.user);
  const { uid, displayName, photoURL } = userInfo || {};
  const dispatch = useDispatch();

  const onFinish = async () => {
    if (loggedIn) {
      try {
        if (storyFile) {
          setIsloading(true);
          const id = getRandomId();
          const imageName = `${uid}_${id}`;
          const imageRef = sref(storage, `images/${imageName}`);
          const snapshot = await uploadBytes(imageRef, storyFile);
          const imageUrl = await getDownloadURL(snapshot?.ref);
          const data = { id, uid, displayName, photoURL, imageUrl, imageName };
          const storyRef = dref(db, `stories/${id}`);
          await set(storyRef, data);
          setIsloading(false);
          dispatch(toggleModal());
        } else {
          toast.error("Please select an image!");
        }
      } catch (error) {
        setIsloading(false);
        toast.error(error?.message || "Something went wrong!");
      }
    }
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <StoryUpload setStoryFile={setStoryFile} />
      <Button type="primary" htmlType="submit" loading={isLoading}>
        Submit
      </Button>
    </Form>
  );
};
export default StoryForm;
