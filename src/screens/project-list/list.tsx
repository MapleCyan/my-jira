import { Table, TableProps } from "antd";
import { User } from "./index";
import dayjs from "dayjs";
// react-router和react-router-dom的关系，类似于react和react-dom/react-native/react-vr的关系
import { Link } from "react-router-dom";

//TODO: 把id改成number类型
export interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
  created: number;
}

interface ListProps extends TableProps<Project> {
  users: User[];
}

export const List = ({ users, ...props }: ListProps) => {
  return (
    <Table
      {...props}
      rowKey={"id"}
      pagination={false}
      columns={[
        {
          title: "名称",
          key: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <Link to={String(project.id)}>{project.name}</Link>;
          },
        },
        {
          title: "部门",
          dataIndex: "organization",
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
        {
          title: "创建时间",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },
      ]}
    />
  );
};
