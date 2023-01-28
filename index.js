const input = process.argv;
const fs = require("fs");

//CREATE A NEW ACCOUNT

const create = () => {
  const data = fs.readFileSync("./dataBase.json", "utf-8");
  parsedData = JSON.parse(data);
  const accounts = parsedData.accounts;
  let obj = accounts.find((o) => o.AcNumber === input[3]);
  if (obj === undefined) {
    const newData = [
      ...accounts,
      { AcNumber: input[3], name: input[4], balance: 0 },
    ];
    parsedData.accounts = newData;
    fs.writeFileSync("./dataBase.json", JSON.stringify(parsedData), "utf-8");
    console.log("Your account is created successfully");
  } else {
    console.log("Sorry ! your account is aleady exists");
  }
};

//DEPOSIT SOME AMOUNT IN A ACCOUNT

const deposit = () => {
  const data = fs.readFileSync("./dataBase.json", "utf-8");
  parsedData = JSON.parse(data);
  const accounts = parsedData.accounts;
  let acNoExist = accounts.find((o) => o.AcNumber === input[3]);
  if (acNoExist !== undefined) {
    let obj = accounts.map((item) =>
      item.AcNumber === input[3]
        ? { ...item, balance: item.balance + +input[4] }
        : item
    );
    parsedData.accounts = obj;
    fs.writeFileSync("./dataBase.json", JSON.stringify(parsedData), "utf-8");
    console.log("Your Amount deposited successfully");
  } else {
    console.log(
      "Your account Number Not found ! Please provide a valid account Number"
    );
  }
};

//WITHDRAW SOME AMOUNT FROM AN ACCOUNT

const withdraw = () => {
  const data = fs.readFileSync("./dataBase.json", "utf-8");
  parsedData = JSON.parse(data);
  const accounts = parsedData.accounts;
  let acNoExist = accounts.find((o) => o.AcNumber === input[3]);
  if (!acNoExist) {
    console.log(
      "Your account Number Not found ! Please provide a valid account Number"
    );
  } else if (acNoExist && acNoExist.balance >= input[4]) {
    let obj = accounts.map((item) =>
      item.AcNumber === input[3]
        ? { ...item, balance: item.balance - +input[4] }
        : item
    );
    parsedData.accounts = obj;
    fs.writeFileSync("./dataBase.json", JSON.stringify(parsedData), "utf-8");
    console.log("Your Amount withdrawn successfully");
  } else if (acNoExist.balance < input[4]) {
    console.log(
      `Sorry ! You don't have sufficient amount to withdraw ! You have only ₹${acNoExist.balance}`
    );
  }
};

//SHOW REMAINING BALANCE OF AN ACCOUNT

const balance = () => {
  const data = fs.readFileSync("./dataBase.json", "utf-8");
  parsedData = JSON.parse(data);
  const accounts = parsedData.accounts;
  let acNoExist = accounts.find((o) => o.AcNumber === input[3]);
  accounts.map((item) => {
    if (item.AcNumber === input[3]) {
      console.log(`${item.name} ${item.balance}`);
    }
  });
  if (!acNoExist) {
    console.log(
      "Sorry ! Your account Number Not found ! Please provide a valid account Number"
    );
  }
};

if (input[2] === "CREATE") {
  create();
} else if (input[2] === "DEPOSIT") {
  deposit();
} else if (input[2] === "WITHDRAW") {
  withdraw();
} else if (input[2] === "BALANCE") {
  balance();
} else {
  console.log("invalid code entered ! please enter a valid code");
}
