import API from "./api";

// Register User
export const registerUser = async (userData) => {
    const res = await API.post("/auth/register", userData);
    return res.data;
};

// Login User
export const loginUser = async (userData) => {
    const res = await API.post("/auth/login", userData);
    return res.data;
};