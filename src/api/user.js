import axios from "axios";

export const createUser = async (user) =>{
    return await axios.post(`http://localhost:4000/api/signup`, user)
}

export const loginUser = async (user) =>{
    return await axios.post(`http://localhost:4000/api/signin`, user)
}

export const changePassword = async (user) =>{
    return await axios.post(`http://localhost:4000/api/restore`, user)
}