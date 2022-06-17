import { v4 as uuidv4 } from 'uuid';
import { createContext, useState } from 'react';
import { FeedbackData } from '../data';

const FeedbackContext = createContext({});

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState(FeedbackData);
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  // Add feedback
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback]);
  };

  // Delete feedback
  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  // Update feedback item
  const updateFeedback = (id, updItem) => {
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item))
    );
    setFeedbackEdit({ item: {}, edit: false });
  };

  // Set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };

  const providerValue = {
    feedback,
    feedbackEdit,
    addFeedback,
    deleteFeedback,
    editFeedback,
    updateFeedback,
  };

  const providerProps = { value: providerValue, children };

  return <FeedbackContext.Provider {...providerProps} />;
};

export default FeedbackContext;
