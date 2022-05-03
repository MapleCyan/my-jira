import { Table } from "antd";
import { User } from "./index";

interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  orgnazition: string;
}

interface ListProps {
  list: Project[];
  users: User[];
}

export const List = ({ list, users }: ListProps) => {
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: "名称",
          dataIndex: "name",
          key: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "负责人",
          key: "personId",
          dataIndex: "personId",
          render(value, project) {
            let user =
              users.find((user) => user.id === project.personId)?.name ||
              "未知";
            return <span>{user}</span>;
          },
        },
      ]}
      dataSource={list}
    />
  );
};
