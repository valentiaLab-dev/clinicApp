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
  required,
  SelectInput,
  useRecordContext,
} from "react-admin";
import { formatDiscount } from "../utils/formatters";

interface Record {
  value: number;
  value_type: string;
}
const DiscountField = () => {
  const record: Record | undefined = useRecordContext();
  return formatDiscount(
    record === undefined ? 0 : record.value,
    record === undefined ? "no value type" : record.value_type,
  );
};

const DiscountList = () => {
  return (
    <List exporter={false}>
      <DataTable bulkActionButtons={false}>
        <DataTable.Col source="name" />
        <DataTable.Col source="description" />
        <DataTable.Col label="Discount">
          <DiscountField />
        </DataTable.Col>
      </DataTable>
    </List>
  );
};

const DiscountShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="name" />
      <TextField source="description" />
      <TextField source="value" />
      <TextField source="value_type" />
    </SimpleShowLayout>
  </Show>
);

const DiscountEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="description" />
      <TextInput source="value" />
      <SelectInput
        source="value_type"
        choices={[
          { id: "value", name: "Exact Value" },
          { id: "percentage", name: "Percentage" },
        ]}
        validate={[required()]}
      />
    </SimpleForm>
  </Edit>
);

const DiscountCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="description" />
      <TextInput source="value" />
      <SelectInput
        source="value_type"
        choices={[
          { id: "value", name: "Exact Value" },
          { id: "percentage", name: "Percentage" },
        ]}
        validate={[required()]}
      />
    </SimpleForm>
  </Create>
);

export { DiscountList, DiscountShow, DiscountEdit, DiscountCreate };
