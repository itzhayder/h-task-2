import { useContext } from 'react'
import { useRouter } from 'next/router';
import WeatherDetails from '../../components/WeatherDetails/WeatherDetails';


const index = () => {
  const router = useRouter();
  const { data, city } = router.query;

  return (
    <>
      <WeatherDetails data={JSON.parse(data)} city={city} />
    </>
  )
}

export default index
