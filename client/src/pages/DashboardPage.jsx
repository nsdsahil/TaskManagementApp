import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const [boards, setBoards] = useState([]);
  const [boardName, setBoardName] = useState('');
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        const headers = {
          Authorization: `Bearer ${authToken}`, 
          'Content-Type': 'application/json' 
        };
        
        const { data } = await axios.get('https://taskmanagementapp-hqnr.onrender.com/api/boards', { headers });
        setBoards(data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBoards();
  }, []);

  const handleCreateBoard = async (e) => {
    e.preventDefault();
    try {
      const authToken = localStorage.getItem("authToken"); 
      const headers = {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json' 
      };
      
      const { data } = await axios.post('https://taskmanagementapp-hqnr.onrender.com/api/boards', { name: boardName }, { headers });
      setBoards([...boards, data]);
      setBoardName('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelectBoard = async (boardId) => {
    setSelectedBoard(boardId);
    try {
      const authToken = localStorage.getItem("authToken");
      const headers = {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      };
      const { data } = await axios.get(`https://taskmanagementapp-hqnr.onrender.com/api/tasks/${boardId}`, { headers });
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const authToken = localStorage.getItem("authToken"); 
      const headers = {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json' 
      };
      const { data } = await axios.post("https://taskmanagementapp-hqnr.onrender.com/api/tasks", {
        title: taskTitle,
        boardId: selectedBoard,
      }, { headers });
      setTasks([...tasks, data]);
      setTaskTitle('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const authToken = localStorage.getItem("authToken");
      const headers = {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      };
      await axios.delete(`https://taskmanagementapp-hqnr.onrender.com/api/tasks/${taskId}`, { headers });
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="container mt-5">
      <div className="mb-4 d-flex gap-2"><h2 link="/"  className="mb-4 ">Dashboard</h2><Link to="/"><h2>Home page</h2></Link></div>
      <div className='d-flex justify-content-between flex-wrap flex-sm-nowrap'>
        <div className="mb-4">
          <h3>Create Board</h3>
          <form onSubmit={handleCreateBoard}>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                value={boardName}
                onChange={(e) => setBoardName(e.target.value)}
                placeholder="Board Name"
              />
              <button type="submit" className="btn btn-primary">Create Board</button>
            </div>
          </form>
        </div>
        <div className="mb-4">
          <h3>Your Boards</h3>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <ul className="list-group">
              {boards.map((board) => (
                <li
                  key={board._id}
                  className="list-group-item cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSelectBoard(board._id)}
                >
                  {board.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        {selectedBoard && (
          <div>
            <h3>Create Task</h3>
            <form onSubmit={handleCreateTask}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  placeholder="Task Title"
                />
                <button type="submit" className="btn btn-primary">Create Task</button>
              </div>
            </form>
            <h3>Tasks</h3>
            <ul className="list-group">
              {tasks.map((task) => (
                <li key={task._id} className="list-group-item d-flex justify-content-between align-items-center">
                  {task.title}
                  <button className="btn btn-danger" onClick={() => handleDeleteTask(task._id)}>Delete</button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
