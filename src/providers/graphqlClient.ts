import Axios from "axios";

const BASE_URL = "http://localhost:5010/graphql";
export const graphqlClient = Axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
})