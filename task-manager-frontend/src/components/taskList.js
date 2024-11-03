import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Modal,
  Typography,
} from "@mui/material";
import Delete from "@mui/icons-material/DeleteForever";
import { deleteTask, fetchTasks, updateTask } from "../actions/taskAction";
import AddTask from "./addTask";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  modalBox: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    backgroundColor: "#fff",
    padding: "24px",
    borderRadius: 8,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    outline: "none",
  },
  addButton: {
    backgroundColor: "#4caf50",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#45a049",
    },
    padding: "16px",
  },
});

const TaskList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const [open, setOpen] = useState(false);
  const currentTime = new Date();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <Box>
      <h1>Your Tasks</h1>
      <List>
        {tasks.map((task) => {
          const dueDate = new Date(task.dueDate);
          const isOverdue = dueDate < currentTime && !task.completed; // Check if overdue and not completed

          return (
            <ListItem key={task._id}>
              <IconButton
                edge="end"
                onClick={() => handleDelete(task._id)}
                aria-label="delete"
              >
                <Delete />
              </IconButton>
              <Checkbox
                checked={task.completed}
                onChange={(e) => {
                  const updatedTask = { ...task, completed: e.target.checked };
                  dispatch(updateTask(updatedTask));
                }}
                color="primary"
              />
              <ListItemText
                primary={`${task.title} - ${
                  task.completed ? "Completed" : "Pending"
                }`}
                secondary={
                  <>
                    <div>{task.description}</div>
                    <div>
                      Due Date: {dueDate.toLocaleString()}
                      {isOverdue && (
                        <Typography
                          variant="body2"
                          color="error"
                          component="span"
                          style={{ marginLeft: "8px" }}
                        >
                          (Overdue)
                        </Typography>
                      )}
                    </div>
                  </>
                }
              />
            </ListItem>
          );
        })}
      </List>
      <Box>
        <Button
          variant="outlined"
          className={classes.addButton}
          onClick={handleOpen}
        >
          Add New Task
        </Button>
        <Modal open={open} onClose={handleClose}>
          <Box className={classes.modalBox}>
            <AddTask handleClose={handleClose} />
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default TaskList;
