import React from 'react';
import './MarqueeSection.css';
import MS1 from '../../img/descarga1.png';

const MarqueeSection = (props) => {
    return (
        <div className={"" + props.hclass}>
            <div className="mycustom-marque">
                <div className="scrolling-wrap">
                    <img src={MS1} alt="marquee" className="marquee-img" />
                </div>
            </div>
        </div>
    );
};

export default MarqueeSection;
