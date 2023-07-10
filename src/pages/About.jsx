import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@mui/material/Avatar";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

const useStyles = makeStyles((theme) => ({
  aboutContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    marginBottom: theme.spacing(4),
  },
  avatar: {
    marginRight: theme.spacing(2),
    marginLeft: "3%",
    minWidth: 300,
    minHeight: 300,
    borderRadius: "30px 0 100px 0"
  },
  content: {
    color: "#333",
  },
}));

const About = () => {
  const classes = useStyles();

  return (
    <div className={classes.aboutContainer}>
      <Avatar className={classes.avatar} src="https://rusanov-d.ru/api/uploads/IMG_20221204_140644.jpg" alt="Avatar" />
      <div className={classes.content}>
        <h2>About Me</h2>
        <ReactMarkdown>
        <h2>Skills and Experience:</h2>
<ul>
  <li>Strong skills and experience in JavaScript frontend and backend development 😊</li>
  <li>Proficiency with development tools for JavaScript, both frontend and backend 🛠️</li>
  <li>Web design and development experience using ReactJS frontend and NodeJS frameworks and libraries 💻</li>
  <li>Understanding and working knowledge of Restful APIs, with experience working with them 🌐</li>
  <li>Familiarity with React-Redux is an advantage 🚀</li>
</ul>

<h2>Database Experience:</h2>
<ul>
  <li>Skills and experience in using relational database models 🗃️</li>
  <li>Proficiency in using database management tools and languages, such as MySQL, PostgreSQL, Express, and MongoDB 📊</li>
</ul>

<h2>UX/UI Design:</h2>
<ul>
  <li>A working understanding of UX/UI design and development 🎨</li>
</ul>

<h2>Product Development:</h2>
<ul>
  <li>Experience in developing and creating products using ReactJS and MongoDB 🚀</li>
  <li>Over 3 years of IT experience which includes half a year of extensive experience as a React JS Developer ⚛️</li>
  <li>Experienced in MEAN stack development (MongoDB, Express, Angular, Node.js) 📦</li>
  <li>Extensive knowledge in developing single-page applications (SPAs) 🌐</li>
  <li>Good experience in customizing CSS frameworks like MUI, ANTD, and Foundation using CSS pre-processors LESS or SASS 💅</li>
  <li>Good expertise in analyzing the Document Object Model (DOM) Layout, DOM Functions, and JavaScript functions, Cascading Styles across cross-browser using Firebug, Developer Tool Bar 🔍</li>
  <li>Expertise in React JS framework to develop SPAs and working with React Flux architecture and Redux ⚛️🔁</li>
  <li>Ability to work effectively while working as a team member as well as individually 🤝</li>
  <li>Excellent communication and interpersonal skills, well-organized, goal-oriented ✉️🤝</li>
</ul>

        </ReactMarkdown>
      </div>
    </div>
  );
};

export default About;
