const mongoose = require("mongoose");
const Car = require("../models/Car");
const fs = require("fs");
const { AppError } = require("../helper/utils");
const carController = {};

carController.createCar = async (req, res, next) => {
  const car = req.body;
  try {
    const { make, model, price, release_date, size, style, transmission_type } =
      car;
    if (
      !make ||
      !model ||
      !price ||
      !release_date ||
      !size ||
      !style ||
      !transmission_type
    ) {
      throw new AppError(401, "Bad request", "Missing body info");
    }
    if (!car) throw new AppError(402, "Bad Request", "Create car Error");
    const newCar = await Car.create(car);
    res.send({ message: "Create Car Successfully!", car: newCar });
    // YOUR CODE HERE
  } catch (err) {
    next(err);
    // YOUR CODE HERE
  }
};

carController.getCars = async (req, res, next) => {
  try {
    let { page } = req.query;
    page = parseInt(page) || 1;
    const limit = 10;
    let offset = limit * (page - 1);
    let listCars = await Car.find().skip(offset).limit(limit);
    let totalCars = await Car.find().countDocuments();
    let totalPage = Math.ceil(totalCars / limit);
    res.send({
      message: "Get Car List Successfully!",
      cars: listCars,
      page: page,
      totalPage: totalPage,
    });
    // YOUR CODE HERE
  } catch (err) {
    // YOUR CODE HERE
    next(err);
  }
};

carController.editCar = async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  console.log(data);
  const options = { new: true };
  try {
    const update = await Car.findByIdAndUpdate(id, data, options);
    res.send({ message: "Update Car Successfully!", update });
    // YOUR CODE HERE
  } catch (err) {
    next(err);
    // YOUR CODE HERE
  }
};

carController.deleteCar = async (req, res, next) => {
  const { id } = req.params;
  const options = { new: true };
  try {
    const updateDelete = await Car.findByIdAndDelete(id, options);
    res.send({ message: "Delete Car Successfully!", updateDelete });
    // YOUR CODE HERE
  } catch (err) {
    next(err);
    // YOUR CODE HERE
  }
};

module.exports = carController;
