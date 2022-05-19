import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useDebounce } from "utils";
import styled from "@emotion/styled";
import { useProjects } from "utils/projects";
import { useUsers } from "utils/users";
import { Typography } from "antd";
import { useDocumentTitle } from "utils/index";
import { useUrlQueryParam } from "utils/url";
import { useProjectSearchParams } from "./util";

export interface User {
  id: number;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

export const ProjectListScreen = () => {
  useDocumentTitle("项目列表-Jira", false);

  const [param, setParam] = useProjectSearchParams();
  const { isLoading, error, data: list } = useProjects(useDebounce(param, 200));
  const { data: users } = useUsers();

  const paramShow = useUrlQueryParam(["name", "personId"])[0];

  return (
    <Container>
      <h1>项目列表</h1>
      <div>{JSON.stringify(paramShow)}</div>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} users={users || []} dataSource={list || []} />
    </Container>
  );
};

// ProjectListScreen.whyDidYouRender = true;

const Container = styled.div`
  padding: 2rem 3.2rem;
`;
