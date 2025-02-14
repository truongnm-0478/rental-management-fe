import { API_URL } from '../constants/api'

export const fetchUsers = async () => {
    try {
        const response = await fetch(`${API_URL}/users`)
        return await response.json()
    } catch (error) {
        console.error("Error fetching users:", error)
        return []
    }
}
