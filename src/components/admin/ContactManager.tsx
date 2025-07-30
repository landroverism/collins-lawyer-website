import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { toast } from "sonner";
import { useState } from "react";

export function ContactManager() {
  const [statusFilter, setStatusFilter] = useState<string>("");
  const contacts = useQuery(api.contact.getContactSubmissions, 
    statusFilter ? { status: statusFilter } : {}
  );
  const updateStatus = useMutation(api.contact.updateSubmissionStatus);

  const handleStatusUpdate = async (submissionId: string, status: string, priority?: string) => {
    try {
      await updateStatus({ submissionId: submissionId as any, status, priority });
      toast.success("Status updated successfully!");
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100';
      case 'read':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';
      case 'responded':
        return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
      case 'archived':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100';
      case 'high':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-100';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-12">
        <h2 className="heading-lg">
          Contact Form Submissions
        </h2>
        <div className="flex items-center space-x-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border-2 border-light-gray dark:border-medium-gray rounded-full bg-white dark:bg-deep-blue text-medium-gray dark:text-white focus:outline-none focus:ring-2 focus:ring-warm-orange transition-all duration-300"
          >
            <option value="">All Status</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="responded">Responded</option>
            <option value="archived">Archived</option>
          </select>
          <div className="text-sm text-medium-gray dark:text-medium-gray-light font-medium">
            Total: {contacts?.length || 0}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {contacts?.map((contact, index) => (
          <div
            key={contact._id}
            className="card slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <h3 className="font-semibold text-deep-blue dark:text-white mr-4">
                    {contact.name}
                  </h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(contact.status)}`}>
                    {contact.status}
                  </span>
                  <span className={`ml-2 px-2 py-1 text-xs rounded-full ${getPriorityColor(contact.priority)}`}>
                    {contact.priority}
                  </span>
                </div>
                <div className="text-sm text-medium-gray dark:text-medium-gray-light mb-2">
                  <span className="mr-4">📧 {contact.email}</span>
                  {contact.phone && <span className="mr-4">📞 {contact.phone}</span>}
                  <span>🌐 {contact.language}</span>
                </div>
                <h4 className="font-medium text-deep-blue dark:text-white mb-2">
                  Subject: {contact.subject}
                </h4>
                <p className="text-medium-gray dark:text-medium-gray-light whitespace-pre-wrap">
                  {contact.message}
                </p>
              </div>
              <div className="flex flex-col space-y-2 ml-4">
                <select
                  value={contact.status}
                  onChange={(e) => handleStatusUpdate(contact._id, e.target.value)}
                  className="px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="new">New</option>
                  <option value="read">Read</option>
                  <option value="responded">Responded</option>
                  <option value="archived">Archived</option>
                </select>
                <select
                  value={contact.priority}
                  onChange={(e) => handleStatusUpdate(contact._id, contact.status, e.target.value)}
                  className="px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-600 pt-2">
              Submitted: {new Date(contact._creationTime).toLocaleString()}
            </div>
          </div>
        ))}

        {(!contacts || contacts.length === 0) && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">📧</div>
            <p className="text-gray-600 dark:text-gray-400">
              No contact form submissions yet. They will appear here when visitors submit the contact form.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
