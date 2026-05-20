import {
  Create,
  TextField,
  SimpleShowLayout,
  Show,
  Edit,
  SimpleForm,
  List,
  DataTable,
  DateField,
  ReferenceField,
  useRecordContext,
  ReferenceInput,
  AutocompleteInput,
} from "react-admin";
import { formatDate, formatApptTitle } from "../utils/formatters";
import { FullName, RecordCheck } from "../utils/componentFormatters";

interface Record {
  print_request: Array<Date>;
}

const PrintRequestField = () => {
  const record: Record | undefined = useRecordContext();
  return (
    <ul>
      {record?.print_request.map((item, index) => {
        return <li key={index}>{formatDate(item)}</li>;
      })}
    </ul>
  );
};

const InvoiceList = () => {
  return (
    <List exporter={false}>
      <DataTable bulkActionButtons={false}>
        <DataTable.Col label="Patient" source="patient">
          <ReferenceField source="patient" reference="patients" link={false}>
            <ReferenceField source="person" reference="persons" link={false}>
              <FullName />
            </ReferenceField>
          </ReferenceField>
        </DataTable.Col>
        <DataTable.Col label="Appointment Date">
          <ReferenceField
            source="appointment"
            reference="appointments"
            link={false}
          >
            <DateField source="appointment_date" />
          </ReferenceField>
        </DataTable.Col>
        <DataTable.Col label="Print Request">
          <PrintRequestField />
        </DataTable.Col>
        <DataTable.Col label="Discount">
          <ReferenceField source="discount" reference="discounts" link={false}>
            <TextField source="name" />
          </ReferenceField>
        </DataTable.Col>
      </DataTable>
    </List>
  );
};

const InvoiceShow = () => (
  <Show>
    <SimpleShowLayout>
      <RecordCheck label="1" />
      <ReferenceField source="patient" reference="patients" link={false}>
        <RecordCheck label="2" />
        <ReferenceField source="person" reference="persons" link={false}>
          <RecordCheck label="3" />
          <FullName />
        </ReferenceField>
      </ReferenceField>
      <ReferenceField
        source="appointment"
        reference="appointments"
        link={false}
      >
        <DateField source="appointment_date" />
      </ReferenceField>
      <ReferenceField
        source="print_request"
        label="Print Request"
        reference="appointments"
      >
        <PrintRequestField />
      </ReferenceField>
      <ReferenceField source="discount" reference="discounts" link={false}>
        <TextField source="name" />
      </ReferenceField>
    </SimpleShowLayout>
  </Show>
);

const InvoiceEdit = () => (
  <Edit>
    <SimpleForm>
      <ReferenceInput
        source="appointment"
        reference="appointments"
        filter={{ populate: "names" }}
        link={false}
      >
        <AutocompleteInput
          label="Appointment"
          optionText={(item) => {
            return formatApptTitle(item);
          }}
          optionValue="id"
        />
      </ReferenceInput>
      <ReferenceInput source="discount" reference="discounts" link={false}>
        <AutocompleteInput
          label="Discount"
          optionText={(item) => {
            return `${item.name} `;
          }}
          optionValue="id"
        />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

const InvoiceCreate = () => (
  <Create>
    <SimpleForm>
      <ReferenceInput
        source="appointment"
        reference="appointments"
        filter={{ populate: "names" }}
        link={false}
      >
        <AutocompleteInput
          label="Appointment"
          optionText={(item) => {
            return formatApptTitle(item);
          }}
          optionValue="id"
        />
      </ReferenceInput>
      <ReferenceInput source="discount" reference="discounts" link={false}>
        <AutocompleteInput
          label="Discount"
          optionText={(item) => {
            return `${item.name} `;
          }}
          optionValue="id"
        />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

export { InvoiceList, InvoiceShow, InvoiceEdit, InvoiceCreate };
