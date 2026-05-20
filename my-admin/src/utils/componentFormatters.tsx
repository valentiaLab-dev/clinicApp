import { FunctionField, useRecordContext } from "react-admin";
import { formatFullName } from "./formatters";
interface FullName {
  first_name: string;
  middle_name: string;
  last_name: string;
  suffix: string;
}

// From `person`record
const FullName = () => {
  return <FunctionField render={(record) => formatFullName(record)} />;
};

interface Record {
  label: string;
}

// Helper component to check the record
const RecordCheck = (label: Record = { label: "None" }) => {
  const record = useRecordContext();
  console.log(" RecordCheck ", label, record);
  return <></>;
};

export { FullName, RecordCheck };
