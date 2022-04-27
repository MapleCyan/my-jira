import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useEffect, useState } from "react";
import qs from "qs";
import { cleanObject } from "utils";

const apiURL = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${apiURL}/projects?${qs.stringify(cleanObject(param))}`).then(
      async (resopnse) => {
        if (resopnse.ok) {
          setList(await resopnse.json());
        }
      }
    );
  }, [param]);

  useEffect(() => {
    fetch(`${apiURL}/users`).then(async (resopnse) => {
      if (resopnse.ok) {
        setUsers(await resopnse.json());
      }
    });
  }, []);

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List users={users} list={list} />
    </div>
  );
};
