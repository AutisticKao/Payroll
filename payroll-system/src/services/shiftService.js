import axios from 'axios';

const API_URL = '/api/shifts';

export const getShifts = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching shifts:', error);
        throw error;
    }
};

export const assignShift = async (employeeId, shiftData) => {
    try {
        const response = await axios.post(`${API_URL}/assign`, { employeeId, shiftData });
        return response.data;
    } catch (error) {
        console.error('Error assigning shift:', error);
        throw error;
    }
};

export const updateShift = async (shiftId, shiftData) => {
    try {
        const response = await axios.put(`${API_URL}/${shiftId}`, shiftData);
        return response.data;
    } catch (error) {
        console.error('Error updating shift:', error);
        throw error;
    }
};

export const deleteShift = async (shiftId) => {
    try {
        const response = await axios.delete(`${API_URL}/${shiftId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting shift:', error);
        throw error;
    }
};