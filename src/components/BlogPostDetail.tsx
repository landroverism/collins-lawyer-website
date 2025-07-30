import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useLanguage } from "./LanguageContext";

interface BlogPostDetailProps {
  slug: string;
  onBack: () => void;
}

export function BlogPostDetail({ slug, onBack }: BlogPostDetailProps) {
  const { language, t } = useLanguage();
  
  const post = useQuery(api.blog.getPostBySlug, { 
    slug,
    language 
  });

  if (!post) {
    return (
      <section className="section-padding bg-white dark:bg-deep-blue">
        <div className="container-custom">
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="heading-md mb-4 text-deep-blue dark:text-white">
              Blog Post Not Found
            </h3>
            <p className="body-lg text-medium-gray dark:text-medium-gray-light mb-8">
              The blog post you're looking for doesn't exist or has been removed.
            </p>
            <button 
              onClick={onBack}
              className="btn-primary"
            >
              ← Back to Blog
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-white dark:bg-deep-blue">
      <div className="container-custom">
        {/* Back Button */}
        <div className="mb-8">
          <button 
            onClick={onBack}
            className="flex items-center text-warm-orange hover:text-warm-orange-dark transition-colors duration-300 font-semibold"
          >
            <span className="mr-2">←</span>
            Back to Blog
          </button>
        </div>

        {/* Article Header */}
        <article className="max-w-4xl mx-auto">
          <header className="mb-12">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-warm-orange/10 text-warm-orange text-sm font-medium rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="heading-xl mb-6 text-deep-blue dark:text-white">
              {post.title}
            </h1>

            {/* Meta Information */}
            <div className="flex items-center space-x-6 text-medium-gray dark:text-medium-gray-light mb-8">
              <span className="flex items-center">
                <span className="mr-2">📅</span>
                {new Date(post._creationTime).toLocaleDateString()}
              </span>
              <span className="flex items-center">
                <span className="mr-2">👨‍💼</span>
                Collins K. Sang
              </span>
              <span className="flex items-center">
                <span className="mr-2">📖</span>
                {Math.ceil(post.content.split(' ').length / 200)} min read
              </span>
            </div>

            {/* Excerpt */}
            <div className="bg-light-gray dark:bg-dark-gray rounded-xl p-6 mb-8">
              <p className="body-lg text-deep-blue dark:text-white italic">
                {post.excerpt}
              </p>
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div className="bg-light-gray dark:bg-dark-gray rounded-xl p-8">
              <div className="whitespace-pre-wrap text-deep-blue dark:text-white leading-relaxed">
                {post.content}
              </div>
            </div>
          </div>

          {/* Article Footer */}
          <footer className="mt-12 pt-8 border-t border-light-gray dark:border-medium-gray">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-warm-orange rounded-full flex items-center justify-center text-white font-bold">
                  CS
                </div>
                <div>
                  <p className="font-semibold text-deep-blue dark:text-white">
                    Collins K. Sang
                  </p>
                  <p className="text-sm text-medium-gray dark:text-medium-gray-light">
                    Advocate of the High Court of Kenya
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <button className="px-4 py-2 bg-light-gray dark:bg-dark-gray hover:bg-warm-orange hover:text-white rounded-lg transition-all duration-300">
                  📤 Share
                </button>
                <button className="px-4 py-2 bg-light-gray dark:bg-dark-gray hover:bg-warm-orange hover:text-white rounded-lg transition-all duration-300">
                  💾 Save
                </button>
              </div>
            </div>
          </footer>
        </article>
      </div>
    </section>
  );
} 