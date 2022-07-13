import {SHOW_COMMIT} from "./commitConstants";
import { commitSelector } from "./commitSelectors";

const initialState = [];

export function commitReducer(state = initialState, action){
    switch (action.type){
        case SHOW_COMMIT:
            return state.concat(action.payload);
        default: {
            return state
        }
    }
}