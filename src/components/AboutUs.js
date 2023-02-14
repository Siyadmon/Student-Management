import React from 'react';
import content from './data';
import Footer from './Footer';

const AboutUs = () => {
  return (
    <div>
      <div className="home-first-section">
        <p>About Us</p>
      </div>
      <div className="home-images">
        {content?.map((data, index) => (
          <div
            className="card m-4 mt-5 data-img"
            style={{ width: '250px' }}
            key={index}
          >
            <img
              className="card-img-top"
              src={data.link}
              alt="Card image cap"
            />

            <div className="card-body">
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* =========footer========= */}
      <Footer />

      {/* ================================= */}
    </div>
  );
};

export default AboutUs;
