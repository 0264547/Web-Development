import {ADD_REPLY} from './actions';

function Reducer(state,action){
    switch(action.type){
        case ADD_REPLY:
            return{
                ...state,    
                replies: [...state.replies,action.payload]          
            }; 
        default:
            throw new Error(`Unsopported action ${action.type}`)
    }
}

export default Reducer;