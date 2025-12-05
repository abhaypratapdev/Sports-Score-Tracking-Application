import React, { useState } from 'react';

interface FormData {
  email: string;
  password: string;
  name?: string;
  confirmPassword?: string;
}

const SportsAuthPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [loginData, setLoginData] = useState<FormData>({ email: '', password: '' });
  const [signupData, setSignupData] = useState<FormData>({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (loginData.email && loginData.password) {
      alert(`Login successful for ${loginData.email}!\n\nRedirecting to dashboard...`);
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleSignup = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!signupData.name || !signupData.email || !signupData.password || !signupData.confirmPassword) {
      alert('Please fill in all fields');
      return;
    }
    if (signupData.password !== signupData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (signupData.password.length < 8) {
      alert('Password must be at least 8 characters');
      return;
    }
    alert(`Account created for ${signupData.name}!\n\nWelcome to ScoreTrack Pro!`);
  };

  const handleSocialLogin = (provider: string) => {
    alert(`${provider} login coming soon!`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-900 via-blue-700 to-purple-700">
      {/* Navbar */}
      <nav className="bg-black bg-opacity-90 px-8 py-4 shadow-lg">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-red-500 rounded-lg flex items-center justify-center text-xl">
              ⚽
            </div>
            <span className="text-white text-2xl font-bold">ScoreTrack Pro</span>
          </div>
          <ul className="flex gap-8 list-none">
            <li><a href="#home" className="text-white font-medium hover:text-amber-500 transition-colors">Home</a></li>
            <li><a href="#scores" className="text-white font-medium hover:text-amber-500 transition-colors">Live Scores</a></li>
            <li><a href="#leagues" className="text-white font-medium hover:text-amber-500 transition-colors">Leagues</a></li>
            <li><a href="#about" className="text-white font-medium hover:text-amber-500 transition-colors">About</a></li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="bg-white bg-opacity-95 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
          {/* Tabs */}
          <div className="flex bg-gray-100">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-4 text-center font-semibold transition-all ${
                activeTab === 'login'
                  ? 'bg-white text-blue-900 border-b-4 border-amber-500'
                  : 'text-gray-600'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab('signup')}
              className={`flex-1 py-4 text-center font-semibold transition-all ${
                activeTab === 'signup'
                  ? 'bg-white text-blue-900 border-b-4 border-amber-500'
                  : 'text-gray-600'
              }`}
            >
              Sign Up
            </button>
          </div>

          <div className="p-10">
            {/* Login Form */}
            {activeTab === 'login' && (
              <div className="animate-fadeIn">
                <h2 className="text-3xl font-bold text-blue-900 mb-2">Welcome Back!</h2>
                <p className="text-gray-600 mb-8 text-sm">Track your favorite teams and never miss a score</p>

                <div className="flex gap-4 mb-6">
                  <button
                    onClick={() => handleSocialLogin('Google')}
                    className="flex-1 py-3 border-2 border-gray-300 rounded-xl bg-white hover:border-amber-500 hover:bg-amber-50 transition-all font-medium flex items-center justify-center gap-2"
                  >
                    <span>🔍</span> Google
                  </button>
                  <button
                    onClick={() => handleSocialLogin('Facebook')}
                    className="flex-1 py-3 border-2 border-gray-300 rounded-xl bg-white hover:border-amber-500 hover:bg-amber-50 transition-all font-medium flex items-center justify-center gap-2"
                  >
                    <span>📘</span> Facebook
                  </button>
                </div>

                <div className="flex items-center my-6 text-gray-500 text-sm">
                  <div className="flex-1 h-px bg-gray-300"></div>
                  <span className="px-4">or continue with email</span>
                  <div className="flex-1 h-px bg-gray-300"></div>
                </div>

                <div>
                  <div className="mb-6">
                    <label className="block mb-2 text-gray-700 font-medium text-sm">Email Address</label>
                    <input
                      type="email"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-100 transition-all"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block mb-2 text-gray-700 font-medium text-sm">Password</label>
                    <input
                      type="password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-100 transition-all"
                    />
                  </div>

                  <div className="text-right mb-6">
                    <a href="#forgot" className="text-amber-500 text-sm font-medium hover:underline">
                      Forgot password?
                    </a>
                  </div>

                  <button
                    onClick={handleLogin}
                    className="w-full py-4 bg-gradient-to-r from-amber-500 to-red-500 text-white rounded-xl font-semibold hover:shadow-lg hover:-translate-y-1 active:translate-y-0 transition-all"
                  >
                    Login to Dashboard
                  </button>
                </div>
              </div>
            )}

            {/* Sign Up Form */}
            {activeTab === 'signup' && (
              <div className="animate-fadeIn">
                <h2 className="text-3xl font-bold text-blue-900 mb-2">Create Account</h2>
                <p className="text-gray-600 mb-8 text-sm">Join thousands of sports fans tracking scores</p>

                <div className="flex gap-4 mb-6">
                  <button
                    onClick={() => handleSocialLogin('Google')}
                    className="flex-1 py-3 border-2 border-gray-300 rounded-xl bg-white hover:border-amber-500 hover:bg-amber-50 transition-all font-medium flex items-center justify-center gap-2"
                  >
                    <span>🔍</span> Google
                  </button>
                  <button
                    onClick={() => handleSocialLogin('Facebook')}
                    className="flex-1 py-3 border-2 border-gray-300 rounded-xl bg-white hover:border-amber-500 hover:bg-amber-50 transition-all font-medium flex items-center justify-center gap-2"
                  >
                    <span>📘</span> Facebook
                  </button>
                </div>

                <div className="flex items-center my-6 text-gray-500 text-sm">
                  <div className="flex-1 h-px bg-gray-300"></div>
                  <span className="px-4">or sign up with email</span>
                  <div className="flex-1 h-px bg-gray-300"></div>
                </div>

                <div>
                  <div className="mb-6">
                    <label className="block mb-2 text-gray-700 font-medium text-sm">Full Name</label>
                    <input
                      type="text"
                      value={signupData.name}
                      onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-100 transition-all"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block mb-2 text-gray-700 font-medium text-sm">Email Address</label>
                    <input
                      type="email"
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-100 transition-all"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block mb-2 text-gray-700 font-medium text-sm">Password</label>
                    <input
                      type="password"
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      placeholder="At least 8 characters"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-100 transition-all"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block mb-2 text-gray-700 font-medium text-sm">Confirm Password</label>
                    <input
                      type="password"
                      value={signupData.confirmPassword}
                      onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                      placeholder="Re-enter password"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-100 transition-all"
                    />
                  </div>

                  <button
                    onClick={handleSignup}
                    className="w-full py-4 bg-gradient-to-r from-amber-500 to-red-500 text-white rounded-xl font-semibold hover:shadow-lg hover:-translate-y-1 active:translate-y-0 transition-all"
                  >
                    Create My Account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black bg-opacity-90 text-gray-400 py-8 px-8">
        <div className="flex justify-between items-center flex-wrap gap-4 max-w-6xl mx-auto">
          <p className="text-sm">&copy; 2024 ScoreTrack Pro. All rights reserved.</p>
          <ul className="flex gap-8 list-none">
            <li><a href="#privacy" className="text-sm hover:text-amber-500 transition-colors">Privacy Policy</a></li>
            <li><a href="#terms" className="text-sm hover:text-amber-500 transition-colors">Terms of Service</a></li>
            <li><a href="#contact" className="text-sm hover:text-amber-500 transition-colors">Contact Us</a></li>
          </ul>
        </div>
      </footer>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default SportsAuthPage;