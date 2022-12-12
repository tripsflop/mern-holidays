const express = require("express");
const holidays = express.Router();
const Holiday = require("../models/holidays.js");

holidays.post("/", async (req, res) => {
  try {
    const createdHoliday = await Holiday.create(req.body);
    res.status(200).send(createdHoliday); // .json() will send proper headers in response so client knows it's json coming back
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

holidays.get("/", async (req, res) => {
  try {
    const foundHolidays = await Holiday.create({});
    res.status(200).send(foundHolidays);
  } catch (error) {
    res.status(400).json({ error: error.message });
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
