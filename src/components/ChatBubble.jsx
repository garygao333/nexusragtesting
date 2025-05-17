import { Link } from 'react-router-dom';

export default function ChatBubble({ type, text, sources = [] }) {
  const isUser = type === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} w-full`}>
      <div className={`max-w-[70%] p-4 rounded-lg ${isUser ? 'bg-gray-200' : 'bg-gray-100'}`}>
        <p>{text}</p>
        {!isUser && sources.length > 0 && (
          <div className="mt-2 border-t pt-2 text-sm">
            <p className="font-semibold">Sources:</p>
            <ul>
              {sources.map((src, i) => {
                const filename = src.split('/').pop();  // e.g., data.md
                return (
                  <li key={i} className="flex justify-between items-center mt-1">
                    <span className="truncate">{src}</span>
                    <Link to={`/source/${filename}`} className="text-purple-600 underline">
                      View here
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}