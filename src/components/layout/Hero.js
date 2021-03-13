import React from "react";

const Hero = () => {
  return (
    <React.Fragment>
      <div className="slide">
        <div className="slide-show owl-carousel owl-theme">
          <div className="slide-content" align="center">
            {/* <div className="mask"></div> */}
            <img
              src="images/bgnew.png"
              alt="LeBrownie"
              style={{ maxWidth: 380 }}
            />
            <div className="caption text-center">
              {/* <h2>Delivery</h2>
              <p>Entrega em 30 Minutos</p>
              <button className="button">Peca Agora!</button> */}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Hero;
