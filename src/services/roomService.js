import axios from 'axios';
import { API_URL } from '../constants/api';

export const getAllRooms = async (page = 0, size = 6, search = "") => {
    try {
        const response = await axios.get(`${API_URL}/rooms`, {
            params: { page, size, search },
        });
        return response.data;
    } catch (error) {
        console.error("Error when getting room list:", error)
        return { content: [], totalPages: 1, number: 0 };
    }
};

export const getRoomById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/rooms/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error when getting room by id:", error)
        return []
    }
};

export const createRoom = async (room) => {
    try {
        const response = await axios.post(
            `${API_URL}/rooms`,
            room,
            { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        return response.data;
    } catch (error) {
        console.error("Error when creating room:", error)
        return null
    }
};

export const deleteRoom = async (roomId) => {
    try {
        await axios.delete(`${API_URL}/rooms/${roomId}`);
    } catch (error) {
        console.error("Error when deleting room:", error);
        throw error;
    }
};

export const updateRoom = async (roomId, roomData) => {
    try {
        console.log("Sending data to update room:", roomData);

        const response = await axios.put(
            `${API_URL}/rooms/${roomId}`, 
            roomData, 
            { headers: { 'Content-Type': 'multipart/form-data' }}
        );

        return response.data;
    } catch (error) {
        console.error("Error when updating room:", error);
        throw error;
    }
};
