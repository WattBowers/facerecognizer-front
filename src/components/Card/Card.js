import React from 'react';
import Signin from './Signin/Signin';

const Card = ({ onRouteChange, loadUser }) => {
    return (
<article className="mv7 br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-3 center">
  <Signin onRouteChange={onRouteChange} loadUser={loadUser}/>
</article>
    )
}

export default Card;