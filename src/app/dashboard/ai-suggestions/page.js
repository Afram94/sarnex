'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AiSuggestionsPage() {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSuggestions = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/ai-suggestions`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer YOUR_SANCTUM_TOKEN_HERE`,
        },
      });
      setSuggestions(res.data.suggestions || []);
    } catch (error) {
      console.error('Failed to fetch suggestions:', error);
    }
    setLoading(false);
  };

  const handleAction = async (id, action, pageType) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/ai-suggestions/${id}/${action}`, null, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer YOUR_SANCTUM_TOKEN_HERE`,
        },
      });

      setSuggestions((prev) =>
        prev.map((s) => {
          if (action === 'apply' || action === 'accept') {
            return s.page_type === pageType
              ? { ...s, status: s.id === id ? 'applied' : 'ignored' }
              : s;
          }
          if (action === 'reject' && s.id === id) {
            return { ...s, status: 'ignored' };
          }
          return s;
        })
      );
    } catch (error) {
      console.error(`Failed to ${action} suggestion:`, error);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto font-sans text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-indigo-800 dark:text-indigo-300 animate-fade-in">
        ✨ AI Suggestions
      </h1>

      <div className="relative mb-10 rounded-xl overflow-hidden bg-white/10 dark:bg-white/5 backdrop-blur border border-white/20 shadow-xl animate-fade-in-up">
        <div className="absolute -inset-0.5 bg-gradient-to-br from-indigo-500/30 via-purple-500/30 to-pink-500/20 blur-lg opacity-60 animate-pulse z-0"></div>
        <div className="relative z-10 p-6">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xl shadow-lg">
              ⚡
            </div>
            <div>
              <p className="text-sm uppercase tracking-wide text-indigo-400 font-semibold">AI Insight Engine</p>
              <p className="text-md text-indigo-900 dark:text-indigo-200">Activating strategic content intelligence...</p>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 animate-pulse text-indigo-600 dark:text-indigo-300 text-lg font-semibold">
          🤖 Generating brilliance...
        </div>
      ) : (
        suggestions.map((s, idx) => {
          let parsed = {};
          try {
            parsed = JSON.parse(s.suggested_text);
          } catch (e) {
            console.warn('Invalid JSON in suggested_text', e);
          }

          return (
            <div
              key={s.id}
              className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 mb-12 shadow-lg bg-white dark:bg-gray-900 animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.1}s`, animationFillMode: 'both' }}
            >
              <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-300 mb-4">
                📄 Page: {s.page_type}
              </h2>

              {/* Original */}
              <div className="mb-6">
                <h3 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-2">Original:</h3>
                <div className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm p-4 rounded-md font-mono whitespace-pre-wrap overflow-x-auto border border-gray-300 dark:border-gray-600 shadow-sm">
                  {(() => {
                    let original = {};
                    try {
                      original = JSON.parse(s.original_text);
                    } catch {
                      return <div>{s.original_text}</div>;
                    }

                    return (
                      <div className="space-y-4">
                        {original.headline && <h3 className="text-xl font-bold text-brand-green dark:text-green-300">{original.headline}</h3>}
                        {original.intro && <p>{original.intro}</p>}
                        {original.quote && <blockquote className="border-l-4 border-brand-green dark:border-green-400 pl-4 italic">{original.quote}</blockquote>}
                        {original.sections?.map((section, i) => (
                          <div key={i}>
                            <h4 className="text-md font-semibold">{section.title}</h4>
                            <p>{section.body}</p>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* Suggested */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-green-700 dark:text-green-400 mb-2">💡 AI's Refined Version:</h3>
                <div className="space-y-4 text-green-900 dark:text-green-100">
                  {parsed.headline && <h3 className="text-xl font-bold">{parsed.headline}</h3>}
                  {parsed.intro && <p>{parsed.intro}</p>}
                  {parsed.quote && <blockquote className="border-l-4 border-green-400 pl-4 italic">{parsed.quote}</blockquote>}
                  {parsed.sections?.map((section, i) => (
                    <div key={i}>
                      <h4 className="text-md font-semibold">{section.title}</h4>
                      <p>{section.body}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Explanation */}
              <div className="mb-6">
                <p className="text-blue-800 dark:text-blue-300 font-semibold mb-1 text-md">🧠 My Creative Rationale:</p>
                <p className="italic text-blue-700 dark:text-blue-200">{s.explanation}</p>
              </div>

              {/* Buttons & Status */}
              <div className="flex space-x-4 mt-4 items-center">
                {s.status !== 'applied' && (
                  <button
                    onClick={() => handleAction(s.id, 'apply', s.page_type)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform font-medium shadow"
                  >
                    🔄 Apply this version
                  </button>
                )}

                {s.status === 'applied' && (
                  <span className="px-3 py-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 rounded font-semibold shadow">
                    ✅ In Use
                  </span>
                )}

                {s.status === 'new' && (
                  <>
                    <button
                      onClick={() => handleAction(s.id, 'accept', s.page_type)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform font-medium shadow"
                    >
                      ✅ Accept
                    </button>
                    <button
                      onClick={() => handleAction(s.id, 'reject', s.page_type)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform font-medium shadow"
                    >
                      ❌ Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
