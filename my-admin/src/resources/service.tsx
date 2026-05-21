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
  ReferenceInput,
  AutocompleteArrayInput,
  ReferenceArrayField,
  SingleFieldList,
  ChipField,
  required,
} from "react-admin";

const ServiceList = () => {
  return (
    <List exporter={false}>
      <DataTable bulkActionButtons={false}>
        <DataTable.Col source="name" />
        <DataTable.Col source="price" />
        <DataTable.Col source="decription" />
        <DataTable.Col source="category" />
        <DataTable.Col source="products">
          <ReferenceArrayField
            source="products"
            label="Products used for the service"
            reference="products"
          >
            <SingleFieldList>
              <ChipField source="name" />
            </SingleFieldList>
          </ReferenceArrayField>
        </DataTable.Col>
      </DataTable>
    </List>
  );
};

const ServiceShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="name" />
      <TextField source="price" />
      <TextField source="decription" />
      <TextField source="category" />
      <ReferenceArrayField
        source="products"
        label="Products used for the service"
        reference="products"
      >
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>
    </SimpleShowLayout>
  </Show>
);

const ServiceEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="price" />
      <TextInput source="description" />
      <TextInput source="category" />
      <ReferenceInput
        source="products"
        label="Products used for the service"
        reference="products"
        link={false}
      >
        <AutocompleteArrayInput
          validate={required()}
          label="Products"
          optionText={(product) => {
            return `${product.name}`;
          }}
        />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

const ServiceCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="price" />
      <TextInput source="decription" />
      <TextInput source="category" />
      <ReferenceInput
        source="products"
        label="Products used for the service"
        reference="products"
        link={false}
      >
        <AutocompleteArrayInput
          validate={required()}
          label="Products"
          optionText={(product) => {
            return `${product.name}`;
          }}
        />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

export { ServiceList, ServiceShow, ServiceEdit, ServiceCreate };
