import axios from "axios";

export const createCard = async(card) =>{
    return await axios.post(`http://localhost:4000/api/cards/create`, card);
}