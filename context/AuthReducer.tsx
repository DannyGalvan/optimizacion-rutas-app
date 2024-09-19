import {removeValue, storeAuth} from '../services/Storage';
import {AuthState, signin} from './AuthContext';

type AuthAction =
  | {type: 'signIn'; payload: signin}
  | {type: 'initialize'; payload: AuthState}
  | {type: 'logout'}
  | {type: 'changeFavIcon'; payload: number}
  | {type: 'changeUsername'; payload: string};

// generaEstado
export const authReducer = (
  state: AuthState,
  action: AuthAction,
): AuthState => {
  switch (action.type) {
    case 'signIn':
      const signIn = {
        ...state,
        isLoggedIn: true,
        username: action.payload.username,
        token: action.payload.token,
        idUser: action.payload.idUser,
      };
      storeAuth(signIn);
      return signIn;
    case 'initialize':
      storeAuth(action.payload);
      return action.payload;

    case 'logout':
      removeValue('@auth');
      return {
        ...state,
        isLoggedIn: false,
        username: undefined,
        idUser: 0,
        token: '',
      };
    case 'changeFavIcon':
      return {
        ...state,
        idUser: action.payload,
      };
    case 'changeUsername':
      const newState = {
        ...state,
        username: action.payload,
      };
      storeAuth(newState);
      return newState;

    default:
      return state;
  }
};