"use client"

import { useState } from "react"

export default function ConsumerSupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const faqs = [
    {
      question: "How do I watch live matches?",
      answer: "Navigate to the Football or Cricket page and click on any live match card. You'll be able to see live scores and match statistics in real-time."
    },
    {
      question: "Are the scores updated in real-time?",
      answer: "Yes, all match scores are updated in real-time. Our system pulls data every few seconds to ensure you get the most current information."
    },
    {
      question: "Can I customize which sports I see?",
      answer: "Currently, you can filter by sport on the homepage or visit dedicated pages for Football and Cricket. More customization options are coming soon."
    },
    {
      question: "How do I report incorrect information?",
      answer: "If you notice any incorrect scores or information, please use the Contact Us page to report it. We'll investigate and fix it as soon as possible."
    },
    {
      question: "Is there a mobile app available?",
      answer: "We're currently working on mobile apps for iOS and Android. In the meantime, our website is fully responsive and works great on mobile browsers."
    },
    {
      question: "How can I get notifications for my favorite teams?",
      answer: "Team notification features are coming soon. Stay tuned for updates on our news page."
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Glass Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold text-gray-900">SportsPulse</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-gray-600 hover:text-gray-900 transition-colors">Home</a>
              <a href="/football" className="text-gray-600 hover:text-gray-900 transition-colors">Football</a>
              <a href="/cricket" className="text-gray-600 hover:text-gray-900 transition-colors">Cricket</a>
              <a href="/news" className="text-gray-600 hover:text-gray-900 transition-colors">News</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[400px] mt-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-indigo-600/90 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-100"></div>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
              Consumer Support
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              We're here to help! Find answers to common questions or reach out to our support team.
            </p>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Quick Help Section */}
        <section className="py-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Quick Help</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "📚",
                title: "Getting Started",
                description: "New to SportsPulse? Learn the basics of navigating our platform and accessing live scores.",
                link: "#getting-started"
              },
              {
                icon: "🔔",
                title: "Notifications",
                description: "Set up alerts for your favorite teams and never miss an important match.",
                link: "#notifications"
              },
              {
                icon: "⚙️",
                title: "Account Settings",
                description: "Manage your profile, preferences, and customize your experience.",
                link: "#account"
              }
            ].map((item) => (
              <a
                key={item.title}
                href={item.link}
                className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </a>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 border-t border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 text-lg">{faq.question}</span>
                  <span className="text-2xl text-gray-400">
                    {openFaq === index ? "−" : "+"}
                  </span>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 pb-24 border-t border-gray-200">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-12 text-center border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Still Need Help?</h2>
            <p className="text-gray-600 mb-8 text-lg max-w-2xl mx-auto">
              Can't find what you're looking for? Our support team is ready to assist you.
            </p>
            <a
              href="/Support/Contact_us"
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-500/30"
            >
              Contact Support
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                <span className="text-white font-bold">S</span>
              </div>
              <span className="text-xl font-bold text-gray-900">SportsPulse</span>
            </div>
            <p className="text-gray-600 text-sm mb-4">© 2025 SportsPulse. All rights reserved.</p>
            <div className="flex items-center justify-center space-x-6">
              <a href="/Support/Consumer_Support" className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">Support</a>
              <a href="/Support/Contact_us" className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">Contact</a>
              <a href="/Support/Privacy_Policy" className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">Privacy Policy</a>
              <a href="/Support/Terms_of_Service" className="text-blue-600 font-semibold text-sm">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}