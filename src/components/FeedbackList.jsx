import { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FeedbackItem } from '.';
import { FeedbackContext } from '../context';
import { Spinner } from './shared';

const FeedbackList = () => {
  const { feedback, loading } = useContext(FeedbackContext);

  if (!loading && (!feedback || feedback.length < 1))
    return <p>No feedback yet</p>;

  return loading ? (
    <Spinner />
  ) : (
    <div className='feedback-list'>
      <AnimatePresence>
        {feedback.map((item) => {
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <FeedbackItem key={item.id} item={item} />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default FeedbackList;
