from flask import Flask, request, jsonify
from flask_cors import CORS
from newsapi.newsapi_client import NewsApiClient
from newspaper import Article
from datetime import datetime, timedelta
import os

app = Flask(__name__)
CORS(app)  # This allows our React frontend to make requests to our Flask backend

# You'll need to sign up for a free API key at https://newsapi.org
NEWS_API_KEY = ''
newsapi = NewsApiClient(api_key=NEWS_API_KEY)

@app.route('/api/news', methods=['GET'])
def get_news():
    try:
        query = request.args.get('q', '')
        date_filter = request.args.get('dateFilter', 'anytime')
        
        if not query:
            return jsonify({'error': 'Query parameter is required'}), 400

        print(f"Searching for: {query} with filter: {date_filter}")  # Debug log

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
            print("Fetching news from API...")  # Debug log
            response = newsapi.get_everything(
                q=query,
                from_param=start_date.strftime('%Y-%m-%d'),
                to=end_date.strftime('%Y-%m-%d'),
                language='en',
                sort_by='relevancy'
            )
            
            print(f"Found {len(response['articles'])} articles")  # Debug log
            
            # Process only first 10 articles for faster response
            for article in response['articles'][:10]:
                try:
                    print(f"Processing article: {article['title']}")  # Debug log
                    news_article = Article(article['url'])
                    news_article.download()
                    news_article.parse()
                    news_article.nlp()
                    article['summary'] = news_article.summary
                except Exception as e:
                    print(f"Error processing article: {str(e)}")  # Debug log
                    article['summary'] = "Summary not available"

            return jsonify(response)
        
        except Exception as e:
            print(f"Error in news API: {str(e)}")  # Debug log
            return jsonify({'error': f'News API error: {str(e)}'}), 500

    except Exception as e:
        print(f"General error: {str(e)}")  # Debug log
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.getenv('PORT', 8080))
    app.run(host='0.0.0.0', port=port) 
