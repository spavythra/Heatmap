import {SHOW_COMMENT} from "./commentConstants";

export const setCommentAction = (state) => ({
    type: SHOW_COMMENT,
    payload: state
})