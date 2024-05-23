#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// Initialize user balance and pin code
let myBalance = 10000; // Dollar
let myPin = 12345;
//print welcome message
console.log(chalk.blue("\n \t Welcome to code with Rubab - ATM Machine: \n"));
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        message: chalk.yellow("enter your pin:"),
        type: "number"
    }
]);
if (pinAnswer.pin === myPin) {
    console.log(chalk.green("\n correct pin code!!!\n"));
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            message: "please select operation:",
            type: "list",
            choices: ["withdraw", "check balance"]
        }
    ]);
    if (operationAns.operation === "withdraw") {
        let withdrawAns = await inquirer.prompt([
            {
                name: "withdrawMethod",
                type: "list",
                message: "select a withdrawal method:",
                choices: ["Fast Cash", "Enter Amount"]
            }
        ]);
        if (withdrawAns.withdrawMethod === "Fast Cash") {
            let FastCashAns = await inquirer.prompt([
                {
                    name: "fastCash",
                    type: "list",
                    message: "Select Amount:",
                    choices: [1000, 2000, 3000, 5000, 10000]
                }
            ]);
            if (FastCashAns.fastCash > myBalance) {
                console.log("Insufficient Balance");
            }
            else {
                myBalance -= FastCashAns.fastCash;
                console.log(`${FastCashAns.fastCash} Withdraw sucessfully`);
                console.log(`Your Remaining Balance is: ${myBalance}`);
            }
        }
        else if (withdrawAns.withdrawMethod === "Enter Amount") {
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    message: "enter the amount to withdraw:",
                    type: "number"
                }
            ]);
            if (amountAns.amount > myBalance) {
                console.log(chalk.red('Insufficient Balance'));
            }
            else {
                //=,-=,+=
                myBalance -= amountAns.amount;
                console.log(`${amountAns.amount} Withdraw successfully`);
                console.log(`your remaining balance is: ${myBalance}`);
            }
        }
    }
    else if (operationAns.operation === "check balance") {
        console.log(`yourbalance is:${myBalance}`);
    }
}
else {
    console.log(chalk.red("incorrect pin number"));
}
