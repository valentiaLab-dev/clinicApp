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
  ReferenceField,
  ReferenceInput,
  AutocompleteInput,
  FunctionField,
  RichTextField,
  Button,
} from "react-admin";
import moment from "moment";
import { RichTextInput } from "ra-input-rich-text";
import SendIcon from "@mui/icons-material/Send";
import { useDataProvider, useRecordContext, WithRecord } from "react-admin";
import {
  formatNotificationType,
  capitalize,
  formatDate,
} from "../utils/formatters";
const notifCreateFilter = {
  path: "patient",
  populate: {
    path: "person",
    model: "Person",
  },
};

const SendNotificationButton = () => {
  const record = useRecordContext();
  const dataProvider = useDataProvider();
  const handleSend = async () => {
    try {
      await dataProvider.update("notifications", {
        id: record?.id,
        data: {
          to: record?.to,
          subject: record?.subject,
          text: record?.text,
          html: record?.html,
          status: "sending",
        },
        previousData: {},
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      label={false}
      onClick={handleSend}
      disabled={record?.status === "sent"}
    >
      <SendIcon style={{ paddingRight: 5 }} />
      {`Send ${formatNotificationType(record?.type)}`}
    </Button>
  );
};

const NotificationList = () => {
  // TODO: Display appointment details in multiline format
  return (
    <List exporter={false} queryOptions={{ meta: { prefetch: ["author"] } }}>
      <DataTable bulkActionButtons={false}>
        <DataTable.Col source="appointment">
          <ReferenceField
            source="appointment"
            reference="appointments"
            // queryOptions={{ populate: notifCreateFilter }}
            link={false}
          >
            {/* <FunctionField 
              render={(record) => { console.log(record);
                return `${moment(record.appointment_date).format("L")} - ${record.patient.person.first_name} - ${record.details}`}} 
            /> */}
          </ReferenceField>
        </DataTable.Col>
        <DataTable.Col source="subject" />
        <DataTable.Col source="type">
          <WithRecord
            render={(record) => `${formatNotificationType(record.type)}`}
          />
        </DataTable.Col>
        <DataTable.Col source="scheduled_date" label="Schedule">
          <WithRecord
            render={(record) => `${formatDate(record.scheduled_date)}`}
          />
        </DataTable.Col>
        <DataTable.Col source="status">
          <WithRecord render={(record) => `${capitalize(record.status)}`} />
        </DataTable.Col>
        <DataTable.Col source="sent_date" label="Sent Date">
          <WithRecord render={(record) => `${formatDate(record.sent_date)}`} />
        </DataTable.Col>
      </DataTable>
    </List>
  );
};

const NotificationShow = () => (
  // TODO: Display appointment details in multiline format
  <Show>
    <SimpleShowLayout>
      <ReferenceField
        source="appointment"
        reference="appointments"
        link={false}
      >
        <FunctionField
          label="Date"
          render={(record) => `${formatDate(record.appointment_date)}`}
        />
      </ReferenceField>
      <ReferenceField
        source="appointment"
        reference="appointments"
        link={false}
      >
        <FunctionField
          render={(record) => `${formatDate(record.appointment_date)}`}
        />
        <ReferenceField source="patient" reference="patients" link={false}>
          <ReferenceField source="person" reference="persons" link={false}>
            <TextField source="first_name" />
          </ReferenceField>
        </ReferenceField>
        <FunctionField label="Name" render={(record) => `${record.details}`} />
      </ReferenceField>
      <FunctionField
        label="Type"
        render={(record) => `${formatNotificationType(record.type)}`}
      />
      <TextField source="subject" />
      <TextField source="text" />
      <RichTextField source="html" />
      <FunctionField
        label="Created At"
        render={(record) => `${formatDate(record.created_at)}`}
      />
      <FunctionField
        label="Scheduled On"
        render={(record) => `${formatDate(record.schedule_date)}`}
      />
      <FunctionField
        label="Sent Date"
        render={(record) => `${formatDate(record.sent_date)}`}
      />
      <FunctionField
        label="Status"
        render={(record) => `${capitalize(record.status)}`}
      />
      <SendNotificationButton />
    </SimpleShowLayout>
  </Show>
);

const NotificationEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="subject" />
      <TextInput source="text" />
      <RichTextInput source="html" />
      <SelectInput
        source="type"
        choices={[
          { id: "email", name: "Email" },
          { id: "sms", name: "SMS" },
        ]}
      />
      {/* TODO: capitalize  */}
      <TextInput source="status" disabled={true} />
    </SimpleForm>
  </Edit>
);

const NotificationCreate = () => (
  <Create>
    <SimpleForm>
      <ReferenceInput
        source="appointment"
        label="Appointment"
        reference="appointments"
        filter={{ populate: notifCreateFilter }}
        link={false}
      >
        <AutocompleteInput
          validate={required()}
          label="Appointment Details"
          optionText={(record) => {
            return `${moment(record.appointment_date).format("L")} - ${record.patient} - ${record.details}`;
          }}
        />
      </ReferenceInput>
      <TextInput source="subject" />
      <RichTextInput source="html" />
      <SelectInput
        source="type"
        choices={[
          { id: "email", name: "Email" },
          { id: "sms", name: "SMS" },
        ]}
      />
    </SimpleForm>
  </Create>
);

export {
  NotificationList,
  NotificationShow,
  NotificationEdit,
  NotificationCreate,
};
