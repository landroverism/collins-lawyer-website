import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { toast } from "sonner";

export function TestimonialManager() {
  const testimonials = useQuery(api.testimonials.getAllTestimonials);
  const approveTestimonial = useMutation(api.testimonials.approveTestimonial);

  const handleApprove = async (testimonialId: string, featured: boolean = false) => {
    try {
      await approveTestimonial({ testimonialId: testimonialId as any, featured });
      toast.success(`Testimonial ${featured ? 'featured and ' : ''}approved!`);
    } catch (error) {
      toast.error("Failed to approve testimonial");
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-lg ${i < rating ? 'text-gold-400' : 'text-gray-300'}`}>
        ⭐
      </span>
    ));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Testimonials
        </h2>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Total: {testimonials?.length || 0} | 
          Approved: {testimonials?.filter(t => t.approved).length || 0} |
          Pending: {testimonials?.filter(t => !t.approved).length || 0}
        </div>
      </div>

      <div className="space-y-4">
        {testimonials?.map((testimonial) => (
          <div
            key={testimonial._id}
            className={`p-6 rounded-lg border ${
              testimonial.approved
                ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                : 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white mr-4">
                    {testimonial.clientName}
                  </h3>
                  <div className="flex items-center">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Case Type: {testimonial.caseType}
                </p>
                <blockquote className="text-gray-700 dark:text-gray-300 italic">
                  "{testimonial.content.en || testimonial.content.sw || testimonial.content.fr || testimonial.content.de || testimonial.content.es}"
                </blockquote>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <div className="flex space-x-2">
                  {testimonial.approved && (
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 rounded-full">
                      Approved
                    </span>
                  )}
                  {testimonial.featured && (
                    <span className="px-2 py-1 text-xs bg-gold-100 text-gold-800 dark:bg-gold-800 dark:text-gold-100 rounded-full">
                      Featured
                    </span>
                  )}
                  {!testimonial.approved && (
                    <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100 rounded-full">
                      Pending
                    </span>
                  )}
                </div>
                {!testimonial.approved && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleApprove(testimonial._id, false)}
                      className="px-3 py-1 text-sm bg-green-600 hover:bg-green-700 text-white rounded"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleApprove(testimonial._id, true)}
                      className="px-3 py-1 text-sm bg-gold-600 hover:bg-gold-700 text-white rounded"
                    >
                      Feature
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Submitted: {new Date(testimonial._creationTime).toLocaleString()}
            </div>
          </div>
        ))}

        {(!testimonials || testimonials.length === 0) && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">💬</div>
            <p className="text-gray-600 dark:text-gray-400">
              No testimonials yet. They will appear here when clients submit them through the website.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
