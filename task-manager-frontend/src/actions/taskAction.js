import api from "../api";

export const fetchTasks = () => async (dispatch) => {
  const { data } = await api.get("/api/tasks");
  dispatch({ type: "FETCH_TASKS_SUCCESS", payload: data });
};

export const addTask = (task) => async (dispatch) => {
  const { data } = await api.post("/api/tasks", task);
  dispatch({ type: "ADD_TASK_SUCCESS", payload: data });
};

export const updateTask = (task) => async (dispatch) => {
  const { data } = await api.put(`/api/tasks/${task._id}`, task);
  dispatch({ type: "UPDATE_TASK_SUCCESS", payload: data });
};

export const deleteTask = (id) => async (dispatch) => {
  await api.delete(`/api/tasks/${id}`);
  dispatch({ type: "DELETE_TASK_SUCCESS", payload: id });
};
