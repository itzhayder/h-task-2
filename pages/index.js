import { useEffect, useState, useContext } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import SelectInput from '../components/SelectInput/SelectInput';
import WeatherDetails from '../components/WeatherDetails/WeatherDetails';
import styles from '../styles/Home.module.css';
import Card from '../components/Card/Card';
import cities from '../mock-data/cities';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


export default function Home(props) {
  const [data, setData] = useState(props.data);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/61c7f70822e612a390695ff5e6d891cf/${selectedCity.lat},${selectedCity.lon}?units=si`);
        const data = await result.json();

        setData(data);
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchData();
  }, [selectedCity]);
  
  const selectInputHandler = (value) => {
    const newCity = cities.find(city => city.name === value);
    setSelectedCity(newCity);
  }

  const getDay = (time) => {
    const dayNumber = new Date(time * 1000).getDay();
    return days[dayNumber];
  }

  const calcTemperature = (temp1, temp2) => {
    const temperature = Math.floor((temp1 + temp2) / 2);
    return temperature;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Weather App - Next.js</title>
        {/* TODO - change the icon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <SelectInput selectInputHandler={selectInputHandler} />
        
        {router.pathname === '/' && <WeatherDetails data={data.daily.data[selectedDay]} city={selectedCity.name} />}

        <h1 className={styles.headerText}>Next 7 Days Forecast</h1>
        <div className={styles.card_container}>
          {data.daily.data.map((data, index) => <Card key={index} day={getDay(data.time)} selectedDay={index} temperature={calcTemperature(data.temperatureHigh, data.temperatureLow)} icon={data.icon} data={data} city={selectedCity.name} />)}
        </div>
      </main>
    </div>
  )
}

export async function getServerSideProps() {
  const result = await fetch('https://api.darksky.net/forecast/61c7f70822e612a390695ff5e6d891cf/23.8103,90.4125?units=si');
  const data = await result.json();
  data.daily.data.shift();

  if (!data) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      data
    }
  }
}
