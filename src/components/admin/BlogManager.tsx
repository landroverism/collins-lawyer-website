import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { toast } from "sonner";

export function BlogManager() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    title: { en: "", sw: "", fr: "", de: "", es: "" },
    content: { en: "", sw: "", fr: "", de: "", es: "" },
    excerpt: { en: "", sw: "", fr: "", de: "", es: "" },
    slug: "",
    published: false,
    tags: [] as string[],
    seoTitle: "",
    seoDescription: ""
  });

  const blogPosts = useQuery(api.blog.getAllPosts);
  const createPost = useMutation(api.blog.createPost);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createPost(formData);
      toast.success("Blog post created successfully!");
      setShowCreateForm(false);
      setFormData({
        title: { en: "", sw: "", fr: "", de: "", es: "" },
        content: { en: "", sw: "", fr: "", de: "", es: "" },
        excerpt: { en: "", sw: "", fr: "", de: "", es: "" },
        slug: "",
        published: false,
        tags: [],
        seoTitle: "",
        seoDescription: ""
      });
    } catch (error) {
      toast.error("Failed to create blog post");
    }
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(",").map(tag => tag.trim()).filter(Boolean);
    setFormData(prev => ({ ...prev, tags }));
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (value: string, lang: string) => {
    setFormData(prev => ({
      ...prev,
      title: { ...prev.title, [lang]: value },
      slug: lang === 'en' ? generateSlug(value) : prev.slug
    }));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Blog Posts
        </h2>
        <button
          onClick={() => setShowCreateForm(true)}
          className="px-6 py-3 bg-warm-orange hover:bg-warm-orange-dark text-white rounded-lg transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          ✨ Create New Post
        </button>
      </div>

      {/* Enhanced Create Form Modal */}
      {showCreateForm && (
        <div
          className="modal-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setShowCreateForm(false);
            }
          }}
        >
          <div className="modal-container" onMouseDown={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="modal-header">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold text-deep-blue dark:text-white">
                    Create New Blog Post
                  </h3>
                  <p className="text-medium-gray dark:text-medium-gray-light text-sm mt-1">
                    Write and publish your latest legal insights
                  </p>
                </div>
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="w-10 h-10 rounded-full bg-white dark:bg-deep-blue border border-light-gray dark:border-medium-gray flex items-center justify-center text-medium-gray dark:text-medium-gray-light hover:text-warm-orange hover:border-warm-orange transition-all duration-300"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="modal-body">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* English Content Section */}
                <div className="bg-light-gray dark:bg-dark-gray rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-deep-blue dark:text-white mb-4 flex items-center">
                    <span className="mr-2">🇺🇸</span>
                    English Content
                  </h4>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="lg:col-span-2">
                      <label className="block text-sm font-semibold text-deep-blue dark:text-white mb-2">
                        Title (English) *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title.en}
                        onChange={(e) => handleTitleChange(e.target.value, 'en')}
                        className="w-full px-4 py-3 border-2 border-light-gray dark:border-medium-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-orange focus:border-warm-orange transition-all duration-300 bg-white dark:bg-deep-blue text-deep-blue dark:text-white text-lg"
                        placeholder="Enter the blog post title..."
                      />
                    </div>
                    
                    <div className="lg:col-span-2">
                      <label className="block text-sm font-semibold text-deep-blue dark:text-white mb-2">
                        Excerpt (English) *
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={formData.excerpt.en}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          excerpt: { ...prev.excerpt, en: e.target.value }
                        }))}
                        className="w-full px-4 py-3 border-2 border-light-gray dark:border-medium-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-orange focus:border-warm-orange transition-all duration-300 bg-white dark:bg-deep-blue text-deep-blue dark:text-white resize-none"
                        placeholder="Write a brief excerpt for the blog post..."
                      />
                    </div>
                    
                    <div className="lg:col-span-2">
                      <label className="block text-sm font-semibold text-deep-blue dark:text-white mb-2">
                        Content (English) *
                      </label>
                      <textarea
                        required
                        rows={12}
                        value={formData.content.en}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          content: { ...prev.content, en: e.target.value }
                        }))}
                        className="w-full px-4 py-3 border-2 border-light-gray dark:border-medium-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-orange focus:border-warm-orange transition-all duration-300 bg-white dark:bg-deep-blue text-deep-blue dark:text-white resize-none"
                        placeholder="Write your blog post content here..."
                      />
                    </div>
                  </div>
                </div>

                {/* Meta Information Section */}
                <div className="bg-light-gray dark:bg-dark-gray rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-deep-blue dark:text-white mb-4 flex items-center">
                    <span className="mr-2">⚙️</span>
                    Meta Information
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-deep-blue dark:text-white mb-2">
                        URL Slug *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.slug}
                        onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                        className="w-full px-4 py-3 border-2 border-light-gray dark:border-medium-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-orange focus:border-warm-orange transition-all duration-300 bg-white dark:bg-deep-blue text-deep-blue dark:text-white"
                        placeholder="blog-post-url-slug"
                      />
                      <p className="text-xs text-medium-gray dark:text-medium-gray-light mt-1">
                        Auto-generated from title, but you can customize it
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-deep-blue dark:text-white mb-2">
                        Tags
                      </label>
                      <input
                        type="text"
                        onChange={handleTagsChange}
                        className="w-full px-4 py-3 border-2 border-light-gray dark:border-medium-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-orange focus:border-warm-orange transition-all duration-300 bg-white dark:bg-deep-blue text-deep-blue dark:text-white"
                        placeholder="Legal, Kenya, Constitutional Law"
                      />
                      <p className="text-xs text-medium-gray dark:text-medium-gray-light mt-1">
                        Separate tags with commas
                      </p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        id="published"
                        checked={formData.published}
                        onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
                        className="w-5 h-5 text-warm-orange bg-white dark:bg-deep-blue border-2 border-light-gray dark:border-medium-gray rounded focus:ring-warm-orange focus:ring-2"
                      />
                      <span className="text-sm font-semibold text-deep-blue dark:text-white">
                        Publish immediately
                      </span>
                    </label>
                    <p className="text-xs text-medium-gray dark:text-medium-gray-light mt-1 ml-8">
                      If unchecked, the post will be saved as a draft
                    </p>
                  </div>
                </div>
              </form>
            </div>

            {/* Modal Footer */}
            <div className="modal-footer">
              <div className="flex justify-end items-center space-x-4">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="px-6 py-3 text-deep-blue dark:text-white border-2 border-light-gray dark:border-medium-gray rounded-lg hover:bg-white dark:hover:bg-deep-blue hover:border-warm-orange transition-all duration-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="px-8 py-3 bg-warm-orange hover:bg-warm-orange-dark text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  {formData.published ? 'Publish Post' : 'Save as Draft'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Posts List */}
      <div className="space-y-4">
        {blogPosts?.map((post) => (
          <div
            key={post._id}
            className="p-6 bg-white dark:bg-deep-blue rounded-xl border border-light-gray dark:border-medium-gray hover:shadow-lg transition-all duration-300"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-deep-blue dark:text-white mb-2 text-lg">
                  {post.title.en}
                </h3>
                <p className="text-medium-gray dark:text-medium-gray-light mb-3">
                  {post.excerpt.en}
                </p>
                <div className="flex items-center space-x-4 text-sm text-medium-gray dark:text-medium-gray-light">
                  <span className="flex items-center">
                    <span className="mr-1">🔗</span>
                    {post.slug}
                  </span>
                  <span className="flex items-center">
                    <span className="mr-1">📅</span>
                    {new Date(post._creationTime).toLocaleDateString()}
                  </span>
                  <div className="flex space-x-2">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-warm-orange/10 text-warm-orange rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3 ml-4">
                <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                  post.published 
                    ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                }`}>
                  {post.published ? '✅ Published' : '📝 Draft'}
                </span>
                <button className="px-4 py-2 text-sm bg-light-gray dark:bg-medium-gray hover:bg-warm-orange hover:text-white rounded-lg transition-all duration-300 font-medium">
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
