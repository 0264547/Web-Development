import React, {createContext, useContext, useReducer} from 'react';
import Reducer from './Reducer.jsx';
import { ADD_REPLY } from './actions.js';
import api from '../utils/api.js';

const Context = createContext();

function Provider({children}){
    const initialState = {
        replies:[],
    }
    
    const [state, dispatch] = useReducer(Reducer, initialState);

    return(
        <Context.Provider value = {{state, dispatch}}>
            {children}
        </Context.Provider>
    );
}

function useMyContext(){
    return useContext(Context);
}

async function addReply(dispatch,name,message){
    try{
        const res = await api.post(`/addReply`,{name,message});
        console.log("Reply: ",res);
        dispatch({
                type: ADD_REPLY,
                payload: res.data
            });
                        
    } catch(err){
        console.log(err)
    }
}

export default Provider;
export {useMyContext,addReply};