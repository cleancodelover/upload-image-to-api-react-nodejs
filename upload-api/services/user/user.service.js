const express = require("express");
const db = require("../../models");
module.exports = {
  create: (data, callBack) => {
    db.User.create({
      username: data.username,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      gender: data.gender,
    })
      .then((result) => {
        return callBack(null, result);
      })
      .catch((error) => {
        console.log(error);
        return callBack(error);
      });
  },
  getUsers: (callBack) => {
    db.User.findAll()
      .then((result) => {
        return callBack(null, result);
      })
      .catch((error) => {
        return callBack(error);
      });
  },
  getUserById: (id, callBack) => {
    db.User.findByPk(id)
      .then((result) => {
        return callBack(null, result);
      })
      .catch((error) => {
        return callBack(error);
      });
  },
  updateUser: (data, callBack) => {
    db.User.update(
      {
        username: data.username,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        gender: data.gender,
      },
      { returning: true, where: { id: data.id } }
    )
      .then((result) => {
        return callBack(null, result);
      })
      .catch((error) => {
        return callBack(error);
      });
  },
  deleteUser: (data, callBack) => {
    db.User.destroy({
      where: { id: data.id },
    })
      .then((result) => {
        return callBack(null, result);
      })
      .catch((error) => {
        return callBack(error);
      });
  },
  getUserByUserEmail: (email, callBack) => {
    db.User.findOne({
      where: { username: email },
    })
      .then((result) => {
        console.log(result);
        return callBack(null, result);
      })
      .catch((error) => {
        console.log(error);
        return callBack(error);
      });
  },
};
