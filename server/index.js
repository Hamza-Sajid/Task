const express = require("express");
const app = express();
var cors = require("cors");
const Transactions = require("./modules/transactions");
const transactionDetails = require("./modules/transactionsDetails");
const port = 3000;
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/get-transactions", Transactions);
app.get("/transactionDetails/:id", transactionDetails);

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
