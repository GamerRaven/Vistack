import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [error, setError] = useState("");
  const fileInputRef = useRef();
  const navigate = useNavigate();

  const isImageFile = (file) => file.type.startsWith("image/");

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    const validFiles = droppedFiles.filter(isImageFile).slice(0, 6 - files.length);

    if (validFiles.length < droppedFiles.length) {
      setError("Only image files are allowed.");
    } else {
      setError("");
    }

    setFiles(prev => [...prev, ...validFiles]);
    setPreviews(prev => [...prev, ...validFiles.map(file => URL.createObjectURL(file))]);
  };

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    const validFiles = selected.filter(isImageFile).slice(0, 6 - files.length);

    if (validFiles.length < selected.length) {
      setError("Only image files are allowed.");
    } else {
      setError("");
    }

    setFiles(prev => [...prev, ...validFiles]);
    setPreviews(prev => [...prev, ...validFiles.map(file => URL.createObjectURL(file))]);
  };

  const handleRemove = (index) => {
    setFiles(files.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    files.forEach(file => formData.append('images', file));

    const res = await fetch('/api/generate', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    navigate('/result', { state: { imageUrl: data.imageUrl } });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-2">Create Your Story</h2>
        <p className="text-gray-500 mb-6 text-center max-w-md">Upload 2–6 images. We'll generate a stunning layout for your Instagram story.</p>

        {error && (
          <div className="mb-4 px-4 py-2 bg-red-100 text-red-600 rounded border border-red-300">
            {error}
          </div>
        )}

        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="w-full max-w-2xl min-h-[250px] bg-white border-2 border-dashed border-gray-300 rounded-xl p-4 flex flex-wrap items-center justify-center gap-4"
        >
          {previews.map((url, i) => (
            <div key={i} className="relative group">
              <img
                src={url}
                alt={`preview-${i}`}
                className="w-28 h-40 object-cover rounded shadow"
              />
              <button
                onClick={() => handleRemove(i)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
              >
                ×
              </button>
            </div>
          ))}

          {files.length < 6 && (
            <div
              onClick={() => fileInputRef.current.click()}
              className="w-28 h-40 flex items-center justify-center bg-gray-100 rounded border border-gray-300 cursor-pointer text-2xl text-gray-400 hover:bg-gray-200"
            >
              +
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            multiple
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={files.length < 2}
          className="mt-6 bg-violet-600 text-white px-6 py-2 rounded-lg shadow hover:bg-violet-700 transition disabled:opacity-40"
        >
          Generate Story
        </button>
      </main>
    </div>
  );
}