//액션타입, 액션 생성함수, 리듀서
//1.액션타입
const SET_LOGIN = "SET_LOGIN";
const SET_LOGOUT = "SET_LOGOUT";
const SET_ID = "SET_ID";
const SET_MENU = "SET_MRNU"

//2.액션생성함수
export const setLogin = () => ({
    type: SET_LOGIN
})
export const setLogout = () => ({
    type: SET_LOGOUT
})
export const setId = (id) => ({
    type: SET_ID,
    id: id
})
export const setMenu = (bool) => ({
    type: SET_MENU,
    bool: bool
})


//초기값 설정
const initialState = {
    isLogin: false,
    menu: false,
    updateId: "",
}
//홈으로 이동함수
export const goToHome = (navigate) => () => {
    navigate('/');
}
//리듀서 생성
export default function logincheck(state = initialState, action) {
    switch (action.type) {
        case SET_LOGIN:
            return {
                ...state,
                isLogin: true
            };
        case SET_LOGOUT:
            return {
                ...state,
                isLogin: false
            };
        case SET_ID:
            return {
                ...state,
                updateId: action.id
            }
        case SET_MENU:
            return {
                ...state,
                menu: action.bool
            }
        default:
            return state;
    }
}