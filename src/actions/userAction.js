export const GET_USER_DATA = "GET_USER_DATA"

export function getUserdata(data) {
    return (dispatch) => {
        dispatch({
            type: GET_USER_DATA,
            payloads: {
                loading: true,
                data: false,
                errMsg: false
            }
        })

        if(data){
            dispatch({
                type: GET_USER_DATA,
                payloads: {
                    loading: false,
                    data: data,
                    errMsg: false
                }
            })
        }else{
            dispatch({
                type: GET_USER_DATA,
                payloads: {
                    loading: false,
                    data: false,
                    errMsg: false
                }
            })
        }
    }
}