import { api } from "./api";
import { getErrorPayload } from "../utils/getErrorPayload";

export const getTechnicians = async () => {
    try {
        const response = await api.get("/technicians");
        return response.data;
    } catch (error: unknown) {
        console.error("error fetching technicians:", getErrorPayload(error));
        return [];
    }
};

export const getTechnicianById = async (id: string) => {
    try {
        const response = await api.get(`/technicians/${id}`);
        return response.data;
    } catch (error: unknown) {
        console.error(`error fetching technician with id ${id}:`, getErrorPayload(error));
        return null;
    }
};