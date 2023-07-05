import { Button, Checkbox, Form, Input, Space } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import getRandomId from "../../utils/getRandomId.js";

export default function TodoItem({ setTodos, currentTodo, isDeletable }) {
  const { id, value, checked } = currentTodo || {};

  const handleInputChange = (e) => {
    setTodos((prevState) => {
      return prevState.map((todo) =>
        todo.id === id ? { ...todo, value: e.target.value } : todo
      );
    });
  };

  const handleCheckboxChange = (e) => {
    setTodos((prevState) => {
      return prevState.map((todo) =>
        todo.id === id ? { ...todo, checked: e.target.checked } : todo
      );
    });
  };

  const handleAddField = () => {
    setTodos((prevState) => [
      ...prevState,
      { checked: false, value: "", id: getRandomId() },
    ]);
  };

  const handleDeleteField = () => {
    setTodos((prevState) => prevState?.filter((todo) => todo?.id !== id));
  };

  return (
    <Form.Item
      style={{
        marginBottom: "15px",
      }}
    >
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <Space.Compact
          style={{
            width: "100%",
          }}
        >
          <Input
            addonBefore={
              <Checkbox onChange={handleCheckboxChange} checked={checked} />
            }
            onChange={handleInputChange}
            placeholder="Please enter a todo"
            value={value}
          />
          {isDeletable ? (
            <Button type="primary" onClick={handleDeleteField} danger>
              <DeleteOutlined />
            </Button>
          ) : (
            <Button type="primary" onClick={handleAddField}>
              <PlusOutlined />
            </Button>
          )}
        </Space.Compact>
      </Space>
    </Form.Item>
  );
}
