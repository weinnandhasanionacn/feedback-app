import { useContext, useState, useEffect } from 'react';
import { FeedbackContext } from '../context';

const RatingSelect = ({ select }) => {
  const { feedbackEdit } = useContext(FeedbackContext);

  const [selected, setSelected] = useState(10);

  useEffect(() => {
    setSelected(feedbackEdit.item.rating);
  }, [feedbackEdit]);

  const handleChange = (e) => {
    setSelected(+e.currentTarget.value);
    select(+e.currentTarget.value);
  };

  return (
    <ul className='rating'>
      {Array(10)
        .fill('rating')
        .map((_, index) => (
          <li key={index}>
            <input
              type='radio'
              name='rating'
              id={`num${index + 1}`}
              value={(index + 1).toString()}
              onChange={handleChange}
              checked={selected === index + 1}
            />
            <label htmlFor={`num${index + 1}`}>{index + 1}</label>
          </li>
        ))}
    </ul>
  );
};

export default RatingSelect;
