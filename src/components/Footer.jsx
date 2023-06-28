import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  footerContainer: {
    backgroundColor: "#333",
    color: "#fff",
    padding: theme.spacing(3),
    textAlign: "center",
  },
  socialLinks: {
    display: "flex",
    justifyContent: "center",
    marginBottom: theme.spacing(2),
  },
  socialLink: {
    margin: theme.spacing(0, 1),
    color: "#fff",
    textDecoration: "none",
  },
  contactInfo: {
    fontSize: "14px",
  },
  emailLink: {
    cursor: "pointer",
    textDecoration: "underline",
  },
  phoneLink: {
    cursor: "pointer",
    textDecoration: "underline",
  },
}));

const Footer = () => {
  const classes = useStyles();

  const copyEmailToClipboard = () => {
    const email = "mrdanii.r@gmail.com";
    navigator.clipboard.writeText(email);
    alert(`Email "${email}" скопирован в буфер обмена.`);
  };

  const callPhone = () => {
    const phoneNumber = ""; // Ваш номер телефона
    window.location.href = `tel:${phoneNumber}`;
    alert(`Выполняется вызов номера ${phoneNumber}.`);
  };

  return (
    <footer className={classes.footerContainer}>
      <div className={classes.socialLinks}>
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.socialLink}
        >
          Facebook
        </a>
        <a
          href="https://www.twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.socialLink}
        >
          YouTube
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.socialLink}
        >
          Telegram
        </a>
      </div>
      <p className={classes.contactInfo}>
        Email:{" "}
        <span className={classes.emailLink} onClick={copyEmailToClipboard}>
          mrdanii.r@gmail.com
        </span>{" "}
        <br />
        Phone:{" "}
        <span className={classes.phoneLink} onClick={callPhone}>
          +7 901 286-76-30
        </span>
      </p>
    </footer>
  );
};

export default Footer;
