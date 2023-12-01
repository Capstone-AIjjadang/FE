import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
    withCredentials: true
});

export const store_memberinfo = () => {
    return api.post("/submit/");
}
export const store_nutri = () => {
    return api.post("/submit_nutrition_info/");
}
export const memberinfo = () => {
    return api.get("/fetch_data/");
}
export const nutri = () => {
    return api.get("/fetch_nutrition_info/");
}
export const foodAi = (data) => {
    return api.post("/process_image/", data);
}
export const result_foodAi = () => {
    return api.get("/fetch_food_image_info/");
}