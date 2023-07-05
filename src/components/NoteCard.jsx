import {
  Avatar,
  Button,
  Card,
  Checkbox,
  Divider,
  Popconfirm,
  Space,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { toggleModal } from "../redux/features/FormModal/formModalSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { ref, set } from "firebase/database";
import { db } from "../utils/firebase.js";
import { toast } from "react-hot-toast";

export default function NoteCard({ note }) {
  const { id, title, todos, uid: noteUID, displayName, photoURL } = note || {};
  const { loggedIn, userInfo } = useSelector((state) => state.user || {});
  const { uid } = userInfo || {};
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(
      toggleModal({
        formName: "NoteForm",
        formTitle: "Edit Note",
        editable: true,
        formInfo: note,
      })
    );
  };

  const handleDelete = async () => {
    try {
      const todosRef = ref(db, `notes/${id}`);
      await set(todosRef, null);
    } catch (error) {
      toast.error(error?.message || "Something went wrong!");
    }
  };

  const editButton = (disable) => {
    return (
      <Button
        type="primary"
        icon={<EditOutlined />}
        size="small"
        onClick={handleEdit}
        disabled={disable}
        ghost
      />
    );
  };

  const deleteButton = (disable) => {
    return (
      <Popconfirm
        title="Delete the note!"
        description="Are you sure to delete this note?"
        cancelText="No"
        okText="Yes"
        onConfirm={handleDelete}
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

  const controlDisabled = !(loggedIn && uid && noteUID === uid);

  return (
    <Card
      title={title}
      onClick={() => {}}
      extra={
        <Space>
          {controlDisabled ? editButton(true) : editButton(false)}
          {controlDisabled ? deleteButton(true) : deleteButton(false)}
        </Space>
      }
      style={{
        height: "100%",
      }}
      bodyStyle={{
        height: "calc(100% - 54px)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <div>
          {todos.map((todo) => (
            <p key={todo?.id}>
              <Checkbox checked={todo?.checked}>{todo?.value}</Checkbox>
            </p>
          ))}
        </div>
        <div>
          <Divider style={{ margin: "2em 0 1em 0" }} />
          <p style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Avatar size="small" icon={<UserOutlined />} src={photoURL} />{" "}
            {displayName}
          </p>
        </div>
      </div>
    </Card>
  );
}
