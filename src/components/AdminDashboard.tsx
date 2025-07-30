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

export function AdminDashboard({ onBackToSite }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const loggedInUser = useQuery(api.auth.loggedInUser);

  const tabs = [
    { id: "overview", name: "Overview", icon: "📊" },
    { id: "blog", name: "Blog Posts", icon: "📝" },
    { id: "practice", name: "Practice Areas", icon: "⚖️" },
    { id: "testimonials", name: "Testimonials", icon: "💬" },
    { id: "contacts", name: "Contact Forms", icon: "📧" },
    { id: "settings", name: "Settings", icon: "⚙️" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab />;
      case "blog":
        return <BlogManager />;
      case "practice":
        return <PracticeAreaManager />;
      case "testimonials":
        return <TestimonialManager />;
      case "contacts":
        return <ContactManager />;
      case "settings":
        return <SettingsManager />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="min-h-screen bg-light-gray dark:bg-dark-gray">
      {/* Header */}
      <div className="bg-white dark:bg-deep-blue shadow-lg border-b-4 border-warm-orange">
        <div className="container-custom">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <button
                onClick={onBackToSite}
                className="mr-6 px-6 py-3 text-sm bg-light-gray dark:bg-medium-gray hover:bg-warm-orange hover:text-white rounded-full transition-all duration-300 font-medium"
              >
                ← Back to Site
              </button>
              <h1 className="text-2xl font-bold text-deep-blue dark:text-white">
                Admin Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-medium-gray dark:text-medium-gray-light">
                Welcome, {loggedInUser?.name || "Admin"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <nav className="card p-6">
              <ul className="space-y-3">
                {tabs.map((tab) => (
                  <li key={tab.id}>
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-6 py-4 text-left rounded-full transition-all duration-300 font-medium ${
                        activeTab === tab.id
                          ? "bg-warm-orange text-white shadow-lg"
                          : "text-medium-gray dark:text-medium-gray-light hover:bg-light-gray dark:hover:bg-medium-gray hover:text-warm-orange"
                      }`}
                    >
                      <span className="mr-4 text-xl">{tab.icon}</span>
                      {tab.name}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="card">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
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
      color: "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
    },
    {
      name: "Practice Areas",
      value: practiceAreas?.length || 0,
      icon: "⚖️",
      color: "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
    },
    {
      name: "Testimonials",
      value: testimonials?.length || 0,
      icon: "💬",
      color: "bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100"
    },
    {
      name: "Contact Forms",
      value: contacts?.length || 0,
      icon: "📧",
      color: "bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-100"
    }
  ];

  return (
    <div>
      <h2 className="heading-lg mb-12">
        Dashboard Overview
      </h2>

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
          <h3 className="heading-sm mb-8">
            Recent Contact Forms
          </h3>
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
                  <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                    contact.status === 'new' 
                      ? 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                      : 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                  }`}>
                    {contact.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="fade-in" style={{ animationDelay: '0.2s' }}>
          <h3 className="heading-sm mb-8">
            Recent Blog Posts
          </h3>
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
                  <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                    post.published 
                      ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                  }`}>
                    {post.published ? 'Published' : 'Draft'}
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
