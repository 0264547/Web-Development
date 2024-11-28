import React from 'react';

function Replies(props){
    return(
        <div className='reply'>
            <h3>{props.rep.name} says: </h3>
            <p>{props.rep.comment}</p>
        </div>
    );
}

export default Replies;