const fs = require("fs");
const path = require("path");

const transactionDetails = async (req, res) => {
    let id = req.params.id;
    // Extract the integer value from the string
    id = parseInt(id.split("=")[1]);
    const filePath = path.join(__dirname, "../", "data", "Child.json");
    fs.readFile(filePath, "utf8", async (err, data) => {
        if (err) {
            return res.status(404).json({ Message: "File not found" });
            // console.error(err);
        }

        // Parseing the JSON
        const jsonData = await JSON.parse(data);
        const childData = jsonData.data;

        // storeing totall number of installment payed for this `id` loan
        const result = childData.filter((child) => child.parentId === id);

        if (result) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json({ message: "No record found" });
        }
    });
};

module.exports = transactionDetails;
