import axios from 'axios';
import { API_URL } from '../constants/api';

export const getAllRooms = async (page = 0, size = 10) => {
    try {
        const response = await axios.get(`${API_URL}/rooms?page=${page}&size=${size}`);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách phòng:", error)
        return []
    }
};

export const getRoomById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/rooms/${id}`);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi phòng theo id:", error)
        return []
    }
};

export const createRoom = async (room) => {
    try {
        console.log("🔹 Dữ liệu gửi lên server:");
        for (let pair of room.entries()) {
            console.log(pair[0] + ": ", pair[1]);
        }

        const response = await axios.post(
            `${API_URL}/rooms`, 
            room, 
            { headers: { 'Content-Type': 'multipart/form-data' }}
        );
        return response.data;
    } catch (error) {
        console.error("Lỗi khi tạo phòng:", error)
        return null
    }
};