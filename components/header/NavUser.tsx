'use client';
import React from 'react';
import NavLink from './NavLink';
import { useAuth } from '@/context/auth';
import { logout as logout_firebase } from '../../actions/auth';

const NavUser = () => {
  const { isAuthenticated, logout } = useAuth();
  const logoutHandler = async () => {
    const server_logout = await logout_firebase();
    if (server_logout?.status === 200) {
      logout();
    } else {
      // return notification error message
    }
  };

  return (
    <>
      <li>
        {isAuthenticated && (
          <button type="button" onClick={logoutHandler}>
            Logout
          </button>
        )}
        {!isAuthenticated && <NavLink href="/login" title="Sign in" />}
      </li>
    </>
  );
};

export default NavUser;
