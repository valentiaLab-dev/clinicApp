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
const AccessList = () => {
  return (
    <List exporter={false}>
      <DataTable bulkActionButtons={false}>
        <DataTable.Col source="title" />
        <DataTable.Col source="description" />
      </DataTable>
    </List>
  );
};

const AccessShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="title" />
      <TextField source="description" />
    </SimpleShowLayout>
  </Show>
);

const AccessEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="title" />
      <TextInput source="description" />
    </SimpleForm>
  </Edit>
);

const AccessCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="title" />
      <TextInput source="description" />
    </SimpleForm>
  </Create>
);

export { AccessList, AccessShow, AccessEdit, AccessCreate };
