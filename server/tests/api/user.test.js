const assert = require("node:assert");
const { test, describe, after, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../../app");
const bcrypt = require("bcrypt");
const Model = require("../../models/user");
const Employee = require("../../models/employee");
const Access = require("../../models/access");
const Position = require("../../models/position");
const Person = require("../../models/person");
const initialData = require("../api/mock_data/user");
const initialDataEmployee = require("../api/mock_data/employee");
const initialDataAccess = require("../api/mock_data/access");
const initialDataPerson = require("../api/mock_data/person");
const initialDataPosition = require("../api/mock_data/position");
const helper = require("../../utils/test_helper");
const responses = require("../../constants/responses");

const api = supertest(app);
const route = "/api/users";

describe(`[API Test] ${route}`, () => {
  beforeEach(async () => {
    await Model.deleteMany({});
    await Position.deleteMany({});
    await Person.deleteMany({});
    await Employee.deleteMany({});
    await Access.deleteMany({});

    await Access.insertMany(initialDataAccess);
    await Position.insertMany(initialDataPosition);
    await Person.insertMany(initialDataPerson);
    const allPosition = await helper.allDbPositions();
    const allPerson = await helper.allDbPersons();
    const allAccess = await helper.allDbAccess();

    initialDataEmployee.map((value, index) => {
      value.person = allPerson[index].id;
      value.position = allPosition[index].id;
      return value;
    });

    await Employee.insertMany(initialDataEmployee);

    const allEmployee = await helper.allDbEmployees();

    initialData.map((value, index) => {
      value.employee = allEmployee[index].id;
      value.access = allAccess[index].id;
      return value;
    });

    await Model.insertMany(initialData);
  });

  test("Create item", async () => {
    const dbCollection = await helper.allDbUsers();

    const employee = await Employee.findOne({});
    const access = await Access.findOne({ title: "admin" });

    const newItem = {
      username: "newroot",
      password: "123456",
      employee: employee._id,
      access: access._id,
    };

    await api
      .post(route)
      .send(newItem)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const newDbCollection = await helper.allDbUsers();
    assert.strictEqual(newDbCollection.length, dbCollection.length + 1);

    const usernames = newDbCollection.map((u) => u.username);
    assert(usernames.includes(newItem.username));
  });

  test("Create existing item", async () => {
    const employee = await Employee.findOne({});
    const access = await Access.findOne({ title: "admin" });

    const newItem = {
      username: "stoma4",
      password: "123456",
      employee: employee._id,
      access: access._id,
    };

    const response = await api
      .post(route)
      .send(newItem)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    assert(response.body.error.includes(responses.ERR_VALUE_NOT_UNIQUE));
  });

  test("invalid password", async () => {
    const employee = await Employee.findOne({});
    const access = await Access.findOne({ title: "admin" });

    const newItem = {
      username: "invalidpassword",
      password: "12",
      employee: employee._id,
      access: access._id,
    };

    const response = await api
      .post(route)
      .send(newItem)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    assert(response.body.error.includes(responses.ERR_PASSWORD_INVALID));
  });
});

after(async () => {
  await mongoose.connection.close();
});
