import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const PrivateRouting = () => {
  const navigate = useNavigate();
  const sessionStatus = sessionStorage.getItem('email');

  return <div>{sessionStatus !== null ? <Outlet /> : navigate('/login')}</div>;
};

export default PrivateRouting;
