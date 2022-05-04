import React from 'react';

const Navigation = ({ onRouteChange, resetUser }) => {
    return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            <p onClick={
                () => {
                onRouteChange('sign in')
                resetUser()}}
                className='f3 link dim black underline pa3 pointer'>Sign Out
                </p>
        </nav>
    )
}

export default Navigation;