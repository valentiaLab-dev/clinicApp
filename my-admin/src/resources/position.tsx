import {
  Create,
  TextField,
  SimpleShowLayout,
  Show,
  Edit,
  SimpleForm,
  TextInput,
  List,
  DataTable,
} from "react-admin";
const PositionList = () => {
  return (
    <List exporter={false}>
      <DataTable bulkActionButtons={false}>
        <DataTable.Col source="title" />
        <DataTable.Col source="description" />
      </DataTable>
    </List>
  );
};

const PositionShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="title" />
      <TextField source="description" />
    </SimpleShowLayout>
  </Show>
);

const PositionEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="title" />
      <TextInput source="description" />
    </SimpleForm>
  </Edit>
);

const PositionCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="title" />
      <TextInput source="description" />
    </SimpleForm>
  </Create>
);

export { PositionList, PositionShow, PositionEdit, PositionCreate };
