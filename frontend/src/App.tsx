import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Room from './pages/MeetingRoom/index';
import GoodBye from './pages/GoodBye/index';
import './index.css';
import WaitingRoom from './pages/WaitingRoom';
import UserProvider from './Context/user';
import SessionProvider from './Context/SessionProvider/session';
import { PreviewPublisherProvider } from './Context/PreviewPublisherProvider';
import LandingPage from './pages/LandingPage';
import { PublisherProvider } from './Context/PublisherProvider';
import RedirectToWaitingRoom from './components/RedirectToWaitingRoom';

const App = () => {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route
            path="/waiting-room/:roomName"
            element={
              <PreviewPublisherProvider>
                <WaitingRoom />
              </PreviewPublisherProvider>
            }
          />
          <Route
            path="/room/:roomName"
            element={
              <SessionProvider>
                <RedirectToWaitingRoom>
                  <PublisherProvider>
                    <Room />
                  </PublisherProvider>
                </RedirectToWaitingRoom>
              </SessionProvider>
            }
          />
          <Route path="/goodbye" element={<GoodBye />} />
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </UserProvider>
    </Router>
  );
};

export default App;
