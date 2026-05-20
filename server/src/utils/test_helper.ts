import User from "../models/user";
import Person from "../models/person";
import Employee from "../models/employee";
import Position from "../models/position";
import Patient from "../models/patient";
import Access from "../models/access";

const allDbUsers = async () => {
  const collection = await User.find({});
  return collection.map((u) => u.toJSON());
};

const allDbPersons = async () => {
  const collection = await Person.find({});
  return collection.map((u) => u.toJSON());
};

const allDbEmployees = async () => {
  const collection = await Employee.find({});
  return collection.map((u) => u.toJSON());
};

const allDbPositions = async () => {
  const collection = await Position.find({});
  return collection.map((u) => u.toJSON());
};

const allDbPatients = async () => {
  const collection = await Patient.find({});
  return collection.map((u) => u.toJSON());
};

const allDbAccess = async () => {
  const collection = await Access.find({});
  return collection.map((u) => u.toJSON());
};

export default {
  allDbUsers,
  allDbPersons,
  allDbEmployees,
  allDbPositions,
  allDbPatients,
  allDbAccess,
};
