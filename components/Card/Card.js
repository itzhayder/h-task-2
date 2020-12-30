import { useRouter } from 'next/router';
import ReactAnimatedWeather from 'react-animated-weather';
import styles from './Card.module.css';

const iconNames = ['CLEAR_DAY',
  'CLEAR_NIGHT',
  'PARTLY_CLOUDY_DAY',
  'PARTLY_CLOUDY_NIGHT',
  'CLOUDY',
  'RAIN',
  'SLEET',
  'SNOW',
  'WIND',
  'FOG'];


const Card = ({ temperature, icon, day, selectedDay, data, city }) => {
  const router = useRouter();

  

  let iconIndex = iconNames.findIndex(i => {
    const regex = new RegExp(`${i}`, 'i');
    return icon.match(regex);
  });

  if (iconIndex < 0) {
    iconIndex = 0;
  }

  return (
    <div className={styles.card} onClick={() => router.push({pathname: `/${selectedDay}`,
    query: { data: JSON.stringify(data), city }}, {pathname: `/${selectedDay}`})}>
      <p>{temperature}&#176;C</p>
      <div>
        <ReactAnimatedWeather
          icon={iconNames[iconIndex]}
          color='goldenrod'
          size={40}
          animate={true}
        />
      </div>
      <p>{day}</p>
    </div>
  )
}

export default Card;
