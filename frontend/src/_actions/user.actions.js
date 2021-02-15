import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    getAll,
    createUser,
    getAdminUsers
};

function login(userid, password) {
    return dispatch => {
        dispatch(request({ userid }));

        userService.login(userid, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                     dispatch(alertActions.error(error));
                }
            );
    };
    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function getAll(cityId,role) {
    return dispatch => {
        dispatch(request());
        userService.getAll(cityId,role)
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error))
            );
    };
    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

function getAdminUsers(role) {
    return dispatch => {
        dispatch(request());
        userService.getAdminUsers(role)
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error))
            );
    };
    function request() { return { type: userConstants.GET_ADMIN_USER_REQUEST } }
    function success(users) { return { type: userConstants.GET_ADMIN_USER_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GET_ADMIN_USER_FAILURE, error } }
}

function createUser(data) {
    return dispatch => {
        userService.createUser(data)
            .then(
                user => { 
                    dispatch(success(user));
                    // history.push('/');
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };
    function request(newUser) { return { type: userConstants.CREATE_USER_REQUEST, newUser } }
    function success(newUser) { return { type: userConstants.CREATE_USER_SUCCESS, newUser } }
    function failure(error) { return { type: userConstants.CREATE_USER_FAILURE, error } }
}