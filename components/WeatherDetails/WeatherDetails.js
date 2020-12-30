import styles from './WeatherDetails.module.css';
import moment from 'moment';
import ReactAnimatedWeather from 'react-animated-weather';

const WeatherDetails = ({ data, city }) => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h4>{city}</h4>
        <p>{moment(data.time * 1000).format('dddd, Do MMMM')}</p>
        <div className={styles.temperature_container}>
          <ReactAnimatedWeather
            icon='CLEAR_DAY'
            color='white'
            size={100}
            animate={true}
          />
          <h2 className="temperature">{Math.floor((data.temperatureHigh + data.temperatureLow) / 2)}&#176;C</h2>
        </div>
      </div>

      <div className={styles.right}>
        <div className='item1'>
          <p>{data.windSpeed.toFixed(2)}</p>
          <p>Wind speed</p>
        </div>
        <div className="item2">
          <p>{Math.floor(data.cloudCover * 100)}%</p>
          <p>Cloud cover</p>
        </div>
        <div className="item3">
          <p>{moment(data.sunriseTime * 1000).format('h:mm a')}</p>
          <p>Sunrise</p>
        </div>
        <div className="item4">
          <p>{Math.floor(data.humidity * 100)}%</p>
          <p>Humidity</p>
        </div>
        <div className="item5">
          <p>{Math.floor(data.precipProbability * 100)}%</p>
          <p>Rain</p>
        </div>
        <div className="item6">
          <p>{moment(data.sunsetTime * 1000).format('h:mm a')}</p>
          <p>Sunset</p>
        </div>
      </div>
    </div>
  )
}

export default WeatherDetails;
