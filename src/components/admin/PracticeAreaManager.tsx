import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { toast } from "sonner";

export function PracticeAreaManager() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    title: { en: "", sw: "", fr: "", de: "", es: "" },
    description: { en: "", sw: "", fr: "", de: "", es: "" },
    icon: "",
    order: 0
  });

  const practiceAreas = useQuery(api.practiceAreas.getAllPracticeAreas);
  const createPracticeArea = useMutation(api.practiceAreas.createPracticeArea);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createPracticeArea(formData);
      toast.success("Practice area created successfully!");
      setShowCreateForm(false);
      setFormData({
        title: { en: "", sw: "", fr: "", de: "", es: "" },
        description: { en: "", sw: "", fr: "", de: "", es: "" },
        icon: "",
        order: 0
      });
    } catch (error) {
      toast.error("Failed to create practice area");
    }
  };

  const commonIcons = ["⚖️", "👨‍👩‍👧‍👦", "🏢", "📋", "🤝", "📜", "💼", "🏛️", "📊", "🔒"];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-deep-blue">
          Practice Areas
        </h2>
        <button
          onClick={() => setShowCreateForm(true)}
          className="btn-primary"
        >
          Add Practice Area
        </button>
      </div>

      {/* Create Form Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-deep-blue">
                  Add Practice Area
                </h3>
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="text-medium-gray hover:text-deep-blue"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-deep-blue mb-2">
                    Title (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title.en}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      title: { ...prev.title, en: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-warm-orange focus:border-warm-orange bg-white text-deep-blue"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-deep-blue mb-2">
                    Description (English) *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.description.en}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      description: { ...prev.description, en: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-warm-orange focus:border-warm-orange bg-white text-deep-blue"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-deep-blue mb-2">
                      Icon
                    </label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {commonIcons.map((icon) => (
                        <button
                          key={icon}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, icon }))}
                          className={`p-2 text-2xl border rounded-lg ${
                            formData.icon === icon
                              ? 'border-warm-orange bg-warm-orange/10'
                              : 'border-gray-300 hover:bg-light-gray'
                          }`}
                        >
                          {icon}
                        </button>
                      ))}
                    </div>
                    <input
                      type="text"
                      value={formData.icon}
                      onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                      placeholder="Or enter custom emoji"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-warm-orange focus:border-warm-orange bg-white text-deep-blue"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-deep-blue mb-2">
                      Display Order
                    </label>
                    <input
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-warm-orange focus:border-warm-orange bg-white text-deep-blue"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="px-4 py-2 text-medium-gray border border-gray-300 rounded-lg hover:bg-light-gray"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                  >
                    Add Practice Area
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Practice Areas List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {practiceAreas?.map((area) => (
          <div
            key={area._id}
            className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="text-3xl">{area.icon}</div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  area.active 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {area.active ? 'Active' : 'Inactive'}
                </span>
                <span className="text-xs text-medium-gray">
                  Order: {area.order}
                </span>
              </div>
            </div>
            <h3 className="font-semibold text-deep-blue mb-2">
              {area.title.en}
            </h3>
            <p className="text-sm text-medium-gray mb-3">
              {area.description.en}
            </p>
            <div className="flex justify-end">
              <button className="px-3 py-1 text-sm bg-light-gray hover:bg-medium-gray text-deep-blue rounded transition-colors">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
