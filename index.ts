#! /usr/bin/env node

import inquirer from "inquirer";

interface BankAccount {
  accountNumber: number;
  balance: number;
  withdraw(amount: number): void;
  deposite(amount: number): void;
  checkBalance(): void;
}

class BankAccount implements BankAccount {
  accountNumber: number;
  balance: number;

  constructor(accountNumber: number, balance: number) {
    this.accountNumber = accountNumber;
    this.balance = balance;
  }

  withdraw(amount: number): void {
    if (this.balance >= amount) {
      this.balance -= amount;
      console.log(
        `Withdrawal of $${amount} sucessful. Remaining balance $${this.balance}`
      );
    } else {
      console.log("Insuffient balance.");
    }
  }

  deposite(amount: number): void {
    if (amount > 100) {
      amount -= 1;
    }
    this.balance += amount;
    console.log(
      `Deposit of $${amount} sucessful. Remaining balance: $${this.balance}`
    );
  }

  checkBalance(): void {
    console.log(`Current balance: $${this.balance}`);
  }
}

class Customer {
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  mobileNumber: number;
  account: BankAccount;

  constructor(
    firstName: string,
    lastName: string,
    gender: string,
    age: number,
    mobileNumber: number,
    account: BankAccount
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.age = age;
    this.mobileNumber = mobileNumber;
    this.account = account;
  }
}

const accounts: BankAccount[] = [
  new BankAccount(1001, 500),
  new BankAccount(1002, 1000),
  new BankAccount(1003, 2000),
];

const customers: Customer[] = [
  new Customer("Fatime", "Murtaza", "Female", 20, 3157893279, accounts[0]),
  new Customer("Sakina", "Aliasgar", "Female", 30, 3162233440, accounts[1]),
  new Customer("Maria", "Mansoor", "Female", 35, 3459029087, accounts[2]),
];

async function service() {
  do {
    const accountNumberInput = await inquirer.prompt([
      {
        name: "accountNumber",
        type: "number",
        message: "Enter your account number:",
      },
    ]);

    const customer = customers.find(
      (customer) =>
        customer.account.accountNumber === accountNumberInput.accountNumber
    );
    if (customer) {
      console.log(`Welcome, ${customer.firstName} ${customer.lastName}!\n`);
      const ans = await inquirer.prompt([
        {
          name: "select",
          type: "list",
          message: "Select an opteration",
          choices: ["Deposite", "withdraw", "Check Balance", "Exit"],
        },
      ]);

      switch (ans.select) {
        case "Deposite":
          const depositeAmount = await inquirer.prompt([
            {
              name: "amount",
              type: "number",
              message: "Enter the amount to deposite:",
            },
          ]);
          customer.account.deposite(depositeAmount.amount);
          break;

        case "withdraw":
          const withdrawAmount = await inquirer.prompt([
            {
              name: "amount",
              type: "number",
              message: "Enter the amount to withdraw:",
            },
          ]);
          customer.account.withdraw(withdrawAmount.amount);
          break;

        case "Check Balance":
          customer.account.checkBalance();
          break;

        case "Exit":
          console.log("Exiting bank program...");
          console.log(
            "\n Thank you for using our bank services. Have a great day!"
          );
          return;
      }
    } else {
      console.log("Invalid account number, please try again");
    }
  } while (true);
}
service();
