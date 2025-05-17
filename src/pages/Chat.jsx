import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import ChatBubble from '../components/ChatBubble';

export default function Chat() {

    const navigate = useNavigate();
    
    const [searchParams] = useSearchParams();
    const initialQuery = searchParams.get('query') || '';
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    //   useEffect(() => {
    //     if (initialQuery) handleQuery(initialQuery);
    //   }, [initialQuery]);

    useEffect(() => {
        if (initialQuery && messages.length === 0) {
            handleQuery(initialQuery);
        }
    }, [initialQuery, messages.length]);


    const handleQuery = async (question) => {
        setMessages((prev) => [...prev, { type: 'user', text: question }]);
        setLoading(true);

        try {
            const res = await axios.post('http://127.0.0.1:8000/ask', { question });
            const { response: answer, sources } = res.data;

            setMessages((prev) => [...prev, { type: 'bot', text: answer, sources }]);
        } catch (error) {
            console.error(error);
            setMessages((prev) => [...prev, { type: 'bot', text: 'Error fetching response.' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center space-y-4 mt-6">
            <div className="w-full max-w-2xl space-y-4">
                {messages.map((msg, index) => (
                    <ChatBubble key={index} {...msg} />
                ))}
                {loading && <p>Loading...</p>}
            </div>
            {/* <SearchBar onSubmit={handleQuery} /> */}
            <SearchBar onSubmit={(query) => navigate(`/chat?query=${encodeURIComponent(query)}`)} />
        </div>
    );
}
