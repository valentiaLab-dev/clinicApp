import { Create, Show, Edit, List } from "react-admin";
const PersonList = () => {
  return <List exporter={false}></List>;
};

const PersonShow = () => <Show></Show>;

const PersonEdit = () => <Edit></Edit>;

const PersonCreate = () => <Create></Create>;

export { PersonList, PersonShow, PersonEdit, PersonCreate };
