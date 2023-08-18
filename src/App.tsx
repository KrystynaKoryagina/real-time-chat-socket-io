import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './components/Login';
import { Chat } from 'components/Chat';

export const App = () => {
  return (
    <div className="flex h-screen flex-col justify-center px-6 py-12 lg:px-8">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
  );
};
