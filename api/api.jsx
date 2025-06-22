// import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const API_URL = "https://ott.gpay.one/api";

export const fn_createBrandApi = async (formData) => {
    try {
        const response = await fetch(`${API_URL}/brand/create`, {
            method: 'POST',
            body: formData,
        });

        const responseData = await response.json();

        if (response.status === 200) {
            return { status: true, data: responseData.data };
        } else {
            return { status: false, message: responseData.message };
        }
    } catch (error) {
        console.error('Error in createBrand function:', error);
        return { status: false, message: 'Network or server error' };
    }
};

export const fn_loginBrandApi = async (data) => {
    try {
        console.log(data)
        const response = await fetch(`${API_URL}/brand/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();

        if (response.status === 200) {
            return { status: true, data: responseData.data };
        } else {
            return { status: false, message: responseData.message };
        }
    } catch (error) {
        console.error('Error in createBrand function:', error);
        return { status: false, message: 'Network or server error' };
    }
};

export const fn_createPostApi = async (formData) => {
    try {
        const response = await fetch(`${API_URL}/post/create`, {
            method: 'POST',
            body: formData,
        });

        const responseData = await response.json();

        if (response.status === 200) {
            return { status: true, message: "✅ New Discount Added" };
        } else {
            return { status: false, message: `❌ ${responseData.message}` };
        }
    } catch (error) {
        console.error('Error in fn_createPostApi function:', error);
        return { status: false, message: 'Network or server error' };
    }
};

export const fn_getPostsByIDApi = async () => {
    try {
        const id = await AsyncStorage.getItem('id');

        const response = await fetch(`${API_URL}/post/get/${id}`, { method: 'GET' });
        const responseData = await response.json();

        if (response.status === 200) {
            return { status: true, data: responseData?.data || [] };
        } else {
            return { status: false, message: `❌ ${responseData.message}` };
        }
    } catch (error) {
        console.error('Error in fn_getPostsByIDApi function:', error);
        return { status: false, message: error?.response?.data?.message || '❌ Network or server error' };
    }
};

export const fn_updateBrandApi = async (formData) => {
    try {
        const id = await AsyncStorage.getItem('id');
        const response = await fetch(`${API_URL}/brand/update/${id}`, {
            method: 'PUT',
            body: formData,
        });

        const responseData = await response.json();

        if (response.status === 200) {
            return { status: true, message: `Brand Updated` };
        } else {
            return { status: false, message: `${responseData.message}` };
        }
    } catch (error) {
        console.error('Error in fn_updateBrandApi function:', error);
        return { status: false, message: 'Network or server error' };
    }
};

export const fn_getBrandsDetailApi = async () => {
    try {
        const id = await AsyncStorage.getItem('id');

        const response = await fetch(`${API_URL}/brand/get/${id}`, { method: 'GET' });
        const responseData = await response.json();

        if (response.status === 200) {
            return { status: true, data: responseData?.data || [] };
        } else {
            return { status: false, message: `${responseData.message}` };
        }
    } catch (error) {
        console.error('Error in fn_getBrandsDetailApi function:', error);
        return { status: false, message: error?.response?.data?.message || 'Network or server error' };
    }
};

export const fn_updatePostStatusApi = async (status, id) => {
    try {
        const response = await fetch(`${API_URL}/post/update-status/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status }),
        });

        const responseData = await response.json();

        if (response.status === 200) {
            return { status: true, message: "✅ Status Updated" };
        } else {
            return { status: false, message: `❌ ${responseData.message}` };
        }
    } catch (error) {
        console.error('Error in fn_updatePostStatusApi function:', error);
        return { status: false, message: 'Network or server error' };
    }
};

export const fn_deletePostApi = async (id) => {
    try {
        const response = await fetch(`${API_URL}/post/delete/${id}`, { method: 'DELETE' });
        const responseData = await response.json();
        console.log(responseData);
        if (response.status === 200) {
            return { status: true, message: "✅ Discount Deleted" };
        } else {
            return { status: false, message: `❌ ${responseData.message}` };
        }
    } catch (error) {
        console.error('Error in fn_deletePostApi function:', error);
        return { status: false, message: '❌ Network or server error' };
    }
};

export const fn_getCategoriesApi = async () => {
    try {
        const response = await fetch(`${API_URL}/category/get-all`, { method: 'GET' });
        const responseData = await response.json();

        if (response.status === 200) {
            return { status: true, data: responseData?.data || [] };
        } else {
            return { status: false, message: `❌ ${responseData.message}` };
        }
    } catch (error) {
        console.error('Error in fn_getCategoriesApi function:', error);
        return { status: false, message: error?.response?.data?.message || 'Network or server error' };
    }
};