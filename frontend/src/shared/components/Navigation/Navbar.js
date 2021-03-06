import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';
import { Button } from '../UIKit/FormElements';
import './Navbar.scss';

const Navbar = () => {
  const { isAuth, userId, logout } = useContext(AuthContext);

  let authLinks;
  if (isAuth) {
    authLinks = (
      <>
        <li>
          <NavLink
            exact
            activeClassName={"active"}
            to={"/blog/new"}
          >
            New Blog
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName={"active"}
            to={`/${userId}/profile`}
          >
            Profile
          </NavLink>
        </li>
        <li>
          <Button inverse onClick={logout}>
            LOGOUT
          </Button>
        </li>
      </>
    );
  } else {
    authLinks = (
      <>
        <li>
          <NavLink
            exact
            activeClassName={"active"}
            to="/auth"
          >
            Auth
          </NavLink>
        </li>
      </>
    );
  }

  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar__brand">
        Verbose Octo Blog
      </NavLink>
      <ul>
        <li>
          <NavLink
            exact
            activeClassName={"active"}
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName={"active"}
            to="/blogs"
          >
            Blogs
          </NavLink>
        </li>
        {authLinks}
      </ul>
    </nav>
  );
};

export default Navbar;
