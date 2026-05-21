import {
  Create,
  TextField,
  SimpleShowLayout,
  Show,
  Edit,
  SimpleForm,
  DateInput,
  List,
  DataTable,
  DateField,
  required,
  NumberField,
  NumberInput,
  BooleanInput,
  ReferenceInput,
  AutocompleteInput,
  ReferenceField,
} from "react-admin";
const EmployeeList = () => {
  return (
    <List>
      <DataTable bulkActionButtons={false}>
        <DataTable.Col label="Employee">
          <ReferenceField source="person" reference="persons" link={false}>
            <TextField source="first_name" /> <TextField source="middle_name" />{" "}
            <TextField source="last_name" /> <TextField source="suffix" />{" "}
          </ReferenceField>
        </DataTable.Col>
        <DataTable.Col label="Position">
          <ReferenceField source="position" reference="positions" link={false}>
            <TextField source="title" />
          </ReferenceField>
        </DataTable.Col>
      </DataTable>
    </List>
  );
};

const EmployeeShow = () => (
  <Show>
    <SimpleShowLayout>
      <ReferenceField
        source="person"
        label="Employee"
        reference="persons"
        link={false}
      >
        <TextField source="first_name" /> <TextField source="middle_name" />{" "}
        <TextField source="last_name" /> <TextField source="suffix" />{" "}
      </ReferenceField>
      <ReferenceField source="position" reference="positions" link={false}>
        <TextField source="title" />
      </ReferenceField>
      <DateField source="hire_date" />
      <NumberField source="salary" />
      <TextField source="is_active" label="Employee Active" />
    </SimpleShowLayout>
  </Show>
);

const EmployeeEdit = () => (
  <Edit>
    <SimpleForm>
      <ReferenceInput
        source="person"
        label="Employee"
        reference="persons"
        link={false}
      >
        <AutocompleteInput
          disabled
          label="Employee"
          optionText={(person) => {
            return `${person.first_name} ${person.middle_name} ${person.last_name} ${person.suffix}`;
          }}
        />
      </ReferenceInput>
      <ReferenceInput
        source="position"
        label="Position"
        reference="positions"
        link={false}
      >
        <AutocompleteInput
          validate={required()}
          optionText="title"
          optionValue="id"
        />
      </ReferenceInput>
      <DateInput source="hire_date" />
      <NumberInput source="salary" />
      <BooleanInput source="is_active" />
    </SimpleForm>
  </Edit>
);

const EmployeeCreate = () => (
  <Create>
    <SimpleForm sanitizeEmptyValues>
      <ReferenceInput
        source="person"
        label="Employee"
        reference="persons"
        link={false}
      >
        <AutocompleteInput
          validate={required()}
          label="Employee"
          optionText={(person) => {
            return `${person.first_name} ${person.middle_name} ${person.last_name} ${person.suffix}`;
          }}
        />
      </ReferenceInput>
      <ReferenceInput
        source="position"
        label="Position"
        reference="positions"
        link={false}
      >
        <AutocompleteInput
          validate={required()}
          optionText="title"
          optionValue="id"
        />
      </ReferenceInput>
      <DateInput source="hire_date" validate={required()} />
      <NumberInput source="salary" />
      <BooleanInput source="is_active" />
    </SimpleForm>
  </Create>
);

export { EmployeeList, EmployeeShow, EmployeeEdit, EmployeeCreate };
