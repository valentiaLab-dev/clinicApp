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
const SupplierList = () => {
  return (
    <List exporter={false}>
      <DataTable bulkActionButtons={false}>
        <DataTable.Col source="name" />
        <DataTable.Col source="contact" />
        <DataTable.Col source="email" />
        <DataTable.Col source="description" />
      </DataTable>
    </List>
  );
};

const SupplierShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="name" />
      <TextField source="contact" />
      <TextField source="email" />
      <TextField source="description" />
    </SimpleShowLayout>
  </Show>
);

const SupplierEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="contact" />
      <TextInput source="email" />
      <TextInput source="description" />
    </SimpleForm>
  </Edit>
);

const SupplierCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="contact" />
      <TextInput source="email" />
      <TextInput source="description" />
    </SimpleForm>
  </Create>
);

export { SupplierList, SupplierShow, SupplierEdit, SupplierCreate };
