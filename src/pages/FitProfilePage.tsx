import { useState } from 'react';
import { User, Edit2, Save } from 'lucide-react';
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-primary mx-auto mb-4 flex items-center justify-center shadow-glow">
            <User className="w-10 h-10 text-white" />
          </div>
          <h1 className="font-display font-bold text-4xl text-gray-900 mb-2">
            {profile ? 'Your Fit Profile' : 'Create Fit Profile'}
          </h1>
          <p className="text-gray-600">
            {profile
              ? 'Manage your measurements and preferences'
              : 'Tell us about yourself to get personalized size recommendations'}
          </p>
        </div>

        {/* Profile Form */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="font-display font-semibold text-xl text-gray-900">
                Measurements & Preferences
              </h2>
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
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <div className="flex gap-2">
                  {(['men', 'women', 'unisex'] as Gender[]).map((gender) => (
                    <button
                      key={gender}
                      type="button"
                      disabled={!editing}
                      onClick={() => setFormData({ ...formData, gender })}
                      className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-smooth disabled:opacity-50 ${
                        formData.gender === gender
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {gender.charAt(0).toUpperCase() + gender.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Height & Weight */}
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Height (cm)"
                  type="number"
                  value={formData.height}
                  onChange={(e) =>
                    setFormData({ ...formData, height: Number(e.target.value) })
                  }
                  disabled={!editing}
                  required
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
                />
              </div>

              {/* Body Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Body Type
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {Object.entries(BODY_TYPE_INFO).map(([type, info]) => (
                    <button
                      key={type}
                      type="button"
                      disabled={!editing}
                      onClick={() => setFormData({ ...formData, bodyType: type as BodyType })}
                      className={`p-3 rounded-lg text-left transition-smooth disabled:opacity-50 ${
                        formData.bodyType === type
                          ? 'bg-primary-100 border-2 border-primary-500'
                          : 'bg-white border-2 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-medium text-sm text-gray-900">{info.label}</div>
                      <div className="text-xs text-gray-600 mt-1 line-clamp-2">
                        {info.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Fit Preference */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Fit Preference
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {Object.entries(FIT_PREFERENCE_INFO).map(([pref, info]) => (
                    <button
                      key={pref}
                      type="button"
                      disabled={!editing}
                      onClick={() =>
                        setFormData({ ...formData, fitPreference: pref as FitPreference })
                      }
                      className={`p-3 rounded-lg text-left transition-smooth disabled:opacity-50 ${
                        formData.fitPreference === pref
                          ? 'bg-primary-100 border-2 border-primary-500'
                          : 'bg-white border-2 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-medium text-sm text-gray-900">{info.label}</div>
                      <div className="text-xs text-gray-600 mt-1">{info.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Optional Measurements */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Additional Measurements (Optional)
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
                  className="w-full"
                >
                  {profile ? 'Update Profile' : 'Create Profile'}
                </Button>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Recommendation History */}
        {profile && profile.recommendationHistory.length > 0 && (
          <Card className="mt-6">
            <CardHeader>
              <h2 className="font-display font-semibold text-xl text-gray-900">
                Recommendation History
              </h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {profile.recommendationHistory.slice(0, 5).map((history, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{history.productName}</p>
                      <p className="text-sm text-gray-600">
                        Recommended: {history.recommendation.recommendedSize}
                      </p>
                    </div>
                    <Badge variant="success">
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
