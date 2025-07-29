import React, { useState } from 'react';
import { UserProfile } from '@/types/health';

interface ProfileFormProps {
  onSubmit: (profile: UserProfile) => void;
  loading?: boolean;
}

const initialProfile: UserProfile = {
  name: '',
  age: 0,
  weight: 0,
  height: 0,
  gender: '',
  activity_level: '',
  primary_goal: '',
  dietary_restrictions: '',
  medical_conditions: '',
  equipment_available: [],
};

const ProfileForm: React.FC<ProfileFormProps> = ({ onSubmit, loading }) => {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (["age", "weight", "height"].includes(name)) {
      setProfile(prev => ({ ...prev, [name]: Number(value) }));
    } else if (name === "equipment_available") {
      setProfile(prev => ({ ...prev, equipment_available: value.split(',').map(s => s.trim()).filter(Boolean) }));
    } else {
      setProfile(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <form onSubmit={e => { e.preventDefault(); onSubmit(profile); }} style={{ background: '#fff', borderRadius: 12, padding: 32, boxShadow: '0 2px 8px #e0e0e0', maxWidth: 700, margin: '0 auto' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
        <div style={{ background: '#43e97b', color: '#fff', borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, marginBottom: 8 }}>
          <span role="img" aria-label="user">👤</span>
        </div>
        <h2 style={{ fontWeight: 700, fontSize: 22, marginBottom: 4 }}>Create Your Weekly Plan</h2>
        <p style={{ color: '#666', fontSize: 15, textAlign: 'center' }}>Tell us about yourself to get a personalized health and fitness plan</p>
      </div>
      <div style={{ marginBottom: 16 }}>
        <label htmlFor="name" style={{ fontWeight: 600, marginBottom: 4, display: 'block' }}>Name *</label>
        <input id="name" name="name" value={profile.name} onChange={handleChange} placeholder="Name" required style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #e0e0e0' }} />
      </div>
      <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
        <div style={{ flex: 1 }}>
          <label htmlFor="age" style={{ fontWeight: 600, marginBottom: 4, display: 'block' }}>Age *</label>
          <input id="age" name="age" type="number" value={profile.age} onChange={handleChange} placeholder="Age" required style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #e0e0e0' }} />
        </div>
        <div style={{ flex: 1 }}>
          <label htmlFor="weight" style={{ fontWeight: 600, marginBottom: 4, display: 'block' }}>Weight (kg) *</label>
          <input id="weight" name="weight" type="number" value={profile.weight} onChange={handleChange} placeholder="Weight (kg)" required style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #e0e0e0' }} />
        </div>
        <div style={{ flex: 1 }}>
          <label htmlFor="height" style={{ fontWeight: 600, marginBottom: 4, display: 'block' }}>Height (cm) *</label>
          <input id="height" name="height" type="number" value={profile.height} onChange={handleChange} placeholder="Height (cm)" required style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #e0e0e0' }} />
        </div>
      </div>
      <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
        <div style={{ flex: 1 }}>
          <label htmlFor="gender" style={{ fontWeight: 600, marginBottom: 4, display: 'block' }}>Gender *</label>
          <select id="gender" name="gender" value={profile.gender} onChange={handleChange} required style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #e0e0e0' }}>
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <label htmlFor="activity_level" style={{ fontWeight: 600, marginBottom: 4, display: 'block' }}>Activity Level *</label>
          <select id="activity_level" name="activity_level" value={profile.activity_level} onChange={handleChange} required style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #e0e0e0' }}>
            <option value="">Select activity level</option>
            <option value="sedentary">Sedentary</option>
            <option value="light">Light</option>
            <option value="moderate">Moderate</option>
            <option value="active">Active</option>
            <option value="very_active">Very Active</option>
          </select>
        </div>
      </div>
      <div style={{ marginBottom: 16 }}>
        <label htmlFor="primary_goal" style={{ fontWeight: 600, marginBottom: 4, display: 'block' }}>Primary Goal *</label>
        <select id="primary_goal" name="primary_goal" value={profile.primary_goal} onChange={handleChange} required style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #e0e0e0' }}>
          <option value="">Select your primary goal</option>
          <option value="gain_weight">Gain Weight</option>
          <option value="lose_weight">Lose Weight</option>
          <option value="build_muscle">Build Muscle</option>
          <option value="improve_endurance">Improve Endurance</option>
          <option value="general_health and fitness">General Health and Fitness</option>
        </select>
      </div>
      <div style={{ marginBottom: 16 }}>
        <label htmlFor="dietary_restrictions" style={{ fontWeight: 600, marginBottom: 4, display: 'block' }}>Dietary Restrictions (optional)</label>
        <input id="dietary_restrictions" name="dietary_restrictions" value={profile.dietary_restrictions} onChange={handleChange} placeholder="Dietary Restrictions" style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #e0e0e0' }} />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label htmlFor="medical_conditions" style={{ fontWeight: 600, marginBottom: 4, display: 'block' }}>Medical Conditions (optional)</label>
        <input id="medical_conditions" name="medical_conditions" value={profile.medical_conditions} onChange={handleChange} placeholder="Medical Conditions" style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #e0e0e0' }} />
      </div>
      <div style={{ marginBottom: 24 }}>
        <label htmlFor="equipment_available" style={{ fontWeight: 600, marginBottom: 4, display: 'block' }}>Available Equipment (optional)</label>
        <input id="equipment_available" name="equipment_available" value={profile.equipment_available.join(', ')} onChange={handleChange} placeholder="e.g., dumbbells, resistance bands, yoga mat, treadmill" style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #e0e0e0' }} />
      </div>
      <button type="submit" disabled={loading} style={{ width: '100%', padding: 14, background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 700, fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        {loading ? 'Generating...' : <><span role="img" aria-label="plan"></span> Generate Weekly Plan</>}
      </button>
    </form>
  );
};

export { ProfileForm }; 