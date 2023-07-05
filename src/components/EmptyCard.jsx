import { Card, Empty } from "antd";

export default function EmptyCard() {
  return (
    <Card>
      <Empty description="Nothing found! Please add your own." />
    </Card>
  );
}
