import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useLanguage } from "./LanguageContext";
import { BlogPostDetail } from "./BlogPostDetail";

export function Blog() {
  const { language, t } = useLanguage();
  const [selectedPostSlug, setSelectedPostSlug] = useState<string | null>(null);
  
  // Fetch published blog posts from the database
  const blogPosts = useQuery(api.blog.getPublishedPosts, { 
    limit: 6, 
    language 
  });

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
    <section id="blog" className="section-padding bg-white dark:bg-deep-blue">
      <div className="container-custom">
        <div className="text-center mb-16 fade-in">
          <div className="section-divider"></div>
          <h2 className="heading-lg mb-6">Legal Articles & Insights</h2>
          <p className="body-lg max-w-3xl mx-auto">
            Stay Informed with Expert Legal Analysis and Commentary
          </p>
        </div>

        {blogPosts && blogPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <article 
                key={post._id} 
                className="card group slide-up cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handlePostClick(post.slug)}
              >
                {/* Featured Image Placeholder */}
                <div className="w-full h-48 bg-gradient-to-br from-deep-blue to-deep-blue-light rounded-lg mb-6 flex items-center justify-center group-hover:from-warm-orange group-hover:to-warm-orange-dark transition-all duration-500">
                  <div className="text-4xl text-white">📖</div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 2).map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="px-3 py-1 bg-warm-orange/10 text-warm-orange text-xs font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="heading-sm group-hover:text-warm-orange transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="body-sm line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex justify-between items-center pt-4 border-t border-light-gray dark:border-medium-gray">
                    <span className="text-sm text-medium-gray dark:text-medium-gray-light">
                      {new Date(post._creationTime).toLocaleDateString()}
                    </span>
                    <span className="link-primary font-semibold">
                      {t("readMore")} →
                    </span>
                  </div>
                </div>

                {/* Hover effect border */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-warm-orange transition-all duration-500 group-hover:w-full"></div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="heading-md mb-4 text-deep-blue dark:text-white">
              No Blog Posts Yet
            </h3>
            <p className="body-lg text-medium-gray dark:text-medium-gray-light max-w-2xl mx-auto">
              Collins K. Sang is currently preparing insightful legal articles and analysis. 
              Check back soon for expert commentary on Kenyan law and legal developments.
            </p>
          </div>
        )}

        {/* View All Posts */}
        {blogPosts && blogPosts.length > 0 && (
          <div className="text-center mt-16 fade-in">
            <button className="btn-secondary">
              {t("viewAllPosts")}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
