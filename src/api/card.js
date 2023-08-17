import axios from "axios";

export const createCard = async(card) =>{
    return await axios.post(`http://localhost:4000/api/cards/create`, card);
}

export const getAllCard = async() =>{
    return await axios.get(`http://localhost:4000/api/cards/getAll`);
}   

export const getCard = async(name) =>{
    return await axios.get(`http://localhost:4000/api/cards/${name}`);
}

export const updateCard = async(ID, Card) =>{
    return await axios.put(`http://localhost:4000/api/cards/${ID}`, Card);
};