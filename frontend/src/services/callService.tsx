import { api } from "./api";
import { getErrorPayload } from "../utils/getErrorPayload";
import type { CallRequest } from "../interfaces/CallRequest";
import type { CallUpdate } from "../interfaces/CallRequest";

export const getCalls = async () => {
    try {
        const response = await api.get("/calls");
        return response.data;
    } catch (error: unknown) {
        console.error("error fetching calls:", getErrorPayload(error));
        return [];
    }
};

export const getCallById = async (id: string) => {
    try {
        const response = await api.get(`/calls/${id}`);
        return response.data;
    } catch (error: unknown) {
        console.error(`error fetching call with id ${id}:`, getErrorPayload(error));
        return null;
    }
};

export const createCall = async (technicianId: number, callData: CallRequest) => {
    try {
        const response = await api.post(
            `/calls/${technicianId}`,
            callData
        );

        return response.data;

    } catch (error: unknown) {
        console.error(
            "error creating call:",
            getErrorPayload(error)
        );

        return null;
    }
};

export const createCallAuto = async (callData: CallRequest) => {
    try {
        const response = await api.post("/calls/auto", callData);
        return response.data;
    } catch (error: unknown) {
        console.error("error creating call:", getErrorPayload(error));
        return null;
    }
};

export const updateCall = async (id: string, callData: CallUpdate) => {
    try {
        const response = await api.put(`/calls/${id}`, callData);
        return response.data;
    } catch (error: unknown) {
        console.error(`error updating call ${id}:`, getErrorPayload(error));
        return null;
    }
};

export const deleteCall = async (id: string) => {
    try {
        await api.delete(`/calls/${id}`);
        return true;
    } catch (error: unknown) {
        console.error(
            `error deleting call ${id}:`,
            getErrorPayload(error)
        );

        return false;
    }
};