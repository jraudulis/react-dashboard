
import './App.css'
import NewsWidget from './components/News/News.jsx';
import ToDoWidget from './components/ToDo/ToDo.jsx';
import TimerWidget from './components/Timer/Timer.jsx';
import WeatherWidget from './components/Weather/Weather.jsx';

function App() {

  return (
    <>
      <WeatherWidget />
      <TimerWidget />
      <ToDoWidget />
      <NewsWidget />
    </>
  )
}

export default App
