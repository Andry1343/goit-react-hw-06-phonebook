import { useDispatch } from 'react-redux';
import { setFilter } from 'components/redux/filterSlice';
import { nanoid } from 'nanoid';
import style from '../filter/Filter.module.css';

export const Filter = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <p className={style.filter_text}>Find contacts by name</p>
      <input
        type="text"
        onChange={e => dispatch(setFilter(e.currentTarget.value))}
        id={nanoid()}
      />
    </div>
  );
};
