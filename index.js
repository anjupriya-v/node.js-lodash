const express = require("express");
const app = express();
const routes = require("./routes/routes");
app.use(routes);
app.listen(5000, () => {
  console.log("app is listening at port 5000");
});
