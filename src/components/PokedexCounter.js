import { useSelector } from 'react-redux';
import styles from '@styles/PokedexCounter.module.css';

const PokedexCounter = () => {
  const total = useSelector((state) => state.total);

  return <div className={styles.counter}>{total}</div>;
};

export default PokedexCounter;
