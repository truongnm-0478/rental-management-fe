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
