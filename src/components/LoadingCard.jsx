import { Card, Spin } from "antd";

export default function LoadingCard() {
  return (
    <Card style={{ textAlign: "center" }}>
      <Spin />
    </Card>
  );
}
