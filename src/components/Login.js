import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useContext } from 'react';
import { Context } from './App';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getLoginDataAction } from '../action';

const Login = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useContext(Context);
  const navigate = useNavigate();

  const handleClose = () => {
    setShow(false);
    const timer = setTimeout(() => {
      navigate(-1);
    }, 300);
    //this timer is a small logic to work modal close button without breaking its animation when clicking close button
    return () => clearTimeout(timer);
  };

  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  const [err, setErr] = useState(false);

  const EmailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (!EmailRegex.test(email) || password === '') {
      setErr(true);
    } else {
      dispatch(getLoginDataAction('users', { email, password }, navigate));
    }
  };

  return (
    <div className="modal-dialog-centered">
      <Modal show={show} onHide={handleClose}>
        <div className="modal-login ">
          <Modal.Header closeButton>
            <Modal.Title className="modal-title">Login</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  autoFocus
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control-lg"
                  value={email}
                />
              </Form.Group>
              {err && email === '' ? (
                <label className="text-danger">Email Required!</label>
              ) : null}
              {err && email !== '' && !EmailRegex.test(email) ? (
                <label className="text-danger">
                  Please enter a valid email!
                </label>
              ) : null}
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPass(e.target.value)}
                  className="form-control-lg"
                  value={password}
                />
              </Form.Group>
              {err && password === '' ? (
                <label className="text-danger">Password is Required!</label>
              ) : null}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={(e) => onFormSubmit(e)}>
              Login
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </div>
  );
};

export default Login;
