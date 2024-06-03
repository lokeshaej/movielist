import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon component
import {
  faTwitter,
  faFacebook,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons"; // Import social media icons
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons"; // Import map marker icon
import "./Footer.css"; // Import CSS for Footer styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="social-media">
          <h2>Follow Us</h2>
          <div className="social-icons">
            <a href="https://twitter.com">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="https://facebook.com">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="https://instagram.com">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
        </div>
        <div className="company-info">
          <h2>Contact Us</h2>
          <div className="address">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <p>123 Company Address, City, Country</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;