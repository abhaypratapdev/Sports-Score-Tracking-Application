export function Footer() {
  return (
    <div>
      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* About Section */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <span className="text-white font-bold">S</span>
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-gray-100">SportsPulse</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                SportsPulse brings you the latest scores, updates, and insights from the world of sports — football, cricket, and beyond. Stay connected and stay in the game.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-gray-900 dark:text-gray-100 font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li><a href="/football" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Football</a></li>
                <li><a href="/cricket" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Cricket</a></li>
                <li><a href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Matches</a></li>
                <li><a href="/news" className="hover:text-blue-600 dark:hover:text-blue-400 transition">News</a></li>
              </ul>
            </div>

            {/* Support & Policy */}
            <div>
              <h3 className="text-gray-900 dark:text-gray-100 font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li><a href="/Support/Privacy_Policy" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Privacy Policy</a></li>
                <li><a href="/Support/Terms_of_Service" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Terms of Service</a></li>
                <li><a href="/Support/Comsumer_Support" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Consumer Support</a></li>
                <li><a href="/Support/Contact_us" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Contact Us</a></li>
              </ul>
            </div>

            {/* Contact Form */}
            <div>
              <h3 className="text-gray-900 dark:text-gray-100 font-semibold mb-4">Send a Message</h3>
              <form className="space-y-3">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-gray-100"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-gray-100"
                />
                <textarea
                  placeholder="Your Message"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-gray-100"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-sm font-medium py-2 rounded-md shadow-md hover:shadow-lg transition"
                >
                  Send
                </button>
              </form>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="mt-10 border-t border-gray-200 dark:border-slate-700 pt-6 text-center">
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              © 2025 <span className="font-semibold text-gray-900 dark:text-gray-100">SportsPulse</span>. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
