import React, {useState, useEffect} from 'react';
import './News.css'

// API keys normally would be stored in .env variables on server
const NEWS_API_KEY = '4ee18cbebdb34b30ab8af59febc9160c';
const url = `https://newsapi.org/v2/top-headlines?sources=bbc-news&pageSize=10&apiKey=${NEWS_API_KEY}`;

const NewsWidget = ()=> {
    const [data, setData] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        fetch(url)
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to fetch news');
            }
            return res.json();
        })
        .then(result => {
            if (result.status === 'error') {
                throw new Error(result.message || 'News API error');
            }
            setData(result);
            setError('');
        })
        .catch(err => {
            console.log(err);
            setError('Unable to load news. Please try again later.');
        })
        .finally(() => {
            setLoading(false);
        });
    }, []);

    if (loading) return <div className='loader'></div>;

    if (error) {
        return (
            <div className='news-widget'>
                <h1>Latest News</h1>
                <div className="error">{error}</div>
            </div>
        );
    }

    if (!data || !data.articles || data.articles.length === 0) {
        return (
            <div className='news-widget'>
                <h1>Latest News</h1>
                <div className="error">No news articles available</div>
            </div>
        );
    }

    return (
        <div className='news-widget'>
            <h1>Latest News</h1>
            {data.articles.slice(0, 10).map((item, i) => {
                if (!item.title || !item.url) return null;
                
                return (
                    <a href={item.url} key={i} target="_blank" rel="noopener noreferrer">
                        {item.urlToImage && (
                            <img 
                                src={item.urlToImage} 
                                alt={item.title}
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                        )}
                        <h2 className='article'>{item.title}</h2>
                    </a>
                )
            })}
        </div>
    )
}

export default NewsWidget;