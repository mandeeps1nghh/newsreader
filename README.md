# News Pulse

A modern, responsive news aggregator that delivers real-time news from around the world. Built with React and Flask, featuring a beautiful, user-friendly interface with a clean design.

## 🌟 Features

- **Real-time News Search**: Find the latest news on any topic
- **Smart Date Filtering**: Filter news by different time periods:
  - Anytime
  - Yesterday
  - Last Week
  - Two Weeks
- **Modern UI/UX**:
  - Clean, minimalist design
  - Responsive 2x2 grid layout
  - Beautiful gradient effects
  - Smooth animations and transitions
  - Mobile-friendly interface
- **Rich Content Display**:
  - High-quality article images
  - Concise article descriptions
  - Direct links to full articles
  - Publication dates with visual indicators

## 🛠️ Technologies Used

### Frontend
- React.js
- Modern CSS with CSS Variables
- Responsive Grid Layout
- Flexbox for component alignment
- CSS Animations and Transitions

### Backend
- Flask
- News API Integration
- Flask-CORS for API handling
- Newspaper3k for article processing

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Python 3.7+
- News API Key (from [newsapi.org](https://newsapi.org))

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/news-pulse.git
   cd news-pulse
   ```

2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

4. Set up your News API key:
   - Sign up at [newsapi.org](https://newsapi.org)
   - Get your API key
   - Update the `NEWS_API_KEY` in `backend/app.py`

### Running the Application

1. Start the backend server:
   ```bash
   cd backend
   python app.py
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

## 🎨 Design Features

- **Color Scheme**: Modern purple gradient with light, clean backgrounds
- **Typography**: Inter font family for optimal readability
- **Layout**: Responsive grid system that adapts to screen size
- **Components**: 
  - Elegant cards with hover effects
  - Smooth transitions and animations
  - Custom-styled form elements
  - Beautiful loading states and error messages

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:
- Desktop computers
- Tablets
- Mobile phones

## 🔒 Security

- API keys are stored securely
- CORS enabled for secure API communication
- HTTPS support for production deployment


## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
