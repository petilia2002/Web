import { useEffect } from "react";
import "@ant-design/v5-patch-for-react-19";
import "antd/dist/reset.css";
import "./App.css";
import { DatePicker, message, Row, Col, Typography } from "antd";
import MyTable from "./components/MyTable";

export default function App() {
  useEffect(() => {
    // message.open({ content: "Привет!" });
  }, []);

  return (
    <>
      <DatePicker />
      <Typography.Title level={4} align="center" className="title">
        Ant Design Demo
      </Typography.Title>
      <Row>
        <Col span={16} offset={4}>
          <MyTable />
        </Col>
      </Row>
    </>
  );
}
