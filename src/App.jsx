import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ConvertPage from './pages/ConvertPage';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafb]">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/word-to-pdf" element={<ConvertPage type="word-to-pdf" />} />
          <Route path="/pdf-to-word" element={<ConvertPage type="pdf-to-word" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
