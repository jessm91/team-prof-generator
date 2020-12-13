const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Employee = require("./lib/Employee");
const Intern = require("./lib/Intern");

const inquirer = require("inquirer");
const fs = require("fs");
const style = require("./dist/css");

const teamArray = [];

function startingPrompt() {
    inquirer.prompt([
        {
            message: "Enter team name",
            name: "teamname"
        }
    ])
        .then(function(data){
            const teamName = data.teamname
            teamArray.push(teamName)
            addManager();
        })   
}

function addManager() {
    inquirer.prompt([
        {
            message: "What is your team manager's name?",
            name: "name"
        },
        {
            message: "What is your team manager's email address?",
            name: "email"
        },

        {
            type: "number",
            message: "What is your team manager's office number?",
            name: "officeNumber"
        },
    ])

        .then(function (data) {
            const name = data.name
            const id = 1
            const email = data.email
            const officeNumber = data.officeNumber
            const teamMember = new Manager(name, id, email, officeNumber)
            teamArray.push(teamMember)
            addTeamMembers();
        });

}

function addTeamMembers() {
    inquirer.prompt([
        {
            type: "list",
            message: "Would you like to add more team members?",
            choices: ["Yes, add an engineer", "Yes, add an intern", "No, my team is complete"],
            name: "addMemberData"
        }
    ])

        .then(function (data) {

            switch (data.addMemberData) {
                case "Yes, add an engineer":
                    addEngineer();
                    break;

                case "Yes, add an intern":
                    addIntern();
                    break;
                case "No, my team is complete":
                    compileTeam();
                    break;
            }
        });
}

function addEngineer() {
    inquirer.prompt([
        {
            message: "What is this engineer's name?",
            name: "name"
        },
        {
            message: "What is this engineer's email address?",
            name: "email"
        },
        {
            message: "What is this engineer's Github profile?",
            name: "github"
        }
    ])

        .then(function (data) {
            const name = data.name
            const id = teamArray.length + 1
            const email = data.email
            const github = data.github
            const teamMember = new Engineer(name, id, email, github)
            teamArray.push(teamMember)
            addTeamMembers()
        });

};

function addIntern() {
    inquirer.prompt([
        {
            message: "What is this intern's name?",
            name: "name"
        },
        {
            message: "What is this intern's email address?",
            name: "email"
        },
        {
            message: "What is this intern's school?",
            name: "school"
        }
    ])

        .then(function (data) {
            const name = data.name
            const id = teamArray.length + 1
            const email = data.email
            const school = data.school
            const teamMember = new Intern(name, id, email, school)
            teamArray.push(teamMember)
            addTeamMembers()
        });

};

function compileTeam() {

    const htmlArray = []
    const htmlBeginning = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>${teamArray[0]}</title>
    <link href="https://fonts.googleapis.com/css?family=Bebas+Neue&display=swap" rel="stylesheet">
    <style>
     ${style}
    </style>
</head>
<body>
    <div class="banner-bar">
        <h1>${teamArray[0]}</h1>
    </div>
    <div class="card-container">
    `
    htmlArray.push(htmlBeginning);

    for (let i = 1; i < teamArray.length; i++) {
        let object = `
        <div class="member-card">
            <div class="card-top">
                <h2>${teamArray[i].name}</h2>
                <h2>${teamArray[i].title}</h2>
            </div>
            <div class="card-bottom">
                <p>Employee ID: ${teamArray[i].id}</p>
                <p>Email: <a href="mailto:${teamArray[i].email}">${teamArray[i].email}</a>></p>
        `
        if (teamArray[i].officeNumber) {
            object += `
            <p>${teamArray[i].officeNumber}</p>
            `
        }
        if (teamArray[i].github) {
            object += `
            <p>GitHub: <a href="https://github.com/${teamArray[i].github}">${teamArray[i].github}</a></p>
            `
        }
        if (teamArray[i].school) {
            object += `
            <p>School: ${teamArray[i].school}</p>
            `
        }
        object += `
        </div>
        </div>
        `
        htmlArray.push(object)
    }

    const htmlEnd = `
    </div>
    </body>
    </html>
    `
    htmlArray.push(htmlEnd);

    fs.writeFile(`./dist/${teamArray[0]}.html`, htmlArray.join(""), function (err) {
        
    })
}

startingPrompt()