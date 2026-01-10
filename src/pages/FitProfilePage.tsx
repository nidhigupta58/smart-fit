import { useState } from 'react';
import { User, Edit2, Save, Sparkles, CheckCircle } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { useFitProfileStore } from '@/store/useFitProfileStore';
import type { BodyType, FitPreference, Gender, UserMeasurements } from '@/types';
import { BODY_TYPE_INFO, FIT_PREFERENCE_INFO } from '@/types';

export function FitProfilePage() {
  const { profile, createProfile, updateProfile } = useFitProfileStore();
  const [editing, setEditing] = useState(!profile);

  const [formData, setFormData] = useState<UserMeasurements>({
    height: profile?.height || 170,
    weight: profile?.weight || 65,
    bodyType: profile?.bodyType || 'athletic',
    fitPreference: profile?.fitPreference || 'regular',
    gender: profile?.gender || 'men',
    chest: profile?.chest,
    waist: profile?.waist,
    hips: profile?.hips,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (profile) {
      updateProfile(formData);
    } else {
      createProfile(formData);
    }
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50/50 via-white to-accent-50/30 py-10 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-primary-200/30 rounded-full blur-3xl animate-blob opacity-50" />
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-accent-200/30 rounded-full blur-3xl animate-blob opacity-50" style={{ animationDelay: '2s' }} />
      
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="relative inline-block mb-6">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary-500 via-accent-500 to-primary-600 mx-auto flex items-center justify-center shadow-glow animate-float">
              <User className="w-12 h-12 text-white" />
            </div>
            {profile && (
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center shadow-lg">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
            )}
          </div>
          <h1 className="font-display font-bold text-4xl md:text-5xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-3">
            {profile ? 'Your Fit Profile' : 'Create Fit Profile'}
          </h1>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            {profile
              ? 'Manage your measurements and preferences for perfect recommendations'
              : 'Tell us about yourself to get personalized size recommendations'}
          </p>
        </div>

        {/* Profile Form */}
        <Card className="shadow-xl border-white/50 backdrop-blur-sm bg-white/90">
          <CardHeader className="border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h2 className="font-display font-bold text-xl text-gray-900">
                  Measurements & Preferences
                </h2>
              </div>
              {profile && !editing && (
                <Button
                  variant="secondary"
                  size="sm"
                  icon={<Edit2 className="w-4 h-4" />}
                  onClick={() => setEditing(true)}
                >
                  Edit
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Gender */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Gender
                </label>
                <div className="flex gap-3">
                  {(['men', 'women', 'unisex'] as Gender[]).map((gender) => (
                    <button
                      key={gender}
                      type="button"
                      disabled={!editing}
                      onClick={() => setFormData({ ...formData, gender })}
                      className={`flex-1 px-6 py-3.5 rounded-xl font-semibold transition-all duration-300 disabled:opacity-60 ${
                        formData.gender === gender
                          ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-glow-sm'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {gender.charAt(0).toUpperCase() + gender.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Height & Weight */}
              <div className="grid grid-cols-2 gap-6">
                <Input
                  label="Height (cm)"
                  type="number"
                  value={formData.height}
                  onChange={(e) =>
                    setFormData({ ...formData, height: Number(e.target.value) })
                  }
                  disabled={!editing}
                  required
                  className="text-lg"
                />
                <Input
                  label="Weight (kg)"
                  type="number"
                  value={formData.weight}
                  onChange={(e) =>
                    setFormData({ ...formData, weight: Number(e.target.value) })
                  }
                  disabled={!editing}
                  required
                  className="text-lg"
                />
              </div>

              {/* Body Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  Body Type
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(BODY_TYPE_INFO).map(([type, info]) => (
                    <button
                      key={type}
                      type="button"
                      disabled={!editing}
                      onClick={() => setFormData({ ...formData, bodyType: type as BodyType })}
                      className={`p-4 rounded-2xl text-left transition-all duration-300 disabled:opacity-60 group ${
                        formData.bodyType === type
                          ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-glow-sm'
                          : 'bg-white border-2 border-gray-200 hover:border-primary-300 hover:shadow-md'
                      }`}
                    >
                      <div className={`font-bold text-sm mb-1 ${formData.bodyType === type ? 'text-white' : 'text-gray-900'}`}>
                        {info.label}
                      </div>
                      <div className={`text-xs leading-relaxed ${formData.bodyType === type ? 'text-white/80' : 'text-gray-500'}`}>
                        {info.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Fit Preference */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  Fit Preference
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(FIT_PREFERENCE_INFO).map(([pref, info]) => (
                    <button
                      key={pref}
                      type="button"
                      disabled={!editing}
                      onClick={() =>
                        setFormData({ ...formData, fitPreference: pref as FitPreference })
                      }
                      className={`p-4 rounded-2xl text-left transition-all duration-300 disabled:opacity-60 ${
                        formData.fitPreference === pref
                          ? 'bg-gradient-to-br from-accent-500 to-accent-600 text-white shadow-glow-accent'
                          : 'bg-white border-2 border-gray-200 hover:border-accent-300 hover:shadow-md'
                      }`}
                    >
                      <div className={`font-bold text-sm mb-1 ${formData.fitPreference === pref ? 'text-white' : 'text-gray-900'}`}>
                        {info.label}
                      </div>
                      <div className={`text-xs ${formData.fitPreference === pref ? 'text-white/80' : 'text-gray-500'}`}>
                        {info.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Optional Measurements */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  Additional Measurements{' '}
                  <span className="text-gray-400 font-normal">(Optional - for better accuracy)</span>
                </label>
                <div className="grid grid-cols-3 gap-4">
                  <Input
                    label="Chest (cm)"
                    type="number"
                    value={formData.chest || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, chest: Number(e.target.value) || undefined })
                    }
                    disabled={!editing}
                    placeholder="e.g., 95"
                  />
                  <Input
                    label="Waist (cm)"
                    type="number"
                    value={formData.waist || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, waist: Number(e.target.value) || undefined })
                    }
                    disabled={!editing}
                    placeholder="e.g., 80"
                  />
                  <Input
                    label="Hips (cm)"
                    type="number"
                    value={formData.hips || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, hips: Number(e.target.value) || undefined })
                    }
                    disabled={!editing}
                    placeholder="e.g., 95"
                  />
                </div>
              </div>

              {/* Submit Button */}
              {editing && (
                <Button
                  type="submit"
                  size="lg"
                  icon={<Save className="w-5 h-5" />}
                  className="w-full shadow-glow"
                >
                  {profile ? 'Update Profile' : 'Create My Fit Profile'}
                </Button>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Recommendation History */}
        {profile && profile.recommendationHistory.length > 0 && (
          <Card className="mt-8 shadow-xl border-white/50 backdrop-blur-sm bg-white/90">
            <CardHeader className="border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <h2 className="font-display font-bold text-xl text-gray-900">
                  Recommendation History
                </h2>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                {profile.recommendationHistory.slice(0, 5).map((history, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-md transition-all duration-300"
                  >
                    <div>
                      <p className="font-semibold text-gray-900">{history.productName}</p>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-primary-500" />
                        Recommended: <span className="font-semibold text-primary-600">{history.recommendation.recommendedSize}</span>
                      </p>
                    </div>
                    <Badge variant="success" className="shadow-sm">
                      {history.recommendation.fitResult}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
