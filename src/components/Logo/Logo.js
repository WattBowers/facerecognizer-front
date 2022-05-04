import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import brain from './brain.png';

const Logo = () => {
    return (

    <Tilt className='Tilt br2 shadow-2'>
      <div className='ma2 mt0'>
        <div className='Tilt-inner w3'><img alt='logo' style={{paddingTop: '0.5rem'}} src={brain}/></div>
      </div>
    </Tilt>
    )
}

export default Logo;