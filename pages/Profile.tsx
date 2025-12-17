import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { User, SkillLevel } from '../types';
import { Edit2, Save, X, Calendar, Trophy, Phone } from 'lucide-react';
import { MockService } from '../services/mockService';

export const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<User>>({});
  const [loading, setLoading] = useState(false);

  if (!user) return null;

  const startEditing = () => {
    setFormData(user);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setFormData({});
  };

  const handleSave = async () => {
      setLoading(true);
      try {
          // Simulate API call
          const updated = await MockService.updateProfile(user.id, formData);
          updateUser(updated);
          setIsEditing(false);
      } catch (e) {
          console.error(e);
      } finally {
          setLoading(false);
      }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        {!isEditing && (
            <Button variant="outline" onClick={startEditing} className="flex items-center gap-2">
                <Edit2 size={16} /> Edit Profile
            </Button>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Cover Photo Area */}
        <div className="h-32 bg-emerald-600"></div>
        
        <div className="px-8 pb-8">
            <div className="relative flex justify-between items-end -mt-12 mb-6">
                <img 
                    src={user.avatarUrl} 
                    alt={user.name} 
                    className="w-24 h-24 rounded-full border-4 border-white bg-white shadow-sm"
                />
                <div className="text-sm text-gray-500 mb-2 flex items-center gap-1">
                    <Calendar size={14}/> Joined {new Date(user.joinedAt).toLocaleDateString()}
                </div>
            </div>

            {isEditing ? (
                <div className="space-y-4 animate-in fade-in duration-300">
                    <Input 
                        label="Full Name" 
                        value={formData.name || ''} 
                        onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Skill Level</label>
                        <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            value={formData.skillLevel}
                            onChange={(e) => setFormData({...formData, skillLevel: e.target.value as SkillLevel})}
                        >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                            <option value="Pro">Pro</option>
                        </select>
                    </div>

                    <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                         <textarea 
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            rows={3}
                            value={formData.bio || ''}
                            onChange={e => setFormData({...formData, bio: e.target.value})}
                         />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <Button onClick={handleSave} isLoading={loading} className="flex-1 flex items-center justify-center gap-2">
                            <Save size={18} /> Save Changes
                        </Button>
                        <Button variant="secondary" onClick={cancelEditing} className="flex items-center justify-center gap-2">
                             Cancel
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="space-y-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                        <div className="flex items-center gap-2 text-gray-500 mt-1">
                            <Phone size={16} /> {user.phoneNumber}
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg flex items-center gap-2 font-medium">
                            <Trophy size={18} />
                            {user.skillLevel}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">Bio</h3>
                        <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-lg">
                            {user.bio || "No bio yet."}
                        </p>
                    </div>
                </div>
            )}
        </div>
      </div>
      
      {/* Stats Section Placeholder */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
         <h3 className="font-bold text-gray-900 mb-4">Stats & Activity</h3>
         <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
             <div className="p-4 bg-gray-50 rounded-lg">
                 <div className="text-2xl font-bold text-emerald-600">12</div>
                 <div className="text-xs text-gray-500 uppercase font-medium">Matches</div>
             </div>
             <div className="p-4 bg-gray-50 rounded-lg">
                 <div className="text-2xl font-bold text-emerald-600">8</div>
                 <div className="text-xs text-gray-500 uppercase font-medium">Courts Visited</div>
             </div>
             <div className="p-4 bg-gray-50 rounded-lg">
                 <div className="text-2xl font-bold text-emerald-600">5</div>
                 <div className="text-xs text-gray-500 uppercase font-medium">Friends</div>
             </div>
         </div>
      </div>
    </div>
  );
};