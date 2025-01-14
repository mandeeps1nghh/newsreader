
# **Task Manager & News Finder**

A full-stack web application that combines a Task Management system with a News Search feature. Built with React for the frontend and Flask for the backend, this application enables users to manage tasks effectively and stay updated with the latest news.

## **Features**

### Task Manager
- Add, edit, and delete tasks.
- Set and manage due dates for tasks.
- Real-time updates for seamless interaction.
- Responsive and user-friendly task list interface.

### News Finder
- Search for news articles by topic.
- Apply time-based filters:
  - Anytime
  - Yesterday
  - Last Week
  - Two Weeks
- View article images, summaries, and links to the original sources.

---

## **Technologies Used**

### **Frontend**
- React
- CSS3 with Flexbox
- Responsive Design

### **Backend**
- Flask
- Flask-CORS
- News API ([newsapi.org](https://newsapi.org))

---

## **Prerequisites**

- **Node.js**: v14 or higher
- **Python**: 3.7+
- **News API Key**: Obtain one from [newsapi.org](https://newsapi.org).

---

## **Installation**

1. **Clone the Repository**
   ```bash
   git clone <your-repository-url>
   cd <project-directory>
   ```

2. **Set Up Frontend**
   ```bash
   npm install
   ```

3. **Set Up Backend**
   - Navigate to the backend folder:
     ```bash
     cd backend
     ```
   - Install Python dependencies:
     ```bash
     pip install flask flask-cors newsapi-python
     ```
   - Add your News API key:
     - Open `app.py`.
     - Replace `<your-api-key>` with your actual News API key.

4. **Run the Backend**
   ```bash
   python app.py
   ```

5. **Run the Frontend**
   - Return to the main project directory:
     ```bash
     cd ..
     ```
   - Start the React development server:
     ```bash
     npm start
     ```

---

## **Project Structure**

```
├── src/
│   ├── App.js           # Main React component
│   ├── App.css          # Styles
│   └── ...
├── backend/
│   └── app.py           # Flask backend server
├── README.md            # Project documentation
```

---

## **API Documentation**

### **Endpoints**
1. **Task Manager API** (if applicable):
   - `/api/tasks`: Manage tasks (GET, POST, DELETE).
2. **News Finder API**:
   - `/api/news`: Fetch news articles based on topic and date filter.

---

## **Contributing**

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

---

## **Screenshots**

- Include screenshots of your application here:
  - Task Manager Interface
  - News Finder Interface

---

## **Acknowledgments**
- News API for providing the news data.
