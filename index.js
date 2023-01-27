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
    console.log("Sorry! your account is aleady exists");
  }
};

//DEPOSIT SOME AMOUNT IN A ACCOUNT

const deposit = () => {
  const data = fs.readFileSync("./dataBase.json", "utf-8");
  parsedData = JSON.parse(data);
  const accounts = parsedData.accounts;
  let obj = accounts.map((item) =>
    item.AcNumber === input[3]
      ? { ...item, balance: item.balance + +input[4] }
      : item
  );
  if (obj) {
    parsedData.accounts = obj;
    fs.writeFileSync("./dataBase.json", JSON.stringify(parsedData), "utf-8");
    console.log("Your Amount deposited successfully");
  }
};

//WITHDRAW SOME AMOUNT FROM AN ACCOUNT

const withdraw = () => {
  const data = fs.readFileSync("./dataBase.json", "utf-8");
  parsedData = JSON.parse(data);
  const accounts = parsedData.accounts;
  let obj = accounts.map((item) =>
    item.AcNumber === input[3]
      ? { ...item, balance: item.balance - +input[4] }
      : item
  );
  if (obj) {
    parsedData.accounts = obj;
    fs.writeFileSync("./dataBase.json", JSON.stringify(parsedData), "utf-8");
    console.log("Your Amount withdrawn successfully");
  }
};

//SHOW REMAINING BALANCE OF AN ACCOUNT

const balance = () => {
  const data = fs.readFileSync("./dataBase.json", "utf-8");
  parsedData = JSON.parse(data);
  const accounts = parsedData.accounts;
  let balance = accounts.map((item) => {
    if (item.AcNumber === input[3]) {
      console.log(`${item.name} ${item.balance}`);
    }
  });
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
  console.log("invalid code entered! please enter a valid code");
}
