import { commonRequest } from "./ApiCall";
import { BackendURL } from "./helper";

export const registerfunction = async (data) => {
    return await commonRequest("POST", `${BackendURL}/api/user/register`, data);
}
export const loginFunction = async (data) => {
    return await commonRequest("POST", `${BackendURL}/api/user/signIn`, data);
}
export const getUser = async () => {
    return await commonRequest("POST", `${BackendURL}/api/user/get_user`);
}

export const updateProfile = async (data) => {
    return await commonRequest("POST", `${BackendURL}/api/user/updateProfile`, data);
}

export const logout = async () => {
    return await commonRequest("POST", `${BackendURL}/api/user/logout`);
}