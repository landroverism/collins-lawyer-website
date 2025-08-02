import { useState, useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { BlogManager } from "./admin/BlogManager";
import { PracticeAreaManager } from "./admin/PracticeAreaManager";
import { TestimonialManager } from "./admin/TestimonialManager";
import { ContactManager } from "./admin/ContactManager";
import { SettingsManager } from "./admin/SettingsManager";

interface AdminDashboardProps {
  onBackToSite: () => void;
}

type AdminTab = "blog" | "contact" | "practice" | "testimonials" | "settings";

export function AdminDashboard({ onBackToSite }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>("blog");
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  // Scroll to top when admin dashboard loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const tabs = [
    { id: "blog" as AdminTab, label: "Blog Posts", icon: "📝" },
    { id: "contact" as AdminTab, label: "Contact Messages", icon: "📧" },
    { id: "practice" as AdminTab, label: "Practice Areas", icon: "⚖️" },
    { id: "testimonials" as AdminTab, label: "Testimonials", icon: "⭐" },
    { id: "settings" as AdminTab, label: "Settings", icon: "⚙️" },
  ];

  const handleExit = () => {
    setShowExitConfirm(true);
  };

  const confirmExit = () => {
    onBackToSite();
    setShowExitConfirm(false);
  };

  const cancelExit = () => {
    setShowExitConfirm(false);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "blog":
        return <BlogManager />;
      case "contact":
        return <ContactManager />;
      case "practice":
        return <PracticeAreaManager />;
      case "testimonials":
        return <TestimonialManager />;
      case "settings":
        return <SettingsManager />;
      default:
        return <BlogManager />;
    }
  };

  return (
    <div className="min-h-screen bg-light-gray">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-deep-blue">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleExit}
                className="px-6 py-3 text-sm bg-warm-orange text-white hover:bg-warm-orange-dark rounded-full transition-all duration-300 font-medium flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Exit Admin
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-gray-200 sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-all duration-300 ${
                    activeTab === tab.id
                      ? "border-warm-orange text-warm-orange"
                      : "text-medium-gray hover:text-warm-orange border-transparent hover:border-warm-orange"
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
            <button
              onClick={handleExit}
              className="text-sm text-medium-gray hover:text-warm-orange transition-colors duration-300 flex items-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Exit
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderTabContent()}
      </main>

      {/* Exit Confirmation Modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-warm-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-deep-blue">Exit Admin Dashboard</h3>
              </div>
            </div>
            <div className="mb-6">
              <p className="text-sm text-medium-gray">
                Are you sure you want to exit the admin dashboard? Any unsaved changes will be lost.
              </p>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelExit}
                className="px-4 py-2 text-sm font-medium text-medium-gray bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmExit}
                className="px-4 py-2 text-sm font-medium text-white bg-warm-orange hover:bg-warm-orange-dark rounded-md transition-colors duration-300"
              >
                Exit Dashboard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Exit Button */}
      <button
        onClick={handleExit}
        className="fixed bottom-6 right-6 bg-warm-orange text-white p-4 rounded-full shadow-lg hover:bg-warm-orange-dark transition-all duration-300 z-40 flex items-center justify-center"
        title="Exit Admin Dashboard"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      </button>
    </div>
  );
}

function OverviewTab() {
  const blogPosts = useQuery(api.blog.getAllPosts);
  const practiceAreas = useQuery(api.practiceAreas.getAllPracticeAreas);
  const testimonials = useQuery(api.testimonials.getAllTestimonials);
  const contacts = useQuery(api.contact.getContactSubmissions, {});

  const stats = [
    {
      name: "Blog Posts",
      value: blogPosts?.length || 0,
      icon: "📝",
      color:
        "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100",
    },
    {
      name: "Practice Areas",
      value: practiceAreas?.length || 0,
      icon: "⚖️",
      color:
        "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100",
    },
    {
      name: "Testimonials",
      value: testimonials?.length || 0,
      icon: "💬",
      color:
        "bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100",
    },
    {
      name: "Contact Forms",
      value: contacts?.length || 0,
      icon: "📧",
      color:
        "bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-100",
    },
  ];

  return (
    <div>
      <h2 className="heading-lg mb-12">Dashboard Overview</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {stats.map((stat, index) => (
          <div
            key={stat.name}
            className="card-light slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center">
              <div className={`p-4 rounded-full ${stat.color} mr-6`}>
                <span className="text-3xl">{stat.icon}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-medium-gray dark:text-medium-gray-light">
                  {stat.name}
                </p>
                <p className="text-3xl font-bold text-deep-blue dark:text-white">
                  {stat.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="fade-in">
          <h3 className="heading-sm mb-8">Recent Contact Forms</h3>
          <div className="space-y-4">
            {contacts?.slice(0, 5).map((contact, index) => (
              <div
                key={contact._id}
                className="card-light slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-deep-blue dark:text-white">
                      {contact.name}
                    </p>
                    <p className="text-sm text-medium-gray dark:text-medium-gray-light">
                      {contact.subject}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-medium ${
                      contact.status === "new"
                        ? "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
                        : "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                    }`}
                  >
                    {contact.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="fade-in" style={{ animationDelay: "0.2s" }}>
          <h3 className="heading-sm mb-8">Recent Blog Posts</h3>
          <div className="space-y-4">
            {blogPosts?.slice(0, 5).map((post, index) => (
              <div
                key={post._id}
                className="card-light slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-deep-blue dark:text-white">
                      {post.title.en}
                    </p>
                    <p className="text-sm text-medium-gray dark:text-medium-gray-light">
                      {new Date(post._creationTime).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-medium ${
                      post.published
                        ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
                    }`}
                  >
                    {post.published ? "Published" : "Draft"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
