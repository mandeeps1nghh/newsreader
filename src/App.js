import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [task, setTask] = useState('');
  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newsQuery, setNewsQuery] = useState('');
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dateFilter, setDateFilter] = useState('anytime');

  const addTask = () => {
    if (task.trim()) {
      if (editingId !== null) {
        // Update existing task
        setTasks(tasks.map(t => 
          t.id === editingId 
            ? { ...t, text: task, date: date }
            : t
        ));
        setEditingId(null);
      } else {
        // Add new task
        setTasks([...tasks, {
          id: Date.now(),
          text: task,
          date: date
        }]);
      }
      setTask('');
    } else {
      alert('Please enter a task.');
    }
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(t => t.id !== taskId));
  };

  const editTask = (taskId) => {
    const taskToEdit = tasks.find(t => t.id === taskId);
    setTask(taskToEdit.text);
    setDate(taskToEdit.date);
    setEditingId(taskId);
  };

  const searchNews = async () => {
    if (!newsQuery.trim()) {
      alert('Please enter a search term');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:5000/api/news?q=${encodeURIComponent(newsQuery)}&dateFilter=${dateFilter}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch news');
      }

      setNews(data.articles);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="section tasks-manager">
        <div className="container">
          <h1 className="header">Task Manager</h1>
          <input
            className="input"
            type="text"
            placeholder="Enter Task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <input
            type="date"
            className="input"
            value={date.toISOString().split('T')[0]}
            onChange={(e) => setDate(new Date(e.target.value))}
          />
          <div className="button-container">
            <button onClick={addTask}>
              {editingId !== null ? 'Update Task' : 'Add Task'}
            </button>
          </div>

          <div className="tasks-section">
            <h2>Tasks</h2>
            {tasks.map(task => (
              <div key={task.id} className="task-item">
                <div className="task-content">
                  <span>{task.text}</span>
                  <span className="task-date">
                    {task.date.toDateString()}
                  </span>
                </div>
                <div className="task-actions">
                  <button 
                    className="action-button edit"
                    onClick={() => editTask(task.id)}
                  >
                    Edit
                  </button>
                  <button 
                    className="action-button delete"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="section news-finder">
        <div className="container">
          <h1 className="header">Find News</h1>
          <input
            className="input"
            type="text"
            placeholder="Enter news topic..."
            value={newsQuery}
            onChange={(e) => setNewsQuery(e.target.value)}
          />
          <div className="date-filter">
            <select 
              value={dateFilter} 
              onChange={(e) => setDateFilter(e.target.value)}
              className="date-select"
            >
              <option value="anytime">Anytime</option>
              <option value="yesterday">Yesterday</option>
              <option value="lastWeek">Last Week</option>
              <option value="twoWeeks">Two Weeks</option>
            </select>
          </div>
          <div className="button-container">
            <button 
              onClick={searchNews}
              disabled={isLoading}
            >
              {isLoading ? 'Searching...' : 'Search News'}
            </button>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="news-section">
            {news.map((article, index) => (
              <div key={index} className="news-item">
                {article.urlToImage && (
                  <img 
                    src={article.urlToImage} 
                    alt={article.title} 
                    className="news-image"
                  />
                )}
                <div className="news-content">
                  <h3>{article.title}</h3>
                  <p className="news-date">{new Date(article.publishedAt).toLocaleDateString()}</p>
                  <p>{article.description}</p>
                  <a 
                    href={article.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="read-more"
                  >
                    Read More
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;