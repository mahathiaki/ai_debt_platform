import api from "./api";

export const analyzeDebt = async () => {
    const response = await api.get("/ai/analyze");
    return response.data;
};