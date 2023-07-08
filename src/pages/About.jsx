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
        <ReactMarkdown></ReactMarkdown>
      </div>
    </div>
  );
};

export default About;
