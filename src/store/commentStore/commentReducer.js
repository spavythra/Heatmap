import {SHOW_COMMENTS} from "./commentConstants";

export function commentReducer(state = true, action){
    switch (action.type){
        case SHOW_COMMENTS:
            return action.payload
        default: {
            return state
        }
    }
}