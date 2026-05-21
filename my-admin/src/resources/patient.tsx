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
  required,
  Labeled,
  ReferenceInput,
  AutocompleteInput,
  ReferenceField,
  ArrayField,
  ArrayInput,
  SimpleFormIterator,
} from "react-admin";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
const PatientList = () => {
  return (
    <List exporter={false}>
      <DataTable bulkActionButtons={false}>
        <DataTable.Col label="Patient">
          <ReferenceField source="person" reference="persons" link={false}>
            <TextField source="first_name" /> <TextField source="middle_name" />{" "}
            <TextField source="last_name" /> <TextField source="suffix" />
          </ReferenceField>
        </DataTable.Col>
      </DataTable>
    </List>
  );
};

const PatientShow = () => (
  <Show>
    <SimpleShowLayout>
      <ReferenceField
        source="person"
        label="Name"
        reference="persons"
        link={false}
      >
        <TextField source="first_name" /> <TextField source="middle_name" />{" "}
        <TextField source="suffix" />
      </ReferenceField>

      <Labeled>
        <ArrayField source="medications">
          <DataTable bulkActionButtons={false} empty={"-"}>
            <DataTable.Col source="description">
              <TextField source="description" />
            </DataTable.Col>
            <DataTable.Col source="start_date">
              <DateField source="start_date" />
            </DataTable.Col>
            <DataTable.Col source="end_date">
              <DateField source="end_date" />
            </DataTable.Col>
          </DataTable>
        </ArrayField>
      </Labeled>

      <Labeled>
        <ArrayField source="allergies">
          <DataTable bulkActionButtons={false} empty={"-"}>
            <DataTable.Col source="description">
              <TextField source="description" />
            </DataTable.Col>
            <DataTable.Col source="start_date">
              <DateField source="start_date" />
            </DataTable.Col>
            <DataTable.Col source="end_date">
              <DateField source="end_date" />
            </DataTable.Col>
          </DataTable>
        </ArrayField>
      </Labeled>

      <Labeled>
        <ArrayField source="medical_history">
          <DataTable bulkActionButtons={false} empty={"-"}>
            <DataTable.Col source="description">
              <TextField source="description" />
            </DataTable.Col>
            <DataTable.Col source="start_date">
              <DateField source="start_date" />
            </DataTable.Col>
            <DataTable.Col source="end_date">
              <DateField source="end_date" />
            </DataTable.Col>
          </DataTable>
        </ArrayField>
      </Labeled>

      <Labeled>
        <ArrayField source="family_history">
          <DataTable bulkActionButtons={false} empty={"-"}>
            <DataTable.Col source="description">
              <TextField source="description" />
            </DataTable.Col>
            <DataTable.Col source="start_date">
              <DateField source="start_date" />
            </DataTable.Col>
            <DataTable.Col source="end_date">
              <DateField source="end_date" />
            </DataTable.Col>
          </DataTable>
        </ArrayField>
      </Labeled>
    </SimpleShowLayout>
  </Show>
);

const PatientEdit = () => (
  <Edit>
    <SimpleForm sanitizeEmptyValues>
      <ReferenceInput
        source="person"
        label="Patient"
        reference="persons"
        link={false}
      >
        <AutocompleteInput
          disabled
          validate={required()}
          label="Patient"
          optionText={(person) => {
            return `${person.first_name} ${person.middle_name} ${person.last_name} ${person.suffix}`;
          }}
        />
      </ReferenceInput>

      <Box
        component="section"
        sx={{ m: 2, p: 1, border: "1px dashed grey", width: "90%" }}
      >
        <ArrayInput source="medications">
          <SimpleFormIterator>
            <Grid container sx={{ width: "100%" }} spacing={1}>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextInput source="description" validate={[required()]} />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <DateInput source="start_date" />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <DateInput source="end_date" />
              </Grid>
            </Grid>
          </SimpleFormIterator>
        </ArrayInput>
      </Box>
      <Box
        component="section"
        sx={{ m: 2, p: 1, border: "1px dashed grey", width: "90%" }}
      >
        <ArrayInput source="allergies">
          <SimpleFormIterator>
            <Grid container sx={{ width: "100%" }} spacing={1}>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextInput source="description" />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <DateInput source="start_date" />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <DateInput source="end_date" />
              </Grid>
            </Grid>
          </SimpleFormIterator>
        </ArrayInput>
      </Box>
      <Box
        component="section"
        sx={{ m: 2, p: 1, border: "1px dashed grey", width: "90%" }}
      >
        <ArrayInput source="medical_history">
          <SimpleFormIterator>
            <Grid container sx={{ width: "100%" }} spacing={1}>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextInput source="description" />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <DateInput source="start_date" />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <DateInput source="end_date" />
              </Grid>
            </Grid>
          </SimpleFormIterator>
        </ArrayInput>
      </Box>
      <Box
        component="section"
        sx={{ m: 2, p: 1, border: "1px dashed grey", width: "90%" }}
      >
        <ArrayInput source="family_history">
          <SimpleFormIterator>
            <Grid container sx={{ width: "100%" }} spacing={1}>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextInput source="description" />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <DateInput source="start_date" />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <DateInput source="end_date" />
              </Grid>
            </Grid>
          </SimpleFormIterator>
        </ArrayInput>
      </Box>
    </SimpleForm>
  </Edit>
);

const PatientCreate = () => (
  <Create>
    <SimpleForm sanitizeEmptyValues>
      <ReferenceInput
        source="person"
        label="Patient"
        reference="persons"
        link={false}
      >
        <AutocompleteInput
          validate={required()}
          label="Patient"
          optionText={(person) => {
            return `${person.first_name} ${person.middle_name} ${person.last_name} ${person.suffix}`;
          }}
        />
      </ReferenceInput>

      <Box
        component="section"
        sx={{ m: 2, p: 1, border: "1px dashed grey", width: "90%" }}
      >
        <ArrayInput source="medications">
          <SimpleFormIterator>
            <Grid container sx={{ width: "100%" }} spacing={1}>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextInput source="description" validate={[required()]} />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <DateInput source="start_date" />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <DateInput source="end_date" />
              </Grid>
            </Grid>
          </SimpleFormIterator>
        </ArrayInput>
      </Box>
      <Box
        component="section"
        sx={{ m: 2, p: 1, border: "1px dashed grey", width: "90%" }}
      >
        <ArrayInput source="allergies">
          <SimpleFormIterator>
            <Grid container sx={{ width: "100%" }} spacing={1}>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextInput source="description" />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <DateInput source="start_date" />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <DateInput source="end_date" />
              </Grid>
            </Grid>
          </SimpleFormIterator>
        </ArrayInput>
      </Box>
      <Box
        component="section"
        sx={{ m: 2, p: 1, border: "1px dashed grey", width: "90%" }}
      >
        <ArrayInput source="medical_history">
          <SimpleFormIterator>
            <Grid container sx={{ width: "100%" }} spacing={1}>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextInput source="description" />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <DateInput source="start_date" />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <DateInput source="end_date" />
              </Grid>
            </Grid>
          </SimpleFormIterator>
        </ArrayInput>
      </Box>
      <Box
        component="section"
        sx={{ m: 2, p: 1, border: "1px dashed grey", width: "90%" }}
      >
        <ArrayInput source="family_history">
          <SimpleFormIterator>
            <Grid container sx={{ width: "100%" }} spacing={1}>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextInput source="description" />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <DateInput source="start_date" />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <DateInput source="end_date" />
              </Grid>
            </Grid>
          </SimpleFormIterator>
        </ArrayInput>
      </Box>
    </SimpleForm>
  </Create>
);

export { PatientList, PatientShow, PatientEdit, PatientCreate };
