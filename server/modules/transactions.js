const fs = require("fs");
const path = require("path");

const Transactions = async (req, res) => {
    // Get the page number from the query parameters
    const page = parseInt(req.query.page) || 1;

    const filePath = path.join(__dirname, "../", "data", "Parent.json");
    const filePath2 = path.join(__dirname, "../", "data", "Child.json");
    const pageSize = 2;

    fs.readFile(filePath, "utf8", async (err, data) => {
        if (err) {
            return res.status(404).json({ Message: "File not found" });
            // console.error("Error reading JSON file:", err);
        }

        try {
            // Parseing parent JSON
            const jsonData = await JSON.parse(data);

            fs.readFile(filePath2, "utf8", (err, data2) => {
                if (err) {
                    return res.status(404).json({ Message: "File not found" });
                    console.log(err);
                }
                // Parseing child JSON
                const childData = JSON.parse(data2);
                const childTtransactions = Object.values(childData.data);

                const transactions = Object.values(jsonData.data);
                const totallLength = transactions.length;

                // Calculate the start and end index for the current page
                const startIndex = (page - 1) * pageSize;
                const endIndex = startIndex + pageSize;

                const limitedTransactions = transactions.slice(startIndex, endIndex);
                // Calculating responce within page limts
                const responce = limitedTransactions.map((e, index) => {
                    const childResults = childTtransactions.filter((id) => {
                        if (e.id == id.parentId) {
                            return id;
                        }
                    });

                    let newValues = childResults.map((d, index) => {
                        return d.paidAmount;
                    });
                    return newValues;

                    // return childResults;
                });

                // To calculate the totall number amount of payment made for a particular loan
                const calculateTotallAmount = (responce) => {
                    const values = Object.values(responce);
                    if (values.length === 1) {
                        return values[0];
                    } else {
                        return values.reduce((total, value) => total + value, 0);
                    }
                };

                // Making sum of all installment made till now
                function sumValues(obj) {
                    const result = {};

                    for (const key in obj) {
                        const values = obj[key];
                        const sum = Array.isArray(values)
                            ? values.reduce((total, value) => total + value, 0)
                            : values;

                        result[key] = sum;
                    }

                    return result;
                }
                // Got the totall amount value now sending it back as a response
                const totallAmount = sumValues(responce);
                res
                    .status(200)
                    .json({ limitedTransactions, totallLength, totallAmount });
            });
        } catch (parseError) {
            return res.status(500).json({ Message: parseError });
            // console.error('Error parsing JSON:', parseError);
        }
    });
};

module.exports = Transactions;
