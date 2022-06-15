import { Link } from 'react-router-dom';
import { Card } from '../components/shared';

const AboutPage = () => {
  return (
    <Card>
      <div className='about'>
        <h1>About This Project</h1>
        <p>This is a React app to leave feedback for a product or service</p>
        <p>Version: 1.0.0</p>

        <p>
          <Link to={{ pathname: '/' }}>Back to Homepage</Link>
        </p>
      </div>
    </Card>
  );
};

export default AboutPage;
