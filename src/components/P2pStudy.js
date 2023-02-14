import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const P2pStudy = () => {
  const navigate = useNavigate();
  return (
    <div className="p2pOuter">
      <div className="p2pFirstInner container">
        <div className="p2pHead">
          <h4>User Profile</h4>
          <div className="buttons">
            <button className="mr-4 btn-1">Lend</button>
            <button>Borrow</button>
          </div>
        </div>
        <div className="p2psecond-section">
          <div>
            <img
              src="https://p2p-dev.spericorn.com/static/media/profilepic.2946cb96.svg"
              width={70}
            />
          </div>
          <div>
            <p>Metamask Adddress</p>
            <div className="metaId">
              0xae4cD70D64897B6832F9aD7Cafa8D03CC537D1BA
            </div>
          </div>
        </div>

        <div className="p2pThirdSection row">
          <div className="col-4">
            <p>Number of Requests</p>
            <p className="num">0</p>
          </div>
          <div className="col-4">
            <div>Number of Accepted Proposals</div>
            <div className="num">1</div>
          </div>
          <div className="col-4">
            <div>Total amount requested</div>
            <div className="num">0</div>
          </div>
          <div className="col-2 wallet">
            <div>Wallet Balance</div>
            <div className="num">0.7956963586</div>
          </div>
        </div>
      </div>
      <div className="test-btn">
        <Button variant="primary" onClick={() => navigate('/formik-test')}>
          Test Formik
        </Button>
      </div>
    </div>
  );
};

export default P2pStudy;
