const express = require("express");
const holidays = express.Router();
const { faker } = require("@faker-js/faker");
const Holiday = require("../models/holidays.js");

holidays.post("/", async (req, res) => {
  try {
    const createdHoliday = await Holiday.create(req.body);
    res.status(200).send(createdHoliday); // .json() will send proper headers in response so client knows it's json coming back
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

holidays.get("/seed", async (req, res) => {
  const holidays = Array(5)
    .fill(0)
    .map(() => ({
      name: faker.hacker.noun(),
      celebrated: faker.datatype.boolean(),
      description: "Best holiday ever!",
      likes: faker.datatype.number(100),
      tags: [],
    }));
  try {
    //await Holiday.deleteMany({}); //* delete all holidays
    const newHolidays = await Holiday.create(holidays);
    res.json(newHolidays);
  } catch (error) {
    res.status(500).json(error);
  }
});

holidays.get("/", async (req, res) => {
  try {
    const foundHolidays = await Holiday.find().exec();
    res.status(200).json(foundHolidays);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

holidays.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const holiday = await Holiday.findById(id);
    res.json(holiday);
  } catch (error) {
    res.status(500).json({ error });
  }
});

holidays.delete("/:id", async (req, res) => {
  try {
    const deletedHoliday = await Holiday.findByIdAndRemove(req.params.id);
    res.status(200).send(deletedHoliday);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

holidays.put("/:id", async (req, res) => {
  try {
    const updatedHoliday = await Holiday.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).send(updatedHoliday);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = holidays;
