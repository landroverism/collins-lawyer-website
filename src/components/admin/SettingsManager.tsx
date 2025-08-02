import { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { toast } from "sonner";

export function SettingsManager() {
  const [newSetting, setNewSetting] = useState({ key: "", value: "", description: "" });
  const settings = useQuery(api.settings.getAllSettings);
  const updateSetting = useMutation(api.settings.updateSetting);

  const handleUpdateSetting = async (key: string, value: any, description?: string) => {
    try {
      await updateSetting({ key, value, description });
      toast.success("Setting updated successfully!");
    } catch (error) {
      toast.error("Failed to update setting");
    }
  };

  const handleAddSetting = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSetting.key || !newSetting.value) return;

    try {
      await updateSetting({
        key: newSetting.key,
        value: newSetting.value,
        description: newSetting.description
      });
      toast.success("Setting added successfully!");
      setNewSetting({ key: "", value: "", description: "" });
    } catch (error) {
      toast.error("Failed to add setting");
    }
  };

  const commonSettings = [
    { key: "site_title", label: "Site Title", type: "text", description: "Main website title" },
    { key: "site_description", label: "Site Description", type: "textarea", description: "Website meta description" },
    { key: "contact_email", label: "Contact Email", type: "email", description: "Primary contact email" },
    { key: "contact_phone", label: "Contact Phone", type: "tel", description: "Primary contact phone" },
    { key: "office_address", label: "Office Address", type: "textarea", description: "Physical office address" },
    { key: "linkedin_url", label: "LinkedIn URL", type: "url", description: "LinkedIn profile URL" },
    { key: "twitter_url", label: "Twitter URL", type: "url", description: "Twitter profile URL" },
    { key: "facebook_url", label: "Facebook URL", type: "url", description: "Facebook profile URL" },
    { key: "google_analytics_id", label: "Google Analytics ID", type: "text", description: "GA tracking ID" },
    { key: "calendly_url", label: "Calendly URL", type: "url", description: "Calendly booking URL" }
  ];

  return (
    <div>
      <h2 className="heading-lg mb-12">
        Site Settings
      </h2>

      {/* Common Settings */}
      <div className="space-y-6 mb-8">
        <h3 className="heading-sm">
          Common Settings
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {commonSettings.map((setting) => (
            <div key={setting.key} className="space-y-2">
              <label className="block text-sm font-semibold text-deep-blue">
                {setting.label}
              </label>
              <p className="text-xs text-medium-gray">
                {setting.description}
              </p>
              {setting.type === 'textarea' ? (
                <textarea
                  rows={3}
                  defaultValue={settings?.[setting.key] || ""}
                  onBlur={(e) => handleUpdateSetting(setting.key, e.target.value, setting.description)}
                  className="w-full px-4 py-3 border-2 border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-orange focus:border-warm-orange transition-all duration-300 bg-white text-deep-blue resize-none"
                  placeholder={`Enter ${setting.label.toLowerCase()}`}
                />
              ) : (
                <input
                  type={setting.type}
                  defaultValue={settings?.[setting.key] || ""}
                  onBlur={(e) => handleUpdateSetting(setting.key, e.target.value, setting.description)}
                  className="w-full px-4 py-3 border-2 border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-orange focus:border-warm-orange transition-all duration-300 bg-white text-deep-blue"
                  placeholder={`Enter ${setting.label.toLowerCase()}`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Add Custom Setting */}
      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-lg font-semibold text-deep-blue mb-4">
          Add Custom Setting
        </h3>
        <form onSubmit={handleAddSetting} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-deep-blue mb-2">
                Key
              </label>
              <input
                type="text"
                value={newSetting.key}
                onChange={(e) => setNewSetting(prev => ({ ...prev, key: e.target.value }))}
                placeholder="setting_key"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-warm-orange focus:border-warm-orange bg-white text-deep-blue"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-deep-blue mb-2">
                Value
              </label>
              <input
                type="text"
                value={newSetting.value}
                onChange={(e) => setNewSetting(prev => ({ ...prev, value: e.target.value }))}
                placeholder="Setting value"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-warm-orange focus:border-warm-orange bg-white text-deep-blue"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-deep-blue mb-2">
                Description
              </label>
              <input
                type="text"
                value={newSetting.description}
                onChange={(e) => setNewSetting(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Setting description"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-warm-orange focus:border-warm-orange bg-white text-deep-blue"
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn-primary"
          >
            Add Setting
          </button>
        </form>
      </div>

      {/* All Settings */}
      {settings && Object.keys(settings).length > 0 && (
        <div className="border-t border-gray-200 pt-8 mt-8">
          <h3 className="text-lg font-semibold text-deep-blue mb-4">
            All Settings
          </h3>
          <div className="space-y-3">
            {Object.entries(settings).map(([key, value]) => (
              <div
                key={key}
                className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-medium text-deep-blue">
                      {key}
                    </h4>
                    <p className="text-sm text-medium-gray mt-1">
                      {String(value)}
                    </p>
                  </div>
                  <button className="px-3 py-1 text-sm bg-light-gray hover:bg-medium-gray text-deep-blue rounded transition-colors">
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
