import React from 'react';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from "react-redux";

import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { logout, selectIsAuth } from '../../redux/slices/auth';
import { Link } from 'react-router-dom';
import { FaTelegram, FaYoutube, FaLinkedin, FaFacebook } from 'react-icons/fa';

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const onClickLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <div className={styles.navigation}>
            <Link className={styles.link} to="/services">
              SERVICES
            </Link>
            <Link className={styles.link} to="/posts">
              POSTS
            </Link>
            <Link className={styles.link} to="/about">
              ABOUT
            </Link>
          </div>
          <Link className={styles.logo} to="/">
            <div>RUSANOV BLOG</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/add-post">
                  <Button variant="contained">Написать статью</Button>
                </Link>
                <Link to="/add-service">
                  <Button variant="contained">Добавить услугу</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Выйти
                </Button>
              </>
            ) : (
              <>
                {/* <Link to="/login" className={styles.link}>
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register" className={styles.link}>
                  <Button variant="contained">Создать аккаунт</Button>
                </Link> */}
                <div className="socialItems">
                  <a href="https://telegram.com" className={styles.socialLink}>
                    <FaTelegram />
                  </a>
                  <a href="https://youtube.com" className={styles.socialLink}>
                    <FaYoutube />
                  </a>
                  <a href="https://linkedin.com" className={styles.socialLink}>
                    <FaLinkedin />
                  </a>
                  <a href="https://facebook.com" className={styles.socialLink}>
                    <FaFacebook />
                  </a>
                </div>
                
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
