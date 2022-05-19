import { Form, Input, Select } from "antd";
import { UserSelect } from "components/user-select";
import { User } from "./index";
import { Project } from "./list";

interface SearchPanelProps {
  users: User[];
  param: Partial<Pick<Project, "name" | "personId">>;
  setParam: (param: SearchPanelProps["param"]) => void;
}

export const SearchPanel = ({ param, setParam, users }: SearchPanelProps) => {
  return (
    <div>
      <Form style={{ marginBottom: "2rem" }} layout="inline">
        <Form.Item>
          <Input
            placeholder="项目名"
            type="text"
            value={param.name}
            onChange={(evt) =>
              setParam({
                ...param,
                name: evt.target.value,
              })
            }
          ></Input>
        </Form.Item>
        <Form.Item>
          <UserSelect
            value={param.personId}
            onChange={(value) => setParam({ ...param, personId: value })}
            defaultOptionName="负责人"
          ></UserSelect>
        </Form.Item>
      </Form>
    </div>
  );
};
