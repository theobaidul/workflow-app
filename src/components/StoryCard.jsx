import { Avatar, Button, Card, Image, Popconfirm } from "antd";
import {
  DeleteOutlined,
  UserOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { ref as dref, set } from "firebase/database";
import { db, storage } from "../utils/firebase.js";
import { useSelector } from "react-redux";
import { deleteObject, ref as sref } from "@firebase/storage";
import { toast } from "react-hot-toast";

export default function StoryCard({ story }) {
  const {
    id,
    uid: storyUID,
    imageUrl,
    imageName,
    photoURL,
    displayName,
  } = story || {};
  const { loggedIn, userInfo } = useSelector((state) => state.user || {});
  const { uid } = userInfo || {};

  const handleDelete = async () => {
    try {
      const delteRef = sref(storage, `images/${imageName}`);
      await deleteObject(delteRef);
      const imageRef = dref(db, `stories/${id}`);
      await set(imageRef, null);
    } catch (error) {
      toast.error(error?.message || "Something went wrong!");
    }
  };

  const deleteButton = (disable) => {
    return (
      <Popconfirm
        title="Delete the story!"
        description="Are you sure to delete this story?"
        cancelText="No"
        okText="Yes"
        onConfirm={() => handleDelete(story)}
        disabled={disable}
        icon={
          <QuestionCircleOutlined
            style={{
              color: "red",
            }}
          />
        }
      >
        <Button
          type="primary"
          icon={<DeleteOutlined />}
          size="small"
          danger
          ghost
          disabled={disable}
        />
      </Popconfirm>
    );
  };

  const controlDisabled = !(loggedIn && uid && storyUID === uid);

  return (
    <Card
      style={{ width: "100%" }}
      bodyStyle={{
        width: "100%",
        height: "200px",
        padding: "0",
        overflow: "hidden",
        borderRadius: "8px",
      }}
    >
      <Image
        src={imageUrl}
        width="100%"
        height="100%"
        style={{
          height: "100%",
          width: "100%",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "auto",
          left: "0",
          bottom: "0",
          padding: "10px",
          background: "rgba(0,0,0,0.4)",
          borderRadius: "0 0 8px 8px",
        }}
      >
        <p
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "12px",
            color: "#fff",
            margin: "0",
          }}
        >
          <Avatar size="small" icon={<UserOutlined />} src={photoURL} />{" "}
          {displayName}
        </p>
      </div>
      <div
        style={{
          position: "absolute",
          width: "auto",
          height: "auto",
          top: "10px",
          right: "10px",
        }}
      >
        {controlDisabled ? deleteButton(true) : deleteButton(false)}
      </div>
    </Card>
  );
}
