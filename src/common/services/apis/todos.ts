import axiosInstance from '../axios-instance/index';

export const todos = {
  async getTodos(): Promise<Todos.TodoModel[]> {
    try {
      const response = await axiosInstance.get('todos/gettodos');
      return response.data;
    } catch (error) {
      console.error('An error occurred while adding the account:', error);
      throw error;
    }
  },

  async postTodo(data: Todos.TodoModel): Promise<boolean> {
    try {
      const response = await axiosInstance.post(`todos/updatetodo`, data);
      return response.data;
    } catch (error) {
      console.error('An error occurred while retrieving the customer:', error);
      throw error;
    }
  },
};
