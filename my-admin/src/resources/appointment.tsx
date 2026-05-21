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
  SelectInput,
  ReferenceField,
  ReferenceInput,
  AutocompleteInput,
} from "react-admin";
const AppointmentList = () => {
  return (
    <List exporter={false}>
      <DataTable bulkActionButtons={false}>
        <DataTable.Col label="Patient">
          <ReferenceField source="patient" reference="patients" link={false}>
            <ReferenceField source="person" reference="persons" link={false}>
              <TextField source="first_name" />{" "}
              <TextField source="middle_name" />{" "}
              <TextField source="last_name" />{" "}
              <TextField source="suffix" />{" "}
            </ReferenceField>
          </ReferenceField>
        </DataTable.Col>
        <DataTable.Col source="appointment_date">
          <DateField source="appointment_date" />
        </DataTable.Col>
        <DataTable.Col source="type" />
        <DataTable.Col source="created_at">
          <DateField source="created_at" />
        </DataTable.Col>
        <DataTable.Col label="Physician">
          <ReferenceField source="physician" reference="employees" link={false}>
            <ReferenceField source="person" reference="persons" link={false}>
              <TextField source="first_name" />{" "}
              <TextField source="middle_name" />{" "}
              <TextField source="last_name" />{" "}
              <TextField source="suffix" />{" "}
            </ReferenceField>
          </ReferenceField>
        </DataTable.Col>
      </DataTable>
    </List>
  );
};

const AppointmentShow = () => (
  <Show>
    <SimpleShowLayout>
      <ReferenceField source="patient" reference="patients" link={false}>
        <ReferenceField source="person" reference="persons" link={false}>
          <TextField source="first_name" /> <TextField source="middle_name" />{" "}
          <TextField source="last_name" /> <TextField source="suffix" />{" "}
        </ReferenceField>
      </ReferenceField>
      <DateField source="appointment_date" />
      <TextField source="details" />
      <ReferenceField source="physician" reference="employees" link={false}>
        <ReferenceField source="person" reference="persons" link={false}>
          <TextField source="first_name" /> <TextField source="middle_name" />{" "}
          <TextField source="last_name" /> <TextField source="suffix" />{" "}
        </ReferenceField>
      </ReferenceField>
      <TextField source="type" />
      <TextField source="status" />
      <DateField source="referral_details" />
      <DateField source="created_at" />
      <ReferenceField source="created_by" reference="employees" link={false}>
        <ReferenceField source="person" reference="persons" link={false}>
          <TextField source="first_name" /> <TextField source="middle_name" />{" "}
          <TextField source="last_name" /> <TextField source="suffix" />{" "}
        </ReferenceField>
      </ReferenceField>
    </SimpleShowLayout>
  </Show>
);

const AppointmentEdit = () => (
  <Edit>
    <SimpleForm>
      <ReferenceInput
        source="patient"
        reference="patients"
        filter={{ populate: "person" }}
        link={false}
      >
        <AutocompleteInput
          label="Patient"
          optionText={(item) => {
            return `${item.person.first_name} ${item.person.middle_name} ${item.person.last_name} ${item.person.suffix}`;
          }}
          optionValue="id"
        />
      </ReferenceInput>
      <DateInput source="appointment_date" />
      <TextInput source="details" />
      <ReferenceInput
        source="physician"
        reference="employees"
        filter={{ populate: "person" }}
        link={false}
      >
        <AutocompleteInput
          label="Physician"
          optionText={(item) => {
            return `${item.person.first_name} ${item.person.middle_name} ${item.person.last_name} ${item.person.suffix}`;
          }}
          optionValue="id"
        />
      </ReferenceInput>
      <SelectInput
        source="type"
        choices={[
          { id: "Online", name: "Online" },
          { id: "Walk-In", name: "Walk-In" },
        ]}
      />
      <SelectInput
        source="status"
        choices={[
          { id: "Created", name: "Created" },
          { id: "Cancelled", name: "Cancelled" },
          { id: "Rescheduled", name: "Rescheduled" },
        ]}
      />
      <TextInput source="referral_details" />
      <DateInput source="created_at" disabled />
      <ReferenceInput
        source="created_by"
        reference="employees"
        filter={{ populate: "person" }}
        link={false}
      >
        <AutocompleteInput
          disabled
          label="Created By"
          optionText={(item) => {
            return `${item.person.first_name} ${item.person.middle_name} ${item.person.last_name} ${item.person.suffix}`;
          }}
          optionValue="id"
        />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

const transform = (data: object) => ({
  ...data,
  created_by: `68f110602879f920977a3c8d`, // TODO: logged in user
  created_at: new Date(),
});

const AppointmentCreate = () => (
  <Create transform={transform}>
    <SimpleForm>
      <ReferenceInput
        source="patient"
        reference="patients"
        filter={{ populate: "person" }}
        link={false}
      >
        <AutocompleteInput
          label="Patient"
          optionText={(item) => {
            return `${item.person.first_name} ${item.person.middle_name} ${item.person.last_name} ${item.person.suffix}`;
          }}
          optionValue="id"
        />
      </ReferenceInput>
      <DateInput source="appointment_date" />
      <TextInput source="details" />
      <ReferenceInput
        source="physician"
        reference="employees"
        filter={{ populate: "person" }}
        link={false}
      >
        <AutocompleteInput
          label="Physician"
          optionText={(item) => {
            return `${item.person.first_name} ${item.person.middle_name} ${item.person.last_name} ${item.person.suffix}`;
          }}
          optionValue="id"
        />
      </ReferenceInput>
      <SelectInput
        source="type"
        choices={[
          { id: "Online", name: "Online" },
          { id: "Walk-In", name: "Walk-In" },
        ]}
      />
      <SelectInput
        source="status"
        choices={[
          { id: "Created", name: "Created" },
          { id: "Cancelled", name: "Cancelled" },
          { id: "Rescheduled", name: "Rescheduled" },
        ]}
      />
      <TextInput source="referral_details" />
    </SimpleForm>
  </Create>
);

export { AppointmentList, AppointmentShow, AppointmentEdit, AppointmentCreate };
