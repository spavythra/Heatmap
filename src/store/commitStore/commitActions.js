import {SHOW_COMMIT} from "./commitConstants";

export const setCommitAction = (state) => ({
    type: SHOW_COMMIT,
    payload: state
})