import React, { useState } from 'react';

interface RecommendationFormProps {
  onSubmit: (data: { symptoms: string }) => void;
  loading?: boolean;
}

const exampleQuestions = [
  "How can I improve my sleep quality?",
  "What are some healthy snack options for weight loss?",
  "How do I stay motivated to exercise regularly?",
  "What should I eat before and after workouts?",
  "How can I manage stress better?"
];

const RecommendationForm: React.FC<RecommendationFormProps> = ({ onSubmit, loading }) => {
  const [question, setQuestion] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) onSubmit({ symptoms: question });
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: 12, padding: 32, boxShadow: '0 2px 8px #e0e0e0', maxWidth: 700, margin: '0 auto' }}>
      <h2 style={{ fontWeight: 700, fontSize: 22, marginBottom: 4 }}>Get Health Recommendations</h2>
      <p style={{ color: '#666', fontSize: 15, marginBottom: 16 }}>
        Ask any health, fitness, or nutrition question and get personalized advice
      </p>
      <label style={{ fontWeight: 600, marginBottom: 8, display: 'block' }}>
        Your Question *
      </label>
      <input
        type="text"
        value={question}
        onChange={e => setQuestion(e.target.value)}
        placeholder="How can I improve my sleep quality?"
        required
        style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #e0e0e0', fontSize: 16, marginBottom: 16 }}
      />
      <div style={{ marginBottom: 16, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {exampleQuestions.map((q, i) => (
          <button
            type="button"
            key={i}
            onClick={() => setQuestion(q)}
            style={{
              padding: '6px 12px',
              borderRadius: 6,
              border: '1px solid #43e97b',
              background: '#f8f9fa',
              color: '#256029',
              cursor: 'pointer',
              fontSize: 14
            }}
          >
            {q}
          </button>
        ))}
      </div>
      <button type="submit" disabled={loading} style={{ width: '100%', padding: 14, background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 700, fontSize: 18, cursor: 'pointer', marginBottom: 16 }}>
        {loading ? 'Loading...' : 'Get Recommendations'}
      </button>
    </form>
  );
};

export { RecommendationForm }; 