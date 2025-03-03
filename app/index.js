const express = require("express");
const { Sequelize, DataTypes } = require("@sequelize/core");
const { MySqlDialect } = require("@sequelize/mysql");

const app = express();

const sequelize = new Sequelize({
  dialect: MySqlDialect,
  database: "mydb",
  user: "mydb_user",
  password: "mydb_pwd",
  host: "mysql_master",
  port: 3306,
});

const UserModel = sequelize.define("user", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  date_of_birth: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

app.post("/user", async (req, res) => {
  try {
    const result = await UserModel.create({
      email: `test${Math.random()}@gmail.com`,
      first_name: "Test",
      date_of_birth: new Date(),
    });

    console.log("User is created");

    res.status(201).send(result);
  } catch (e) {
    console.log("Failed to create user");

    res.send(500);
  }
});

app.post("/sync", async (req, res) => {
  try {
    await sequelize.sync();

    console.log("Model synced with database");

    res.send(200);
  } catch (e) {
    console.log("Failed to sync model with database", e);

    res.send(500);
  }
});

const PORT = 3000;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
});
