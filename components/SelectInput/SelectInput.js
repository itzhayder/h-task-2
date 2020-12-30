import { useRef } from 'react';
import styles from './SelectInput.module.css';
import cities from '../../mock-data/cities';

const SelectInput = ({selectInputHandler}) => {
  const inputRef = useRef('');

  const submitHandler = (e) => {
    e.preventDefault();
    selectInputHandler(inputRef.current.value);
  }

  return (
    <>
      <form onSubmit={submitHandler}>
        <select ref={inputRef}>
          <option disabled selected value> -- select an option -- </option>
          {cities.map(city => <option value={city.name}>{city.name}</option>)}
        </select>
        <button type="submit">Go</button>
      </form>
    </>
  )
}

export default SelectInput
