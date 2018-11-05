const inquirer = require("inquirer");
const Contact = require("../db/models").Contact;

module.exports = class ContactController {
    constructor(){
        this.contacts = [];
        this.addContactQuestions = [
            {
                type:"input",
                name: "name",
                message: "Contact's name - ",
                Validate(val){
                    return val !== "";
                }
            },
            {
                type: "input",
                name: "phone",
                message: "Contact's phone number - ",
                Validate(val){
                    return val !== "";
                }
            },
            {
                type: "input",
                name: "email",
                message: "Contact's email - ",
                Validate(val){
                    return val !== "";
                }
            }
        ];
    }

    addContact(name, phone, email) {
        return Contact.create({name, phone, email})
    }
}