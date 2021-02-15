import { userConstants } from '../_constants';

export function users(state = {
  users:[]
}, action) {
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.GETALL_SUCCESS:
      return {
        ...state,
        users:action.users.user
      };
    case userConstants.GETALL_FAILURE:
      return { 
        ...state,
        error: action.error
      };

      case userConstants.CREATE_USER_REQUEST:
        return {
          loading: true
        };
      case userConstants.CREATE_USER_SUCCESS:
        return {
          ...state,
          users:[...state.users,action.newUser.user]
        }
      case userConstants.CREATE_USER_FAILURE:
        return { 
          ...state,
          error: action.error
        };

        case userConstants.CREATE_USER_REQUEST:
          return {
            loading: true
          };
        case userConstants.CREATE_USER_SUCCESS:
          return {
            ...state,
            users:[...state.users,action.newUser.user]
          }
        case userConstants.CREATE_USER_FAILURE:
          return { 
            ...state,
            error: action.error
          };

          case userConstants.GET_ADMIN_USER_REQUEST:
            return {
              loading: true
            };
          case userConstants.GET_ADMIN_USER_SUCCESS:
            return {
              ...state,
              users:action.users.user
            }
          case userConstants.GET_ADMIN_USER_FAILURE:
            return { 
              ...state,
              error: action.error
            };
    default:
      return state
  }
}