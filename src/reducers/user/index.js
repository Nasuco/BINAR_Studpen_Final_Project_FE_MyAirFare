import { GET_USER_DATA } from "../../actions/userAction";

const initialState = {
    getUserData: false,
    getUserLoading: false,
    getUserErr: false
}

const user = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_DATA:
            return {
                ...state,
                getUserData: action.payloads.data,
                getUserLoading: action.payloads.loading,
                getUserErr: action.payloads.errMsg
            }
        default:
            return state;
    }
}

export default user