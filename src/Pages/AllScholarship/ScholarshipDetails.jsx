import { Link, useParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";

const ScholarshipDetails = () => {
  const { user } = useAuth();
  const studentEmail = user?.email;
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: scholarship = [], isLoading } = useQuery({
    queryKey: ["scholarship", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/scholarship/${id}`);
      return res.data;
    },
  });

  const { data: applicationData, isLoading: appLoading } = useQuery({
    queryKey: ["application", studentEmail, id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/handle-button/${id}?email=${studentEmail}`);
      return res.data;
    },
    enabled: !!studentEmail && !!id,
  });

  const { data: reviews = [], isLoading: reviewsLoading } = useQuery({
    queryKey: ['reviews', scholarship?.scholarshipName],
    enabled: !!scholarship?.scholarshipName,
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews-single-scholarship/${scholarship.scholarshipName}`);
      return res.data;
    }
  });

  // Calculate average rating
  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 0;

  if (isLoading || appLoading || reviewsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Loading scholarship details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link to="/scholarships" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors duration-200">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Scholarships
        </Link>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Hero Section with Image */}
          <div className="relative h-72 md:h-96 lg:h-[28rem]">
            <img
              src={scholarship.image || "https://images.unsplash.com/photo-1523050854058-8df90110c7f1?w=1200"}
              alt={scholarship.universityName}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            
            {/* University Badge */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                    {scholarship.scholarshipName}
                  </h1>
                  <div className="flex items-center text-white/90 text-lg">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span>{scholarship.universityName}</span>
                  </div>
                </div>
                <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 border border-white/30">
                  <svg className="w-5 h-5 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span className="text-white font-semibold">{scholarship.degree}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 md:p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Details - Left Side */}
              <div className="lg:col-span-2 space-y-8">
                {/* Scholarship Overview */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Scholarship Overview</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <DetailCard
                      icon={
                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      }
                      label="Country"
                      value={scholarship.country}
                    />
                    <DetailCard
                      icon={
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      }
                      label="City"
                      value={scholarship.city}
                    />
                    <DetailCard
                      icon={
                        <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      }
                      label="Subject Category"
                      value={scholarship.subjectCategory}
                    />
                    <DetailCard
                      icon={
                        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      }
                      label="Application Deadline"
                      value={new Date(scholarship.deadline).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    />
                  </div>
                </div>

                {/* Description */}
                {scholarship.description && (
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                    <p className="text-gray-700 leading-relaxed">{scholarship.description}</p>
                  </div>
                )}

                {/* Reviews Section */}
                <div className="border-t border-gray-200 pt-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <h2 className="text-2xl font-bold text-gray-900">Reviews</h2>
                      {reviews.length > 0 && (
                        <span className="ml-3 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                          {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
                        </span>
                      )}
                    </div>
                    {reviews.length > 0 && (
                      <div className="flex items-center bg-yellow-50 px-4 py-2 rounded-lg">
                        <svg className="w-5 h-5 text-yellow-400 fill-yellow-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                        <span className="font-bold text-gray-900">{averageRating}</span>
                        <span className="text-gray-500 text-sm ml-1">/ 5.0</span>
                      </div>
                    )}
                  </div>

                  {reviews.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-2xl">
                      <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <p className="text-gray-500 text-lg">No reviews yet for this scholarship</p>
                      <p className="text-gray-400 text-sm mt-1">Be the first to share your experience!</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {reviews.map((review) => (
                        <ReviewCard key={review._id || review.applicationId} review={review} />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar - Fees & Actions */}
              <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 sticky top-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Fee Details</h3>
                  
                  <div className="space-y-4 mb-8">
                    <FeeCard
                      icon={
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      }
                      label="Tuition Fees"
                      value={scholarship.tuitionFees}
                    />
                    <FeeCard
                      icon={
                        <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                      }
                      label="Application Fees"
                      value={scholarship.applicationFees}
                    />
                    <div className="flex items-center justify-between bg-white/60 rounded-lg px-4 py-3">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm font-medium text-gray-700">Status</span>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                        Open
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  {applicationData?.applied ? (
                    <button
                      className="w-full bg-gray-300 text-gray-600 font-semibold py-4 rounded-xl cursor-not-allowed transition-all duration-300"
                      disabled
                    >
                      <div className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Already Applied
                      </div>
                    </button>
                  ) : (
                    <Link to={`/payment/${scholarship._id}`}>
                      <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-blue-500/25">
                        <div className="flex items-center justify-center">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                          Apply Now
                        </div>
                      </button>
                    </Link>
                  )}

                  <p className="text-xs text-gray-500 text-center mt-4">
                    Secure application process. Your information is protected.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Review Card Component
const ReviewCard = ({ review }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between">
        <div className="flex items-center flex-1">
          <img
            src={review.userImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.userName)}&background=random`}
            alt={review.userName}
            className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(review.userName)}&background=random`;
            }}
          />
          <div className="ml-4">
            <h4 className="font-semibold text-gray-900 text-lg">{review.userName}</h4>
            <div className="flex items-center mt-1 space-x-2">
              {renderStars(review.rating)}
              <span className="text-sm text-gray-400">•</span>
              <span className="text-sm text-gray-400">{formatDate(review.reviewDate)}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
          <span className="font-bold text-blue-700 text-sm">{review.rating}</span>
          <span className="text-blue-400 text-sm mx-0.5">/</span>
          <span className="text-blue-400 text-sm">5</span>
        </div>
      </div>
      
      {review.comment && (
        <div className="mt-4 ml-16">
          <div className="relative">
            <svg className="absolute -top-1 -left-3 w-6 h-6 text-gray-200 fill-current" viewBox="0 0 24 24">
              <path d="M10 11h-4v-4h4v4zm8 0h-4v-4h4v4zm-8 8h-4v-4h4v4zm8 0h-4v-4h4v4z"/>
            </svg>
            <p className="text-gray-700 leading-relaxed pl-4">{review.comment}</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper Components
const DetailCard = ({ icon, label, value }) => (
  <div className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow duration-200">
    <div className="flex items-center mb-1">
      {icon}
      <span className="text-sm font-medium text-gray-500 ml-2">{label}</span>
    </div>
    <p className="text-gray-900 font-semibold text-lg">{value || 'N/A'}</p>
  </div>
);

const FeeCard = ({ icon, label, value }) => (
  <div className="flex items-center justify-between bg-white rounded-lg px-4 py-3 shadow-sm">
    <div className="flex items-center">
      {icon}
      <span className="text-sm font-medium text-gray-700 ml-2">{label}</span>
    </div>
    <span className="text-gray-900 font-bold">${value || 'N/A'}</span>
  </div>
);

export default ScholarshipDetails;