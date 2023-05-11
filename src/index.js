const express = require("express");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const app = express();
const router = require("./routers/RouterIndex");
const port = process.env.PORT || 3000;

//connect db
const db = require("./config/db");
db.connect();
//morgan
app.use(morgan("combined"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//handlebar
app.engine(
  "hbs",
  exphbs({
    extname: ".hbs",
    helpers: {},
  })
);
app.set("view engine", "hbs");

router(app);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
