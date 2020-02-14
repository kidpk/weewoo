const inquirer = require("inquirer");
const fs = require("fs");
// const questions = require('./questions');
const axios = require("axios");
// const avatarUrl = response.owner.avatar_url;
inquirer
  .prompt([{
      type: "input",
      message: "What is your GitHub user name?",
      name: "username"
    },
    {
      type: "input",
      message: "What is your email?",
      name: "email"
    },
    {
      type: "input",
      message: "Project title?",
      name: "title"
    },
    {
      type: "input",
      message: "Gimme a description of your project.",
      name: "depict"
    },
    {
      type: "input",
      message: "Table of contents..",
      name: "contents"
    },
    {
      type: "input",
      message: "Installation, tell me.",
      name: "install"
    },
    {
      type: "input",
      message: "Whats this being used for?",
      name: "usage"
    },
    {
      type: "list",
      message: "What type of license?",
      choices: ["MIT", "Apache", "MPL"],
      name: "type"
    },
    {
      type: "checkbox",
      message: "What are you using on this bad boy?",
      choices: ["HTML", "CSS", "JavaScrpt", "Node.js"],
      name: "prefer"
    }
  ])
  .then(function (response) {
    console.log(response);
    const queryUrl = `https://api.github.com/search/users?q=${response.username}`;
    axios.get(queryUrl).then(function (res) {
      // console.log(res);
      const newObject = {
        ...response,
        avatar: res.data.avatar_url
      }
      const markdown = createMarkdown(newObject);
      fs.writeFile("profile.md", markdown, function (err) {
        if (err) throw err
      });
    });
  });
const createMarkdown = userInfo => {
  return `    # ${userInfo.title}
              >written by ${userInfo.username}
              >Please contact me with any issues: ${userInfo.email}
              # Description of project: ${userInfo.depict}
              # Table of Contents
              <img src = "https://avatars3.githubusercontent.com/u/58701376?v=4" width: 50px; height: 50px>
              *Avatar: ${userInfo.avatar}
              *Username: ${userInfo.username}
              *Title: ${userInfo.title}
              *Description: ${userInfo.depict}
              *Table of Contents
              *Installation: ${userInfo.install}
              *Usage: ${userInfo.usage}
              *License: ${userInfo.type}
              *Technologies used:${userInfo.prefer}
              # The Installation type is ${userInfo.install}
              #Usage ${userInfo.usage}
              #License ${userInfo.type}
              #Types of Technology Used:*${ userInfo.prefer}`}