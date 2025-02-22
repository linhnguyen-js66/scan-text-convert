import Axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

// Định nghĩa kiểu dữ liệu phản hồi từ API
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Cấu hình Axios instance
const API_BASE_URL = "http://127.0.0.1:8000"; // Thay đổi URL API của bạn

const apiClient: AxiosInstance = Axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Timeout sau 10 giây
});

// Xử lý response từ server
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  },
);

// Hàm gọi API GET
export const getData = async <T>(
  endpoint: string,
  params?: Record<string, any>,
): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<ApiResponse<T>> = await apiClient.get(
      endpoint,
      { params },
    );
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Hàm gọi API POST
export const postData = async <T>(
    endpoint: string,
    data: Record<string, any> | FormData,
    isFormData: boolean = false
  ): Promise<ApiResponse<T>> => {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await apiClient.post(endpoint, data, {
        headers: {
          'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
        },
      });
  
      return response.data;
    } catch (error: any) {
      console.error("API Error:", error.response?.data || error.message);
      throw handleApiError(error);
    }
  };
  

// Hàm gọi API PUT
export const putData = async <T>(
  endpoint: string,
  data: Record<string, any>,
): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<ApiResponse<T>> = await apiClient.put(
      endpoint,
      data,
    );
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Hàm gọi API DELETE
export const deleteData = async <T>(
  endpoint: string,
): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<ApiResponse<T>> =
      await apiClient.delete(endpoint);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Xử lý lỗi API một cách chuyên nghiệp
const handleApiError = (error: any): Error => {
  if (Axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    const message = axiosError.response?.data?.message || axiosError.message;
    return new Error(message);
  }
  return new Error('Unknown API error');
};

export default apiClient;
