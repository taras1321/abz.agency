import React from 'react';
import Button from '../Button/Button';
import style from './Header.module.css';
import logo from '../../assets/logo.svg';

const Header = () => {
  return (
    <div className={style.header}>
      <div className="container">
        <div className={style.content}>
          <img src={logo} alt="logo"/>

          <div className={style.buttons}>
            <Button>Users</Button>
            <Button>Sign up</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
