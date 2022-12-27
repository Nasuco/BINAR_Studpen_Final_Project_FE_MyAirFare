import { GET_PATH_HISTORY } from "../../actions/history";

const initialState = {
    getHistoryData: null,
    getHistoryLoading: false,
    getHistoryErr: false
}

const history = (state = initialState, action) => {
    switch (action.type) {
        case GET_PATH_HISTORY:
            return {
                ...state,
                getHistoryData: action.payloads.data,
                getHistoryLoading: action.payloads.loading,
                getHistoryErr: action.payloads.errMsg
            }
        default:
            return state;
    }
}

export default history