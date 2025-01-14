from flask import Flask, request, jsonify
from flask_cors import CORS
from newsapi.newsapi_client import NewsApiClient
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)  # This allows our React frontend to make requests to our Flask backend

# You'll need to sign up for a free API key at https://newsapi.org
NEWS_API_KEY = '85c09931ce8a4795a88a18b0eeec3d4a'
newsapi = NewsApiClient(api_key=NEWS_API_KEY)

@app.route('/api/news', methods=['GET'])
def get_news():
    query = request.args.get('q', '')
    date_filter = request.args.get('dateFilter', 'anytime')
    
    if not query:
        return jsonify({'error': 'Query parameter is required'}), 400

    # Calculate date range based on filter
    end_date = datetime.now()
    
    if date_filter == 'yesterday':
        start_date = end_date - timedelta(days=1)
    elif date_filter == 'lastWeek':
        start_date = end_date - timedelta(days=7)
    elif date_filter == 'twoWeeks':
        start_date = end_date - timedelta(days=14)
    else:  # anytime - use API's maximum allowed range (1 month)
        start_date = end_date - timedelta(days=30)

    try:
        response = newsapi.get_everything(
            q=query,
            from_param=start_date.strftime('%Y-%m-%d'),
            to=end_date.strftime('%Y-%m-%d'),
            language='en',
            sort_by='relevancy'
        )
        
        # For 'yesterday' filter, manually filter results to ensure exact date match
        if date_filter == 'yesterday':
            yesterday = (end_date - timedelta(days=1)).strftime('%Y-%m-%d')
            articles = [
                article for article in response['articles']
                if article['publishedAt'].startswith(yesterday)
            ]
            response['articles'] = articles

        return jsonify(response)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000) 