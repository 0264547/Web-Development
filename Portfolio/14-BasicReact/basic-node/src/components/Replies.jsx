import React from 'react';

function Replies(props){
    return(
        <div className='reply'>
            <p>{props.rep.comment}</p>
        </div>
    );
}

export default Replies