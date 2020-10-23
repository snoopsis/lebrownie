import React from "react";

const Footer = () => {
  return (
    <React.Fragment>
      <footer>
        <div className="container">
          <ul>
            <li>
              <a
                href="https://www.facebook.com/leilane.dias.319"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-facebook"></i>
              </a>
            </li>
            <li>
              <a
                href="  https://www.youtube.com/channel/UCinWAjdC2U6qDyCBAxc4BgA"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-youtube"></i>
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/LeilaneDias9"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-twitter"></i>
              </a>
            </li>

            <li>
              <a
                href="https://www.instagram.com/leilanebrownie/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-instagram"></i>
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/5571985090609"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-whatsapp"></i>
              </a>
            </li>
          </ul>
          <img
            src="images/ssl.jpg"
            style={{ width: "100%", height: "auto" }}
            alt="SSL Site Seguro"
          />
          <p>LeBrownie © 2020</p>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
