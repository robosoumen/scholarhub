import useAuth from "../../Hooks/useAuth";
import { FaUser, FaEnvelope, FaCalendarAlt, FaGraduationCap } from "react-icons/fa";

const MyProfile = () => {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
                </div>

                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    {/* Profile Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8 sm:px-10">
                        <div className="flex items-center space-x-6">
                            <img
                                src={user?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || "User")}&background=random&size=100`}
                                alt={user?.displayName}
                                className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover"
                                onError={(e) => {
                                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || "User")}&background=random&size=100`;
                                }}
                            />
                            <div className="text-white">
                                <h2 className="text-2xl font-bold">{user?.displayName || "User"}</h2>
                                <p className="text-blue-100 flex items-center">
                                    <FaEnvelope className="w-4 h-4 mr-2" />
                                    {user?.email}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 sm:p-10">
                        {/* Info Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InfoCard 
                                icon={<FaUser className="w-5 h-5" />} 
                                label="Full Name" 
                                value={user?.displayName || "Not provided"} 
                            />
                            <InfoCard 
                                icon={<FaEnvelope className="w-5 h-5" />} 
                                label="Email" 
                                value={user?.email || "Not provided"} 
                            />
                            <InfoCard 
                                icon={<FaCalendarAlt className="w-5 h-5" />} 
                                label="Member Since" 
                                value="January 2024" 
                            />
                            <InfoCard 
                                icon={<FaGraduationCap className="w-5 h-5" />} 
                                label="Scholarships Applied" 
                                value="5" 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const InfoCard = ({ icon, label, value }) => (
    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:shadow-md transition-shadow duration-200">
        <div className="text-blue-600">{icon}</div>
        <div>
            <p className="text-xs text-gray-500">{label}</p>
            <p className="text-gray-900 font-medium">{value}</p>
        </div>
    </div>
);

export default MyProfile;