import React, { useState } from "react";
import { Table, TableColumnProps } from "@arco-design/web-react";

const columns: TableColumnProps[] = [
  {
    title: "Name",
    dataIndex: "name",
    width: 140,
    fixed: "left",
  },
  {
    title: "Salary",
    dataIndex: "salary",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
];
const data = [
  {
    key: "1",
    name: "Jane Doe",
    salary: 23000,
    address: "32 Park Road, London",
    email: "jane.doe@example.com",
  },
  {
    key: "2",
    name: "Alisa Ross",
    salary: 25000,
    address: "35 Park Road, London",
    email: "alisa.ross@example.com",
  },
  {
    key: "3",
    name: "Kevin Sandra",
    salary: 22000,
    address: "31 Park Road, London",
    email: "kevin.sandra@example.com",
  },
  {
    key: "4",
    name: "Ed Hellen",
    salary: 17000,
    address: "42 Park Road, London",
    email: "ed.hellen@example.com",
  },
  {
    key: "5",
    name: "William Smith",
    salary: 27000,
    address: "62 Park Road, London",
    email: "william.smith@example.com",
  },
];

const App = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>(["4"]);

  return (
    <div style={{ padding: "50px" }}>
      <Table
        columns={columns}
        data={data}
        rowSelection={{
          type: "checkbox",
          selectedRowKeys,
          onChange: (selectedRowKeys, selectedRows) => {
            console.log("onChange:", selectedRowKeys, selectedRows);
            setSelectedRowKeys(selectedRowKeys as string[]);
          },
          onSelect: (selected, record, selectedRows) => {
            console.log("onSelect:", selected, record, selectedRows);
          },
          checkboxProps: (record) => {
            return {
              disabled: record.key === "4",
            };
          },
        }}
        scroll={{
          x: 1600,
          y: 400,
        }}
      />
    </div>
  );
};

export default App;
