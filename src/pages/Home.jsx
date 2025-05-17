import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

export default function Home() {
  const navigate = useNavigate();

  const handleSearch = (query) => {
    navigate(`/chat?query=${encodeURIComponent(query)}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] space-y-6">
      <img src="/hippra-logo.png" alt="Hippra" className="h-[10rem] w-auto block" />
      <h1 className="text-4xl font-bold">HIPPRA</h1>
      <p className="text-gray-500">The Future of Global Healthcare Collaboration is Here</p>
      <SearchBar onSubmit={handleSearch} />
    </div>
  );
}
