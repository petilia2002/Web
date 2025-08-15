import { useState, useEffect } from "react";
import "@ant-design/v5-patch-for-react-19";
import "antd/dist/reset.css";
import "./App.css";
import { Row, Col, Typography, Divider, Button, Slider } from "antd";
import { PageHeader } from "@ant-design/pro-components";
import MyTable from "./components/MyTable";

export default function App() {
  const [rows, setRows] = useState(5);

  useEffect(() => {
    // message.open({ content: "Привет!" });
  }, []);

  return (
    <>
      <PageHeader
        title="Ant Design Demo"
        subTitle={"Antd Tutorial"}
        extra={[
          <Button key="1">About</Button>,
          <Button key="2">Contacts</Button>,
        ]}
      />
      <Divider className={"divider"} />
      <Typography.Title level={4} align="center" className="title">
        Pokemons Table
      </Typography.Title>
      <Row>
        <Col offset={4} span={16}>
          <Row style={{ marginBottom: 20 }}>
            <Col flex="none">
              <Typography.Title level={4} style={{ margin: 0 }}>
                Кол-во покемонов на странице:
              </Typography.Title>
            </Col>
            <Col flex="auto">
              <Slider
                style={{
                  marginLeft: 20,
                  width: "calc(100% - 20px)",
                }}
                min={1}
                max={20}
                value={rows}
                onChange={setRows}
              />
            </Col>
          </Row>
        </Col>
      </Row>

      <Row>
        <Col span={16} offset={4}>
          <MyTable rows={rows} />
        </Col>
      </Row>
    </>
  );
}
