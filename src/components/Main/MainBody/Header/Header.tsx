import React, { useState } from 'react';
import { connect } from 'react-redux';
import { RootReducerType } from '../../../../store/store';

// Styles
import './header.css';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

interface IProps {
  avatar: string;
  userName: string;
}

const Header: React.FC<IProps> = ({ avatar, userName }) => {
  const [showLogout, setShowLogout] = useState(false);

  const logOut = () => {
    sessionStorage.removeItem('token');
    window.location.reload();
  };

  const [isVisible, setIsVisible] = React.useState(false);
  React.useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    });
    return () => {
      window.removeEventListener('scroll', () => {});
    };
  }, []);

  return (
    <header className={isVisible ? 'visible' : ''}>
      <div className="header__name" onClick={() => setShowLogout(!showLogout)}>
        <img src={avatar} alt="your avatar" />
        <h4>{userName}</h4>
        <ArrowDropDownIcon />
        <ul className="name__menu" style={{ visibility: showLogout ? 'visible' : 'hidden' }}>
          <li>Account</li>
          <li>Upgrade Your Account</li>
          <li>Settings</li>
          <li onClick={logOut}>Log Out</li>
        </ul>
      </div>
    </header>
  );
};

const mapStateToProps = (state: RootReducerType) => ({
  avatar: state.userInfo.user?.images[0].url,
  userName: state.userInfo.user?.display_name,
});

export default connect(mapStateToProps)(Header);
