import React, { useState } from 'react';
import siyad from '../assets/images/url.webp';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

import { useContext } from 'react';
import { Context } from './App';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { ViewContext } from './App';

const Header = () => {
  const [show, setShow] = useContext(Context);
  const [showView, setShowView] = useContext(ViewContext);

  const sessionStatus = sessionStorage.getItem('email');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userIconState, setUserIconState] = useState(false);

  const logout = () => {
    confirmAlert({
      title: 'Confirm Logout',
      message: 'Are you sure to logout ?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            sessionStorage.removeItem('email');
            navigate('/');
          },
        },
        {
          label: 'No',
          onClick: () => navigate('/grievance'),
        },
      ],
    });
  };

  const onUserClick = () => {
    setUserIconState(!userIconState);
  };

  return (
    <div className="">
      <Navbar expand="lg" className="border header">
        <Container>
          <Navbar.Brand href="#home">
            <img src={siyad} width={60} height={50} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/" className="me-4">
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/about" className="me-4">
                About Us
              </Nav.Link>

              {sessionStatus !== null ? (
                <Nav>
                  <Nav.Link as={NavLink} to="/grievance" className="me-4">
                    Grievance
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/discussions" className="me-4">
                    Discussions
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/php-study" className="me-4">
                    P2P Study
                  </Nav.Link>
                </Nav>
              ) : null}
            </Nav>
            <div className="ml-auto call-action">
              <div className="">
                <a className="fas fa-phone fa-1x" href="tel:123-456-7890" />
              </div>
              <div className="ml-4">
                <a
                  className="fas fa-envelope fa-1x"
                  href="mailto:name@gmail.com"
                ></a>
              </div>
            </div>
            {sessionStatus === null ? (
              <Nav className="">
                <Nav.Link as={NavLink} to="/sign-up" className="me-4">
                  Sign Up
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/login"
                  className="mr-auto"
                  onClick={() => setShow(true)}
                >
                  Login
                </Nav.Link>
              </Nav>
            ) : (
              <Nav>
                {sessionStatus ? (
                  <div className="user-top ml-5">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrM9idjLIZhIs-ZGvkIef0hWJbgOiReywmVg&usqp=CAU"
                      onClick={onUserClick}
                      width={40}
                    />

                    {userIconState ? (
                      <div className="dropDisplay">
                        <div className="mb-2">{sessionStatus}</div>
                        <div className="mb-2">
                          <a
                            onClick={() => {
                              setShowView(true);
                              navigate('/view');
                            }}
                          >
                            View Your Profile
                          </a>
                        </div>

                        <div className="mb-2">
                          <a
                            onClick={() => {
                              navigate('/change-password');
                              setUserIconState(!userIconState);
                            }}
                          >
                            Change Password
                          </a>
                        </div>

                        <a onClick={logout}>Logout</a>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
