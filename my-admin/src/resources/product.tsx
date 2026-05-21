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
  Labeled,
  ArrayField,
  ArrayInput,
  SimpleFormIterator,
  required,
} from "react-admin";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
const ProductList = () => {
  return (
    <List exporter={false}>
      <DataTable bulkActionButtons={false}>
        <DataTable.Col source="name" />
        <DataTable.Col source="price" />
        <DataTable.Col source="decription" />
        <DataTable.Col source="category" />
      </DataTable>
    </List>
  );
};

const ProductShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="name" />
      <TextField source="price" />
      <TextField source="description" />
      <TextField source="category" />
      <Labeled>
        <ArrayField source="attributes">
          <DataTable bulkActionButtons={false} empty={"-"}>
            <DataTable.Col source="key">
              <TextField source="key" />
            </DataTable.Col>
            <DataTable.Col source="value">
              <TextField source="value" />
            </DataTable.Col>
          </DataTable>
        </ArrayField>
      </Labeled>
    </SimpleShowLayout>
  </Show>
);

const ProductEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="price" />
      <TextInput source="description" />
      <TextInput source="category" />
      <Box
        component="section"
        sx={{ m: 2, p: 1, border: "1px dashed grey", width: "90%" }}
      >
        <ArrayInput source="attributes">
          <SimpleFormIterator>
            <Grid container sx={{ width: "100%" }} spacing={1}>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextInput source="key" validate={[required()]} />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextInput source="value" />
              </Grid>
            </Grid>
          </SimpleFormIterator>
        </ArrayInput>
      </Box>
    </SimpleForm>
  </Edit>
);

const ProductCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="price" />
      <TextInput source="description" />
      <TextInput source="category" />
      <Box
        component="section"
        sx={{ m: 2, p: 1, border: "1px dashed grey", width: "90%" }}
      >
        <ArrayInput source="attributes">
          <SimpleFormIterator>
            <Grid container sx={{ width: "100%" }} spacing={1}>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextInput source="key" validate={[required()]} />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextInput source="value" />
              </Grid>
            </Grid>
          </SimpleFormIterator>
        </ArrayInput>
      </Box>
    </SimpleForm>
  </Create>
);

export { ProductList, ProductShow, ProductEdit, ProductCreate };
