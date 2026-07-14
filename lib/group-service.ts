"use server";

import axios from 'axios';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

const API_URL = 'https://upskilling-egypt.com:3005/api/group';

const getAuthHeaders = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    return { headers: { Authorization: `Bearer ${token}` } };
};

export const getGroups = async (page: number = 1, limit: number = 10) => {
    const config = await getAuthHeaders();
    let response;
    try{

         response = await axios.get(`${API_URL}?page=${page}&limit=${limit}`, config);
    }
    catch(e){console.log(e);
    }
    return response?.data;
};

export const deleteGroup = async (id: string) => {
    const config = await getAuthHeaders();
    await axios.delete(`${API_URL}/${id}`, config);
    revalidatePath("/instructor/groups");
};

export const createGroup = async (name: string) => {
    const config = await getAuthHeaders();
    await axios.post(API_URL, { name }, config);
    revalidatePath("/instructor/groups");
};

export const updateGroup = async (id: string, name: string) => {
    const config = await getAuthHeaders();
    await axios.put(`${API_URL}/${id}`, { name }, config);
    revalidatePath("/instructor/groups");
};
