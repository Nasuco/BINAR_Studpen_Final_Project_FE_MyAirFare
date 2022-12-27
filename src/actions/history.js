export const GET_PATH_HISTORY = "GET_PATH_HISTORY"

export function getHistoryData(data){
    return (dispatch) => {
        dispatch({
            type: GET_PATH_HISTORY,
            payloads: {
                loading: true,
                data: null,
                errMsg: false
            }
        })

        if(data){
            dispatch({
                type: GET_PATH_HISTORY,
                payloads: {
                    loading: false,
                    data: data,
                    errMsg: false
                }
            })
        }else{
            dispatch({
                type: GET_PATH_HISTORY,
                payloads: {
                    loading: false,
                    data: null,
                    errMsg: false
                }
            })
        }
    }
}