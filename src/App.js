import React, { useState } from 'react';
import './App.css';

// Add environment variable for API URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const App = () => {
  const [newsQuery, setNewsQuery] = useState('');
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dateFilter, setDateFilter] = useState('anytime');

  const searchNews = async () => {
    if (!newsQuery.trim()) {
      alert('Please enter a search term');
      return;
    }

    setIsLoading(true);
    setError(null);
    setNews([]); // Clear previous results

    try {
      console.log('Fetching news...'); // Debug log
      const response = await fetch(
        `${API_URL}/api/news?q=${encodeURIComponent(newsQuery)}&dateFilter=${dateFilter}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Received data:', data); // Debug log
      
      if (data.articles && Array.isArray(data.articles)) {
        setNews(data.articles);
      } else {
        throw new Error('Invalid data format received');
      }
    } catch (err) {
      console.error('Search error:', err); // Debug log
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="section news-finder">
        <div className="container">
          <div className="header-section">
            <h1 className="header">News Pulse</h1>
            <p className="header-description">Stay informed with real-time news from around the world</p>
          </div>
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

          {isLoading && (
            <div className="loading-message">
              Searching for news... Please wait.
            </div>
          )}

          {error && (
            <div className="error-message">
              Error: {error}
            </div>
          )}

          {!isLoading && !error && news.length === 0 && (
            <div className="no-results">
              No news articles found. Try a different search term.
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
