// Dependencies
require("dotenv").config();
const {Sequelize} = require("sequelize");
// Files
const modelUser = require("./models/User");
const modelSpreadsheet = require("./models/Spreadsheet");
const {DATABASE_URL} = process.env;


const sequelize = new Sequelize(DATABASE_URL, {
    logging: false,
    native: false,
    dialectOptions:
    {
      ssl:
      {
        require: true,
        rejectUnauthorized: false,
      },
    },
});

modelUser(sequelize);
modelSpreadsheet(sequelize);

const {User} = sequelize.models;
const {Spreadsheet} = sequelize.models;

User.hasMany(Spreadsheet);
Spreadsheet.belongsTo(User);


module.exports =
{
    ...sequelize.models,
    db: sequelize,
};