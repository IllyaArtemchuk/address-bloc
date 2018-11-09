const inquirer = require("inquirer");
const moment = require("moment");
const ContactController = require("./ContactController");

module.exports = class MenuController {
    constructor(){
        this.mainMenuQuestions = [
            {
                type: "list",
                name: "mainMenuChoice",
                message: "Please choose from an option below",
                choices: [
                    "Add new contact",
                    "View all contacts",
                    "Get Date",
                    "Search for a contact",
                    "Exit"
                ]
            }
        ];

      this.book = new ContactController();

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
                case "View all contacts":
                    this.getContacts();
                    break;
                case "Search for a contact":
                    this.search();
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

    remindMe() {
        return "Learning is a life-long pursuit"
    }

    addContact() {
        this.clear();
        inquirer.prompt(this.book.addContactQuestions).then((answers)=> {
            this.book.addContact(answers.name, answers.phone, answers.email).then((contact)=> {
                console.log("Contact added successfully!");
                this.main();
            }).catch((err)=> {
                console.log(err);
                this.main();
            });
        })
    }

    search() {
        inquirer.prompt(this.book.searchQuestions).then((target)=> {
            this.book.search(target.name).then((contact)=> {
                if(contact === null) {
                    this.clear();
                    console.log("contact not found");
                    this.search(); } else {
                        this.showContact(contact);
                    }
            });
        }).catch((err)=> {
            console.log(err);
            this.main();
        });
    }

    showContact(contact){
        this._printContact(contact);
        inquirer.prompt(this.book.showContactQuestions).then((answer)=> {
            switch(answer.selected){
                case "Delete Contact": 
                    this.delete(contact)
                    break;
                case "Main Menu":
                    this.main();
                    break;
                default:
                    console.log("something went wrong")
                    this.showContact(contact);
            }
        }).catch((err)=> {
            console.log(err);
            this.showContact(contact)
        })
    }

    delete(contact){
        inquirer.prompt(this.book.deleteConfirmQuestions).then((answer)=> {
            if(answer.confirmation){
                this.book.delete(contact.id)
                console.log("Contact Deleted!")
                this.main();
            } else {
                console.log("contact not deletec");
                this.showContact(contact);
            }
        }).catch((err)=> {
            console.log(err);
            this.main();
        });
    }

    _printContact(contact){
        console.log(`
          name: ${contact.name}
          phone number: ${contact.phone}
          email: ${contact.email}
          ---------------`
        );

    }

    getDate() {
        this.clear();
        console.log(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"))
        this.main();
    }

    getContactCount(){
        return this.contacts.length;
    }

    getContacts(){
        this.clear();

        this.book.getContacts().then((contacts)=> {
            for(let contact of contacts) {
                this._printContact(contact);
            }
            this.main();
        }).catch((err)=> {
            console.log(err);
            this.main();
        });
    }

    exit() {
        console.log("Thanks for using AddressBloc!");
        process.exit();
    }
}