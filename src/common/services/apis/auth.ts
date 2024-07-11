import axiosInstance from '../axios-instance/index';

export const authService = {
  async Signin(data: Auth.SigninModel): Promise<Common.IDefaultResponse> {
    try {
      const response = await axiosInstance.post('/auth/api/auth/signin', data);
      return response.data;
    } catch (error) {
      console.error('An error occurred while get accounts:', error);
      throw error;
    }
  },
  async Signin2(data: Auth.SigninModel): Promise<Common.IDefaultResponse> {
    try {
      const response = await axiosInstance.post('/auth/signin', data);
      return response.data;
    } catch (error) {
      console.error('An error occurred while get accounts:', error);
      throw error;
    }
  },
};
