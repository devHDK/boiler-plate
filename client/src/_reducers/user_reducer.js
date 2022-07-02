import { LOGIN_USER, REGISTER_USER } from "../_action/types";

export default function (state = {}, action) {
  switch (action.type) {
    case REGISTER_USER:
      return { ...state, register: action.payload };
      break;
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
      break;

    default:
      return state;
  }
}
