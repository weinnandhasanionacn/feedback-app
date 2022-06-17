import { useContext, useEffect, useState } from 'react';
import { FeedbackContext } from '../context';
import RatingSelect from './RatingSelect';
import { Button, Card } from './shared';

const FeedbackForm = () => {
  const { feedbackEdit, addFeedback, updateFeedback } =
    useContext(FeedbackContext);

  const [text, setText] = useState('');
  const [rating, setRating] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (feedbackEdit.edit === true) {
      setText(feedbackEdit.item.text);
      setRating(feedbackEdit.item.rating);
    }
  }, [feedbackEdit]);

  const handleTextChange = (e) => {
    if (e.target.value === '') {
      setMessage(null);
    } else if (e.target.value !== '' && e.target.value.trim().length < 10) {
      setMessage('Text must be at least 10 characters');
    } else {
      setMessage(null);
    }

    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text.trim().length < 10) return;

    const newFeedback = { text, rating };

    if (feedbackEdit.edit) {
      updateFeedback(feedbackEdit.item.id, newFeedback);
    } else {
      addFeedback(newFeedback);
    }

    setText('');
    setRating(null);
  };

  const disableBtn = text === '' || text.trim().length < 10 || rating === null;

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect select={(rating) => setRating(rating)} />
        <div className='input-group'>
          <input
            type='text'
            placeholder='Write a review'
            value={text}
            onChange={handleTextChange}
          />
          <Button type='submit' disabled={disableBtn}>
            Send
          </Button>
        </div>

        {message && <p>{message}</p>}
      </form>
    </Card>
  );
};

export default FeedbackForm;
