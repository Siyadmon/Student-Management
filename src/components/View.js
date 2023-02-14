import { useContext, useEffect } from 'react';
import { ViewContext } from './App';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersDataAction } from '../action';
import { decryptFunction } from '../utils/security';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function View() {
  const [showView, setShowView] = useContext(ViewContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClose = () => {
    setShowView(false);
    navigate(-1);
  };
  const handleShow = () => setShowView(true);
  let email = sessionStorage.getItem('email');

  useEffect(() => {
    dispatch(getUsersDataAction('users'));
  }, [showView]);

  const { userData } = useSelector((state) => state.studentReducer);
  const user = userData.find((d) => d.email === email);

  return (
    <div>
      <Modal
        show={showView}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Your Details {user?.name}</Modal.Title>
        </Modal.Header>
        <div className="card-body-outer">
          <Modal.Body>
            <div className="card" style={{ width: '18rem' }}>
              <img
                className="card-img-top"
                src={user?.image}
                alt="Card image cap"
              />
              <div className="card-body">
                <h5 className="card-title">Name : {user?.name}</h5>
                <p className="card-text">Email : {user?.email}</p>
                <p className="card-text">Phone : {user?.phone}</p>
                <p className="card-text">
                  Current Address : {user?.CurrentAddress}
                </p>
                <p className="card-text">
                  Present Address : {user?.PresentAddess}
                </p>
                <div className="justify-content-end">
                  <button
                    className="btn btn-warning"
                    onClick={() => {
                      navigate(`/sign-up/${user.id}`);
                    }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </Modal.Body>
        </div>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default View;
