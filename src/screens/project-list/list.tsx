import { Button, Dropdown, Menu, Table, TableProps } from "antd";
import { User } from "./index";
import dayjs from "dayjs";
// react-router和react-router-dom的关系，类似于react和react-dom/react-native/react-vr的关系
import { Link } from "react-router-dom";
import { Pin } from "components/pin";
import { useEditProject } from "utils/projects";
import { ButtonNoPadding } from "components/lib";

//TODO: 把id改成number类型
export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}

interface ListProps extends TableProps<Project> {
  users: User[];
  refresh?: () => void;
  setProjectModalOpen: (isOpen: boolean) => void;
}

export const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject();
  const pinProject = (id: number, pin: boolean) => {
    mutate({ id, pin }).then(props?.refresh);
  };

  return (
    <Table
      {...props}
      rowKey={"id"}
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={(pin) => pinProject(project.id, pin)}
              />
            );
          },
        },
        {
          title: "名称",
          key: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return (
              <Link to={String(project.id) + "/kanban"}>{project.name}</Link>
            );
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
        {
          render(value, project) {
            const items = [{ label: "编辑", key: "edit", children: null }];
            const onClick = (e: any) => {
              switch (e?.key) {
                case "edit":
                  props.setProjectModalOpen(true);
                  break;
              }
            };

            return (
              <Dropdown overlay={<Menu onClick={onClick} items={items}></Menu>}>
                <ButtonNoPadding type="link">...</ButtonNoPadding>
              </Dropdown>
            );
          },
        },
      ]}
    />
  );
};
