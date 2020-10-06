import React from 'react';
import './header.css';
//import SearchIcon from '@material-ui/icons/Search';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { connect } from 'react-redux';

const Header: React.FC = (props: any) => {
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
      //@ts-ignore
      window.removeEventListener('scroll');
    };
  }, []);

  return (
    <header className={isVisible ? 'visible' : ''}>
      {/* <div className="header__search">
        <SearchIcon />
        <input placeholder="Search" type="text" />
      </div> */}
      <div className="header__name" onClick={logOut}>
        <img src={props.avatar} alt="your avatar" />
        <h4>{props.userName}</h4>
        <ArrowDropDownIcon />
      </div>
    </header>
  );
};

const mapStateToProps = (state: any) => ({
  avatar: state.userInfo.user?.images[0].url,
  userName: state.userInfo.user?.display_name,
});

export default connect(mapStateToProps)(Header);
