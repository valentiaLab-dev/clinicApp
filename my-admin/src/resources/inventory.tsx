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
  ReferenceField,
  ReferenceInput,
  AutocompleteInput,
  required,
} from "react-admin";
const InventoryList = () => {
  return (
    <List exporter={false}>
      <DataTable bulkActionButtons={false}>
        <DataTable.Col label="Product">
          <ReferenceField source="product" reference="products" link={false}>
            <TextField source="name" />
          </ReferenceField>
        </DataTable.Col>
        <DataTable.Col label="Supplier">
          <ReferenceField source="supplier" reference="suppliers" link={false}>
            <TextField source="name" />
          </ReferenceField>
        </DataTable.Col>
        <DataTable.Col source="quantity" />
      </DataTable>
    </List>
  );
};

const InventoryShow = () => (
  <Show>
    <SimpleShowLayout>
      <ReferenceField
        source="product"
        label="Product"
        reference="products"
        link={false}
      >
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField
        source="supplier"
        label="Supplier"
        reference="suppliers"
        link={false}
      >
        <TextField source="name" />
      </ReferenceField>
      <TextField source="quantity" />
    </SimpleShowLayout>
  </Show>
);

const InventoryEdit = () => (
  <Edit>
    <SimpleForm sanitizeEmptyValues>
      <ReferenceInput
        source="product"
        label="Product"
        reference="products"
        link={false}
      >
        <AutocompleteInput
          validate={required()}
          label="Product"
          optionText={(product) => {
            return `${product.name}`;
          }}
        />
      </ReferenceInput>
      <ReferenceInput
        source="supplier"
        label="Supplier"
        reference="suppliers"
        link={false}
      >
        <AutocompleteInput
          validate={required()}
          label="Supplier"
          optionText={(supplier) => {
            return `${supplier.name}`;
          }}
        />
      </ReferenceInput>
      <TextInput source="quantity" />
    </SimpleForm>
  </Edit>
);

const InventoryCreate = () => (
  <Create>
    <SimpleForm>
      <ReferenceInput
        source="product"
        label="Product"
        reference="products"
        link={false}
      >
        <AutocompleteInput
          validate={required()}
          label="Product"
          optionText={(product) => {
            return `${product.name}`;
          }}
        />
      </ReferenceInput>
      <ReferenceInput
        source="supplier"
        label="Supplier"
        reference="suppliers"
        link={false}
      >
        <AutocompleteInput
          validate={required()}
          label="Supplier"
          optionText={(supplier) => {
            return `${supplier.name}`;
          }}
        />
      </ReferenceInput>
      <TextInput source="quantity" />
    </SimpleForm>
  </Create>
);

export { InventoryList, InventoryShow, InventoryEdit, InventoryCreate };
