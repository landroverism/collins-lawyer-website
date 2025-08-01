import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useLanguage } from "./LanguageContext";
import { BlogPostDetail } from "./BlogPostDetail";

export function Blog() {
  const { language, t } = useLanguage();
  const [selectedPostSlug, setSelectedPostSlug] = useState<string | null>(null);
  
  // Fetch published blog posts from the database
  const posts = useQuery(api.blog.getPublishedPosts, { 
    language,
    limit: 6 
  }) || [];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handlePostClick = (slug: string) => {
    setSelectedPostSlug(slug);
  };

  const handleBackToBlog = () => {
    setSelectedPostSlug(null);
  };

  // Show blog post detail if one is selected
  if (selectedPostSlug) {
    return (
      <BlogPostDetail 
        slug={selectedPostSlug} 
        onBack={handleBackToBlog} 
      />
    );
  }

  return (
    <section id="blog" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="section-divider"></div>
          <h2 className="heading-lg mb-6">{t("blogTitle")}</h2>
          <p className="body-lg text-medium-gray max-w-2xl mx-auto">
            {t("blogSubtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post._id} className="card group hover:shadow-xl transition-all duration-300">
              {/* Featured Image */}
              {post.featuredImage && (
                <div className="w-full h-48 rounded-t-lg overflow-hidden mb-6">
                  <img 
                    src={post.featuredImage} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="px-3 py-1 bg-warm-orange/10 text-warm-orange text-xs font-medium rounded-full">
                    {post.tags[0] || "Legal"}
                  </span>
                  <span className="text-xs text-medium-gray">
                    {formatDate(post._creationTime.toString())}
                  </span>
                </div>

                <h3 className="heading-sm mb-3 group-hover:text-warm-orange transition-colors duration-300">
                  {post.title}
                </h3>

                <p className="body-sm text-medium-gray mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex justify-between items-center pt-4 border-t border-light-gray">
                  <span className="text-sm text-medium-gray">
                    {Math.ceil(post.content.length / 200)} min read
                  </span>
                  <button className="text-warm-orange hover:text-warm-orange-dark font-medium text-sm transition-colors duration-300">
                    {t("readMore")} →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* No blog posts message */}
        {posts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="heading-md mb-4 text-deep-blue">
              No Blog Posts Yet
            </h3>
            <p className="body-lg text-medium-gray max-w-2xl mx-auto">
              Collins K. Sang is currently preparing insightful legal articles and analysis. 
              Check back soon for expert commentary on Kenyan law and legal developments.
            </p>
          </div>
        )}

        {/* Blog CTA */}
        <div className="text-center mt-16">
          <h3 className="heading-md mb-4 text-deep-blue">
            {t("stayInformed")}
          </h3>
          <p className="body-lg text-medium-gray max-w-2xl mx-auto">
            {t("blogDescription")}
          </p>
        </div>
      </div>
    </section>
  );
}
