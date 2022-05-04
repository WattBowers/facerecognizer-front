import React from 'react';
import Tilt from 'react-parallax-tilt';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
    return (
        <div  className='center ma2 '>
            <div className='absolute mt2'>
                <Tilt className= 'br2'>
                    <img id='inputimage' className='shadow-3 mw6' alt='' src={imageUrl} />
                    <div className='bound' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}></div>
                </Tilt>
            </div>
        </div>
    )
}

export default FaceRecognition;