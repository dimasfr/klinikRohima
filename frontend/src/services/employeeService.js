import apiClient from "../utils/apiClient";

// Base URL backend
const API_BASE = "/employee";

// GET all employees
export const getEmployees = async (params = {}) => {
  const response = await apiClient.get(API_BASE, { params });
  return response.data;
};

// GET employee by id
export const getEmployeeById = async (id) => {
  const response = await apiClient.get(`${API_BASE}/${id}`);
  return response.data;
};

// CREATE employee
export const createEmployee = async (employeeData) => {
  const response = await apiClient.post(API_BASE, employeeData);
  return response.data;
};

// UPDATE employee
export const updateEmployee = async (id, employeeData) => {
  const response = await apiClient.put(`${API_BASE}/${id}`, employeeData);
  return response.data;
};

// DELETE (soft delete)
export const deleteEmployee = async (id) => {
  const response = await apiClient.delete(`${API_BASE}/${id}`);
  return response.data;
};
