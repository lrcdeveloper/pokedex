import { useSelector } from 'react-redux';

const PokedexCounter = () => {
  const total = useSelector((state) => state.total);

  return <div>{total}</div>;
};

export default PokedexCounter;
