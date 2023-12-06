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
    return api.get("/fetch_user_join/");
}
export const nutri = () => {
    return api.get("/fetch_nutrition_info/");
}
export const foodAi = (data) => {
    return api.post("/process_foodimage/", data);
}
export const result_foodAi = () => {
    return api.get("/food_image_info/");
}
export const ocrAi = (data) => {
    return api.post("/process_OCRimage", data);
}
export const result_ocrAi = () => {
    return api.get("/fetch_textimage/");
}
export const updateUser = () => {
    return api.put("/update_user/");
}
export const updateFoodinfo = () => {
    return api.post("/total_food_result/");
}