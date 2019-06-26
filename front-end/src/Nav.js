import React from 'react';
import { NavLink } from 'react-router-dom';

const defaultLinkStyles = {
  textDecoration: 'underline',
  color: 'black',
  backgroundColor: 'white',
};
const activeLink = {
  textDecoration: 'none',
  color: 'white',
  backgroundColor: 'green',
};

const NavItem = ({ dest, text, num }) => (
  <li>
    <NavLink
      style={defaultLinkStyles}
      activeStyle={activeLink}
      to={dest}
      exact={true}
    >
      {text} ({num})
    </NavLink>
  </li>
);

const Nav = ({ filteredData }) => {
  return (
    <nav>
      <ul>
        {Object.entries(filteredData).map(([status, prods]) => {
          if (status === 'all') {
            return (
              <NavItem
                key={status}
                dest="/"
                text="All Products"
                num={prods.length}
              />
            );
          } else {
            return (
              <NavItem
                key={status}
                dest={`/${status}`}
                text={status}
                num={prods.length}
              />
            );
          }
        })}
      </ul>
    </nav>
  );
};

export default Nav;
