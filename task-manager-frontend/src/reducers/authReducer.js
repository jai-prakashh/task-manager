const initialState = {
  userInfo: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, userInfo: action.payload };
    case "REGISTER":
      return { ...state, userInfo: action.payload };
    case "LOGOUT":
      return { ...state, userInfo: null };
    default:
      return state;
  }
};

export default authReducer;
