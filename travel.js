function detectFraudulentTransactions(transactions, amountThreshold, timeThreshold) {
    let fraudulentTransactions = [];
    let userTransactions = {};

    transactions.forEach(transaction => {
        let [transactionId, userId, amount, location, timestamp] = transaction;

        // Check for amount threshold
        if (amount > amountThreshold) {
            fraudulentTransactions.push(transactionId);
            return;
        }

        // Check for suspicious activities
        if (!userTransactions[userId]) {
            userTransactions[userId] = [];
        }

        for (let [prevLocation, prevTimestamp] of userTransactions[userId]) {
            if (location !== prevLocation && Math.abs(timestamp - prevTimestamp) <= timeThreshold) {
                fraudulentTransactions.push(transactionId);
                return;
            }
        }

        userTransactions[userId].push([location, timestamp]);
    });

    return fraudulentTransactions;
}

// Example usage
const transactions = [
    [1, 1001, 1000, "Mumbai", 5],
    [2, 1002, 10000, "Kolkata", 10],
    [3, 1003, 1000, "Gujarat", 3],
    [4, 1003, 2000, "Chennai", 10]
];

const amountThreshold = 5000;
const timeThreshold = 10;

console.log(detectFraudulentTransactions(transactions, amountThreshold, timeThreshold));
// Expected output: [2, 4]
