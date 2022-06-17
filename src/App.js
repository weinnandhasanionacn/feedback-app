import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  FeedbackList,
  Header,
  FeedbackStats,
  FeedbackForm,
  AboutIconLink,
} from './components';
import { AboutPage } from './pages';
import { FeedbackProvider } from './context';

const App = () => {
  return (
    <FeedbackProvider>
      <Router>
        <Header />
        <div className='container'>
          <Routes>
            <Route
              exact
              path='/'
              element={
                <>
                  <FeedbackForm />
                  <FeedbackStats />
                  <FeedbackList />
                </>
              }
            />

            <Route path='/about' element={<AboutPage />} />
          </Routes>

          <AboutIconLink />
        </div>
      </Router>
    </FeedbackProvider>
  );
};

export default App;
