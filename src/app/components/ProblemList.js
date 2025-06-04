'use client';

import { useEffect, useState } from 'react';
import api from '../../../lib/axios';
import ProblemForm from './ProblemForm';
import { motion } from 'framer-motion';

export default function ProblemList() {
  const [problems, setProblems] = useState([]);
  const [selected, setSelected] = useState(null);

  const [livePreview, setLivePreview] = useState({
    before: '',
    after: '',
    card_bg_color: null,
    before_text_color: '#fca5a5',
    after_text_color: '#9cc0ab',
    font_family: 'sans-serif',
  });

  const fetchProblems = async () => {
    const res = await api.get('/problems');
    setProblems(res.data);
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Are you sure?')) {
      await api.delete(`/problems/${id}`);
      fetchProblems();
    }
  };

  return (
    <div className="space-y-10">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Form */}
        <ProblemForm
          selected={selected}
          onSave={fetchProblems}
          onCancel={() => setSelected(null)}
          preview={livePreview}
          setPreview={setLivePreview}
        />

        {/* Live Preview */}
        <motion.div
          key="live-preview"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl p-6 shadow-xl border border-white/10 transition-all duration-300 hover:shadow-[#9cc0ab]/20"
          style={{
            background: livePreview.card_bg_color
              ? livePreview.card_bg_color
              : 'linear-gradient(to bottom right, #18181b, #1f1f1f)',
            fontFamily: livePreview.font_family || 'sans-serif',
          }}
        >
          <p className="text-xs uppercase tracking-widest mb-1 opacity-60">Before</p>
          <p
            className="text-sm italic leading-relaxed"
            style={{ color: livePreview.before_text_color || '#fca5a5' }}
          >
            {livePreview.before || '...'}
          </p>

          <p className="mt-4 text-xs uppercase tracking-widest mb-1 opacity-60">After</p>
          <p
            className="text-sm font-semibold leading-relaxed"
            style={{ color: livePreview.after_text_color || '#9cc0ab' }}
          >
            {livePreview.after || '...'}
          </p>
        </motion.div>
      </div>

      {/* List of all cards */}
      <div className="bg-zinc-900 border border-white/10 p-6 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-semibold text-white mb-6">All Cards</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((p, index) => (
            <motion.li
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="rounded-3xl p-6 shadow-xl border border-white/10 transition-all"
              style={{
                background: p.card_bg_color
                  ? p.card_bg_color
                  : 'linear-gradient(to bottom right, #18181b, #1f1f1f)',
                fontFamily: p.font_family || 'sans-serif',
              }}
            >
              <p className="text-xs uppercase tracking-widest mb-1 opacity-60">Before</p>
              <p
                className="text-sm italic leading-relaxed"
                style={{ color: p.before_text_color || '#fca5a5' }}
              >
                {p.before}
              </p>

              <p className="mt-4 text-xs uppercase tracking-widest mb-1 opacity-60">After</p>
              <p
                className="text-sm font-semibold leading-relaxed"
                style={{ color: p.after_text_color || '#9cc0ab' }}
              >
                {p.after}
              </p>

              <div className="mt-6 flex gap-2">
                <button
                  onClick={() => {
                    setSelected(p);
                    setLivePreview(p);
                  }}
                  className="px-4 py-1 rounded bg-yellow-400 hover:bg-yellow-500 text-black text-sm font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="px-4 py-1 rounded bg-red-500 hover:bg-red-600 text-white text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}
