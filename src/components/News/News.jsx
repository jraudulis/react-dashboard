import React, {useState, useEffect} from 'react';
import './News.css'

// API keys normally would be stored in .env variables on server
const NEWS_API_KEY = '4ee18cbebdb34b30ab8af59febc9160c';
const url = `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${NEWS_API_KEY}`;


function NewsWidget() {
    const [data, setData] = useState(null);

    useEffect(()=> {
        fetch(url)
        .then(res => res.json())
        .then(result => {setData(result)})
        .catch(err => console.log(err));
    }, []);

    if(!data) return <div className='loader'></div>;

        return (
        <div className='wrapper'>
            <h1>Latest News</h1>
            {data.articles.slice(0, 5).map((item, i) =>(
                <a href={item.url} key={i} target="_blank" rel="noopener noreferrer">
                <img src={item.urlToImage} alt={item.title} />
                <h2 className='article'>{item.title}</h2>
                </a>
            ))}
        </div>
    )
}


export default NewsWidget;