import { Input, Select, Space } from "antd";
import { User } from "./index";

interface SearchPanelProps {
  users: User[];
  param: {
    name: string;
    personId: string;
  };
  setParam: (param: SearchPanelProps["param"]) => void;
}

export const SearchPanel = ({ param, setParam, users }: SearchPanelProps) => {
  return (
    <div>
      <form action="">
        <Space>
          <Input
            type="text"
            value={param.name}
            onChange={(evt) =>
              setParam({
                ...param,
                name: evt.target.value,
              })
            }
          ></Input>
          <Select
            value={param.personId}
            onChange={(value) => setParam({ ...param, personId: value })}
          >
            <Select.Option value={""}>负责人</Select.Option>
            {users.map((user) => (
              <Select.Option value={user.id} key={user.id}>
                {user.name}
              </Select.Option>
            ))}
          </Select>
        </Space>
      </form>
    </div>
  );
};
