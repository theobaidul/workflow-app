import { Button, Form, Input } from "antd";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ref, set } from "firebase/database";
import TodoItem from "./TodoItem";
import getRandomId from "../../utils/getRandomId.js";
import { db } from "../../utils/firebase.js";
import { toggleModal } from "../../redux/features/FormModal/formModalSlice.js";
import { toast } from "react-hot-toast";

const defaultTodo = [
  {
    checked: false,
    value: "",
    id: getRandomId(),
  },
];

const NoteForm = ({ formInfo }) => {
  const dispatch = useDispatch();
  const { loggedIn, userInfo } = useSelector((state) => state?.user || {});
  const { displayName, uid, photoURL } = userInfo || {};
  const [title, setTitle] = useState(formInfo?.title || "");
  const [todos, setTodos] = useState(formInfo?.todos || defaultTodo);
  const [isLoading, setIsloading] = useState(false);
  const todosLength = todos?.length;

  const onFinish = async () => {
    if (loggedIn) {
      try {
        const id = formInfo?.id || getRandomId();
        const filterTodos = todos?.filter((todo) => Boolean(todo?.value));
        if (title?.length && filterTodos?.length) {
          setIsloading(true);
          const data = {
            id,
            uid,
            displayName,
            photoURL,
            title,
            todos: filterTodos,
          };
          const todosRef = ref(db, `notes/${id}`);
          await set(todosRef, data);
          setIsloading(false);
          dispatch(toggleModal());
        } else {
          if (!title?.length) {
            toast.error("Please provide a title!");
          }

          if (!filterTodos?.length) {
            toast.error("Please provide atleast one todo!");
          }
        }
      } catch (error) {
        setIsloading(false);
        toast.error(error?.message || "Something went wrong!");
      }
    }
  };

  return (
    <Form
      name="Todo"
      labelCol={{
        span: 8,
      }}
      layout="vertical"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        style={{
          marginBottom: "15px",
        }}
      >
        <Input
          placeholder="Please enter a title"
          value={title}
          onChange={(e) => setTitle(e?.target?.value)}
        />
      </Form.Item>
      {todos?.map((todo, index) => {
        const isDeletable = todosLength > 1 && index !== todosLength - 1;
        return (
          <TodoItem
            setTodos={setTodos}
            currentTodo={todo}
            isDeletable={isDeletable}
            key={todo?.id}
          />
        );
      })}
      <Button type="primary" htmlType="submit" loading={isLoading}>
        Submit
      </Button>
    </Form>
  );
};

export default NoteForm;
