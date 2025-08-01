import { useState } from "react";
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

  const tabs = [
    { id: "blog" as AdminTab, label: "Blog Posts", icon: "📝" },
    { id: "contact" as AdminTab, label: "Contact Messages", icon: "📧" },
    { id: "practice" as AdminTab, label: "Practice Areas", icon: "⚖️" },
    { id: "testimonials" as AdminTab, label: "Testimonials", icon: "⭐" },
    { id: "settings" as AdminTab, label: "Settings", icon: "⚙️" },
  ];

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
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-deep-blue">Admin Dashboard</h1>
            </div>
            <button
              onClick={onBackToSite}
              className="mr-6 px-6 py-3 text-sm bg-light-gray hover:bg-warm-orange hover:text-white rounded-full transition-all duration-300 font-medium"
            >
              ← Back to Site
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderTabContent()}
      </main>
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
