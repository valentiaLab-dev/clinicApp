const assert = require("node:assert");
const { test, describe, after, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../../app");
const Model = require("../../models/employee");
const Position = require("../../models/position");
const Person = require("../../models/person");
const initialData = require("./mock_data/employee");
const initialDataPerson = require("./mock_data/person");
const initialDataPosition = require("./mock_data/position");
const helper = require("../../utils/test_helper");
const responses = require("../../constants/responses");

const api = supertest(app);
const route = "/api/employees";

describe(`[API Test] ${route}`, () => {
  beforeEach(async () => {
    await Model.deleteMany({});
    await Position.deleteMany({});
    await Person.deleteMany({});

    await Position.insertMany(initialDataPosition);
    await Person.insertMany(initialDataPerson);
    const allPosition = await helper.allDbPositions();
    const allPerson = await helper.allDbPersons();

    initialData.map((value, index) => {
      value.person = allPerson[index].id;
      value.position = allPosition[index].id;
      return value;
    });

    await Model.insertMany(initialData);
  });

  test("Create item", async () => {
    const dbCollection = await helper.allDbEmployees();

    const person = await Person.findOne({ first_name: "Employee" });
    const position = await Position.findOne({ title: "Test" });

    const newItem = {
      hire_date: "01-01-1990",
      is_active: true,
      salary: "100",
      person: person.id,
      position: position.id,
    };

    await api
      .post(route)
      .send(newItem)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const newDbCollection = await helper.allDbEmployees();
    assert.strictEqual(newDbCollection.length, dbCollection.length + 1);
  });

  test("Create existing item", async () => {
    const dbCollection = await helper.allDbEmployees();
    const dbCollectionPerson = await helper.allDbPersons();
    const dbCollectionPosition = await helper.allDbPositions();

    const existing = await Model.findOne({
      position: dbCollectionPosition[0].id,
      person: dbCollectionPerson[0].id,
    });

    const newItem = {
      hire_date: "01-01-2001",
      is_active: true,
      salary: "20",
      person: existing.person,
      position: existing.position,
    };

    const response = await api
      .post(route)
      .send(newItem)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    assert(response.body.error.includes(responses.ERR_VALUE_NOT_UNIQUE));
  });

  test("Update item", async () => {
    const dbCollection = await helper.allDbEmployees();
    const dbCollectionPerson = await helper.allDbPersons();
    const dbCollectionPosition = await helper.allDbPositions();
    const firstItem = dbCollection[0];
    const newItem = {
      hire_date: "02-02-2002",
      salary: 0,
      is_active: false,
      position: dbCollectionPosition[1].id,
      person: dbCollectionPerson[2].id,
    };

    await api
      .patch(`${route}/${firstItem.id}`)
      .send(newItem)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const newDbCollection = await helper.allDbEmployees();
    assert.strictEqual(newDbCollection.length, dbCollection.length);
  });

  test("Delete item", async () => {
    const dbCollection = await helper.allDbEmployees();
    const firstItem = dbCollection[0];

    await api.delete(`${route}/${firstItem.id}`).expect(204);

    const newDbCollection = await helper.allDbEmployees();
    assert.strictEqual(newDbCollection.length, dbCollection.length - 1);
  });
});

after(async () => {
  await mongoose.connection.close();
});
