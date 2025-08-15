import { useMemo } from "react";
import { Table, Image, Typography } from "antd";
import pokemons from "../data/pokemons.json";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (name) => <Typography.Text copyable>{name}</Typography.Text>,
  },
  { title: "Number", dataIndex: "number", key: "number" },
  {
    title: "Class",
    dataIndex: "classification",
    key: "classification",
    filters: [
      { text: "Fire", value: "fire" },
      { text: "Water", value: "water" },
      { text: "Bug", value: "bug" },
      { text: "Normal", value: "normal" },
    ],
    onFilter: (value, item) => item.classification.includes(value),
  },
  {
    title: "Rate",
    dataIndex: "fleeRate",
    key: "fleeRate",
    sorter: (a, b) => a.fleeRate - b.fleeRate,
  },
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    render: (image) => <Image src={image} />,
  },
];

export default function MyTable({ rows }) {
  const dataSource = useMemo(() => {
    return pokemons.map((item) => ({
      ...item,
      key: item.id,
      name: item.name.charAt(0).toUpperCase() + item.name.slice(1),
    }));
  }, []);

  console.log(dataSource);

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      pagination={{
        position: ["bottomRight"],
        pageSize: rows,
        // defaultPageSize: 5,
        // showSizeChanger: true,
        // pageSizeOptions: ["5", "10", "15"],
      }}
    />
  );
}
