import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div>
            <p className='f3'>
                {'This will detect faces in your pictures'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5 w-90'>
                    <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange}/>
                    <button onClick={onButtonSubmit} className='ma2 f5 w-30 grow link f4 pv2 dib white bg-light-purple'>Detect</button>
                </div>
            </div>
        </div>
    )
}


export default ImageLinkForm;