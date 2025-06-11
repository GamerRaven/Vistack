import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ResultPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state?.previews || !state?.layoutData) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <h1 className="text-3xl font-bold text-violet-600 mb-4">Your Story Layout</h1>
        <p className="text-gray-400">No image found. Please return to upload.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-6 text-sm text-violet-500 underline hover:text-violet-700"
        >
          Create Another
        </button>
      </div>
    );
  }

  console.log("Received layoutData:", state.layoutData);

  const layout = state.layoutData;

  console.log("Preview count:", state.previews?.length);
  console.log("Layout count:", layout?.length);
  console.log("Layout data:", layout);


  if (!layout) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <h1 className="text-3xl font-bold text-violet-600 mb-4">Your Story Layout</h1>
        <p className="text-red-500">Layout data is invalid.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-6 text-sm text-violet-500 underline hover:text-violet-700"
        >
          Create Another
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold text-violet-600 mb-4">Your Story Layout</h1>
      <div className="relative w-[270px] h-[480px] border rounded shadow bg-white overflow-hidden">
        {state.previews.map((url, i) => {
          const box = layout[i];
          if (!box) return null;
          return (
            <img
              key={i}
              src={url}
              alt={`img-${i}`}
              className="absolute rounded object-cover"
              style={{
                left: `${(box.x / 1080) * 100}%`,
                top: `${(box.y / 1920) * 100}%`,
                width: `${(box.width / 1080) * 100}%`,
                height: `${(box.height / 1920) * 100}%`,
              }}
            />
          );
        })}
      </div>
      <button
        onClick={() => navigate('/')}
        className="mt-6 text-sm text-violet-500 underline hover:text-violet-700"
      >
        Create Another
      </button>
    </div>
  );
}