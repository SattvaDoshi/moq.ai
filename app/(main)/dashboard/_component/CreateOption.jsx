import { Phone, Video } from 'lucide-react';
import React from 'react';

const CreateOption = () => {
  return (
    <div className="w-full px-5 py-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
      {/* Video Interview Card */}
      <div className="relative p-6 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl hover:scale-105 transition-transform duration-300 group">
        {/* Background glow */}
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="relative z-10 flex flex-col items-start gap-3">
          <div className="p-3 rounded-xl bg-purple-500/20 border border-purple-400/30 text-purple-200">
            <Video className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-semibold bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent">
            Create Interview
          </h2>
          <p className="text-white/60 text-sm">
            Create a new interview
          </p>
        </div>
      </div>

      {/* Phone Screening Card */}
      <div className="relative p-6 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl hover:scale-105 transition-transform duration-300 group">
        {/* Background glow */}
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="relative z-10 flex flex-col items-start gap-3">
          <div className="p-3 rounded-xl bg-blue-500/20 border border-blue-400/30 text-blue-200">
            <Phone className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-200 to-green-200 bg-clip-text text-transparent">
            Create Phone Screening
          </h2>
          <p className="text-white/60 text-sm">
            Create a new phone screening call
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateOption;
