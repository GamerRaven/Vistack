import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ResultPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold text-violet-600 mb-4">Your Story Layout</h1>

      {state?.imageUrl ? (
        <>
          <img src={state.imageUrl} alt="Generated Story" className="max-w-sm w-full rounded-lg shadow-lg border border-gray-200" />
          <a
            href={state.imageUrl}
            download="story.png"
            className="mt-4 inline-block bg-violet-600 text-white px-4 py-2 rounded-lg shadow hover:bg-violet-700"
          >
            Download Story
          </a>
        </>
      ) : (
        <p className="text-gray-400">No image found. Please return to upload.</p>
      )}

      <button
        onClick={() => navigate('/')}
        className="mt-6 text-sm text-violet-500 underline hover:text-violet-700"
      >
        Create Another
      </button>
    </div>
  );
}