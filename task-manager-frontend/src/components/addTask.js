import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addTask } from "../actions/taskAction";
import { TextField, Button, Typography, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  container: {
    maxWidth: 400,
    margin: "0 auto",
    padding: "24px",
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  submitButton: {
    backgroundColor: "#4caf50",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#45a049",
    },
  },
});

const AddTask = ({ handleClose }) => {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const dispatch = useDispatch();

  // Get current date and time in the required format for `datetime-local`
  const getMinDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !dueDate) {
      toast.error("Please fill in all fields");
      return;
    }

    dispatch(addTask({ title, description, dueDate }));
    toast.success("Task added successfully!");

    setTitle("");
    setDescription("");
    setDueDate("");
    handleClose();
  };

  return (
    <Paper className={classes.container}>
      <Typography variant="h5" align="center" gutterBottom>
        Add New Task
      </Typography>
      <form onSubmit={handleSubmit} className={classes.form}>
        <TextField
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          label="Description"
          variant="outlined"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <TextField
          label="Task Date & Time"
          variant="outlined"
          type="datetime-local"
          InputLabelProps={{ shrink: true }}
          inputProps={{ min: getMinDateTime() }}
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          className={classes.submitButton}
        >
          Add Task
        </Button>
      </form>
    </Paper>
  );
};

export default AddTask;
