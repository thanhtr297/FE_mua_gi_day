import axios from "axios";

const loginApi = (user) => {
    return axios.post("http://localhost:8080/api/auth/login", user);
}
const register = (user) => {
    return axios.post("http://localhost:8080/api/auth/register" , user);
}
const sendMail = (user) => {
    return axios.post("http://localhost:8080/api/client/create" , user);
}
const emailCheck = () => {
    return axios.get("http://localhost:8080/api/users/email" );
}
const userCheck = () => {
    return axios.get("http://localhost:8080/api/users/user" );
}
export const findUser = (id)=>{
    return axios.get("http://localhost:8080/api/users/"+id)
}


export {loginApi , register ,sendMail , userCheck  ,emailCheck}