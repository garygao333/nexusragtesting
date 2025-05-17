import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function SourceView() {
  const { filename } = useParams();
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const path = `/dataset/${filename}`;
    console.log(`Fetching: ${path}`);

    fetch(path)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      })
      .then(setContent)
      .catch((err) => {
        console.error(err);
        setError(`Failed to load ${filename}`);
      });
  }, [filename]);

  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{filename}</h1>
      <div className="prose">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}
