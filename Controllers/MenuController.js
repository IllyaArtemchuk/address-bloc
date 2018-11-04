const inquirer = require("inquirer");
const moment = require("moment");

module.exports = class MenuController {
    constructor(){
        this.mainMenuQuestions = [
            {
                type: "list",
                name: "mainMenuChoice",
                message: "Please choose from an option below",
                choices: [
                    "Add new contact",
                    "Exit",
                    "Get Date"
                ]
            }
        ];

    this.contacts = []

    }

    main() {
        console.log("Welcome to AddressBloc!");
        inquirer.prompt(this.mainMenuQuestions).then((response) => {
            switch(response.mainMenuChoice){
                case "Add new contact":
                    this.addContact();
                    break;
                case "Exit": 
                    this.exit();
                    break;
                case "Get Date":
                    this.getDate();
                    break;
                default:
                    console.log("Invalid Input");
                    this.main();
            }
        })
        .catch((err) => {
            console.log(err);
        });
        }

    clear() {
        console.log("\x1Bc");
    }

    addContact() {
        this.clear();
        console.log("addContact called");
        this.main();
    }

    getDate() {
        this.clear();
        console.log(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"))
        this.main();
    }

    getContactCount(){
        return this.contacts.length;
    }

    exit() {
        console.log("Thanks for using AddressBloc!");
        process.exit();
    }
}