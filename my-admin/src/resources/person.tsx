import {
  Create,
  TextField,
  SimpleShowLayout,
  Show,
  Edit,
  SimpleForm,
  TextInput,
  DateInput,
  List,
  DataTable,
  DateField,
  EmailField,
  required,
  SelectInput,
  Labeled,
} from "react-admin";
import Grid from "@mui/material/Grid";
const PersonList = () => {
  return (
    <List exporter={false}>
      <DataTable bulkActionButtons={false}>
        <DataTable.Col source="first_name" />
        <DataTable.Col source="middle_name" />
        <DataTable.Col source="last_name" />
        <DataTable.Col source="suffix" />
        <DataTable.Col source="address" />
        <DataTable.Col source="contact" />
        <DataTable.Col source="gender" />
        <DataTable.Col source="birth_date" field={DateField} />
        <DataTable.Col source="email" field={EmailField} />
      </DataTable>
    </List>
  );
};

const PersonShow = () => (
  <Show>
    <SimpleShowLayout>
      <Grid container sx={{ width: "100%" }} spacing={1}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Labeled>
            <TextField source="first_name" />
          </Labeled>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Labeled>
            <TextField source="middle_name" />
          </Labeled>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Labeled>
            <TextField source="last_name" />
          </Labeled>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Labeled>
            <TextField source="suffix" />
          </Labeled>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Labeled>
            <TextField source="birth_date" />
          </Labeled>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Labeled>
            <TextField source="gender" />
          </Labeled>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Labeled>
            <TextField source="address" />
          </Labeled>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Labeled>
            <TextField source="contact" />
          </Labeled>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Labeled>
            <TextField source="email" />
          </Labeled>
        </Grid>
      </Grid>
    </SimpleShowLayout>
  </Show>
);

const PersonEdit = () => (
  <Edit>
    <SimpleForm>
      <Grid container sx={{ width: "100%" }} spacing={1}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <TextInput source="first_name" validate={[required()]} />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <TextInput source="middle_name" validate={[required()]} />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <TextInput source="last_name" validate={[required()]} />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <SelectInput
            source="suffix"
            choices={[
              { id: " ", name: "None" },
              { id: "Sr", name: "Sr" },
              { id: "Jr", name: "Jr" },
              { id: "III", name: "III" },
              { id: "IV", name: "IV" },
              { id: "V", name: "V" },
            ]}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <DateInput source="birth_date" validate={[required()]} />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <SelectInput
            source="gender"
            choices={[
              { id: "Male", name: "Male" },
              { id: "Female", name: "Female" },
            ]}
            validate={[required()]}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <TextInput source="address" validate={[required()]} />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <TextInput source="contact" validate={[required()]} />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <TextInput source="email" />
        </Grid>
      </Grid>
    </SimpleForm>
  </Edit>
);

const PersonCreate = () => (
  <Create>
    <SimpleForm sanitizeEmptyValues>
      <Grid container sx={{ width: "100%" }} spacing={1}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <TextInput source="first_name" validate={[required()]} />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <TextInput source="middle_name" validate={[required()]} />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <TextInput source="last_name" validate={[required()]} />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <SelectInput
            source="suffix"
            choices={[
              { id: " ", name: "None" },
              { id: "Sr", name: "Sr" },
              { id: "Jr", name: "Jr" },
              { id: "III", name: "III" },
              { id: "IV", name: "IV" },
              { id: "V", name: "V" },
            ]}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <DateInput source="birth_date" validate={[required()]} />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <SelectInput
            source="gender"
            choices={[
              { id: "Male", name: "Male" },
              { id: "Female", name: "Female" },
            ]}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <TextInput source="address" validate={[required()]} />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <TextInput source="contact" validate={[required()]} />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <TextInput source="email" />
        </Grid>
      </Grid>
    </SimpleForm>
  </Create>
);

export { PersonList, PersonShow, PersonEdit, PersonCreate };
