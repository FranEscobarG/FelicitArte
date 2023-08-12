import axios from "axios";

export const getAllBirthdayBoys = async () =>{
    return await axios.get(`http://localhost:4000/api/birthdayBoy/getAll`); 
}

export const getBirthdayBoy = async (ID) =>{
    return await axios.get(`http://localhost:4000/api/birthdayBoy/${ID}`);
}

export const createBirthdayBoy = async (birthdayBoy) =>{
    return await axios.post(`http://localhost:4000/api/birthdayBoy/create`, birthdayBoy)
}

export const updateBirthdayBoy = async (id,birthdayBoy) =>{
    return await axios.put(`http://localhost:4000/api/birthdayBoy/${id}`,birthdayBoy);
}

export const deleteBirthdayBoy = async (ID) =>{
    return await axios.delete(`http://localhost:4000/api/birthdayBoy/${ID}`);
}




