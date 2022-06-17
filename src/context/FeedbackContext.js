import { createContext, useState, useEffect } from 'react';

const FeedbackContext = createContext({});

const BACKEND_URL = '/feedback';

export const FeedbackProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState([]);
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  const fetchData = async () => {
    try {
      const query = '?_sort=id&_order=desc';
      const res = await fetch(BACKEND_URL + query);
      const data = await res.json();

      setFeedback(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Add feedback
  const addFeedback = async (newFeedback) => {
    try {
      const res = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(newFeedback),
      });

      if (res.status !== 201) return;

      const data = await res.json();
      setFeedback([data, ...feedback]);
    } catch (err) {
      console.error(err);
    }
  };

  // Delete feedback
  const deleteFeedback = async (id) => {
    if (!window.confirm('Are you sure you want to delete?')) return;
    try {
      const { status } = await fetch(BACKEND_URL + `/${id}`, {
        method: 'DELETE',
      });
      if (status !== 200) return;
      setFeedback(feedback.filter((feedback) => feedback.id !== id));
    } catch (err) {
      console.error(err);
    } finally {
      fetchData();
    }
  };

  // Update feedback item
  const updateFeedback = async (id, updItem) => {
    try {
      const res = await fetch(`${BACKEND_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updItem),
      });
      if (res.status !== 200) return;
      const data = await res.json();

      setFeedback(
        feedback.map((item) => (item.id === id ? { ...item, ...data } : item))
      );
      setFeedbackEdit({ item: {}, edit: false });
    } catch (err) {
      console.error(err);
    }
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
    loading,
  };

  const providerProps = { value: providerValue, children };

  return <FeedbackContext.Provider {...providerProps} />;
};

export default FeedbackContext;
