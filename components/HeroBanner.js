import React from 'react';
import Link from 'next/Link';

const HeroBanner = () => {
    return (
        <div className="hero-banner-container">
            <div>
                <p className="beats-solo">SMALL TEXT</p>
                <h3>MID TEXT</h3>
                <img src="" alt="headphones" className="hero-banner-image" />
                <div>
                    <Link href="/product/ID">
                        <button type="button"> BUTTON TEXT</button>
                    </Link>
                    <div className="desc">
                        <h2>Description</h2>
                        <p>DESCRIPTION</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroBanner;
