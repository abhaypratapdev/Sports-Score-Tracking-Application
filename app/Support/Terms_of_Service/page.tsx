"use client"

export default function TermsOfServicePage() {
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
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/90 to-red-600/90 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-red-100"></div>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
              Terms of Service
            </h1>
            <p className="text-xl text-orange-100 leading-relaxed">
              Last updated: November 9, 2025
            </p>
          </div>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="py-16">
          <div className="bg-orange-50 rounded-2xl p-8 mb-12 border border-orange-200">
            <p className="text-gray-700 leading-relaxed text-lg">
              Welcome to SportsPulse. By accessing or using our website, you agree to be bound by these Terms of Service. Please read them carefully before using our services.
            </p>
          </div>

          <div className="space-y-12">
            {/* Section 1 */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                By accessing and using SportsPulse ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this service. We reserve the right to modify these terms at any time, and your continued use of the Service constitutes acceptance of any changes.
              </p>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">2. Use License</h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-4">
                Permission is granted to temporarily access the materials (information or software) on SportsPulse's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc pl-6 space-y-3 text-gray-600 text-lg">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or public display</li>
                <li>Attempt to decompile or reverse engineer any software contained on the website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                <li>Use any automated system to access the Service in a manner that sends more request messages than a human can reasonably produce</li>
              </ul>
              <p className="text-gray-600 leading-relaxed text-lg mt-4">
                This license shall automatically terminate if you violate any of these restrictions and may be terminated by SportsPulse at any time.
              </p>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">3. User Accounts</h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-4">
                When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg mb-4">
                You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
              </p>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">4. Content Accuracy and Availability</h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-4">
                While we strive to provide accurate and up-to-date sports scores, news, and information, SportsPulse does not warrant that the materials on its website are accurate, complete, reliable, or current. We rely on third-party data providers and cannot guarantee 100% accuracy.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                SportsPulse may make changes to the materials contained on its website at any time without notice. However, SportsPulse does not make any commitment to update the materials. The Service may be temporarily unavailable from time to time for maintenance or other reasons.
              </p>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">5. Links to Third-Party Sites</h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-4">
                Our Service may contain links to third-party websites or services that are not owned or controlled by SportsPulse. SportsPulse has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                You further acknowledge and agree that SportsPulse shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such websites or services.
              </p>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">6. Prohibited Uses</h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-4">
                You may not use our Service:
              </p>
              <ul className="list-disc pl-6 space-y-3 text-gray-600 text-lg">
                <li>In any way that violates any applicable national or international law or regulation</li>
                <li>To transmit, or procure the sending of, any advertising or promotional material without our prior written consent, including any "junk mail", "chain letter", "spam", or any other similar solicitation</li>
                <li>To impersonate or attempt to impersonate the Company, a Company employee, another user, or any other person or entity</li>
                <li>In any way that infringes upon the rights of others, or in any way is illegal, threatening, fraudulent, or harmful, or in connection with any unlawful, illegal, fraudulent, or harmful purpose or activity</li>
                <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Service, or which, as determined by us, may harm the Company or users of the Service or expose them to liability</li>
                <li>To introduce any viruses, trojan horses, worms, logic bombs, or other material which is malicious or technologically harmful</li>
                <li>To attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of the Service, the server on which the Service is stored, or any server, computer, or database connected to the Service</li>
              </ul>
            </div>

            {/* Section 7 */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">7. Intellectual Property</h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-4">
                The Service and its original content, features, and functionality are and will remain the exclusive property of SportsPulse and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of SportsPulse. Nothing in these Terms constitutes a transfer of any intellectual property rights from us to you.
              </p>
            </div>

            {/* Section 8 */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">8. User-Generated Content</h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-4">
                Our Service may allow you to post, link, store, share and otherwise make available certain information, text, graphics, or other material. You are responsible for the content that you post on or through the Service, including its legality, reliability, and appropriateness.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                By posting content on or through the Service, you grant us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such content on and through the Service. You retain all of your rights to any content you submit, post or display on or through the Service.
              </p>
            </div>

            {/* Section 9 */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">9. Termination</h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-4">
                We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg mb-4">
                If you wish to terminate your account, you may simply discontinue using the Service or contact us to request account deletion.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
              </p>
            </div>

            {/* Section 10 */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">10. Limitation of Liability</h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-4">
                In no event shall SportsPulse, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
              </p>
              <ul className="list-disc pl-6 space-y-3 text-gray-600 text-lg">
                <li>Your access to or use of or inability to access or use the Service</li>
                <li>Any conduct or content of any third party on the Service</li>
                <li>Any content obtained from the Service</li>
                <li>Unauthorized access, use or alteration of your transmissions or content</li>
              </ul>
              <p className="text-gray-600 leading-relaxed text-lg mt-4">
                In no event shall our aggregate liability for all claims relating to the Service exceed one hundred U.S. dollars ($100.00).
              </p>
            </div>

            {/* Section 11 */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">11. Disclaimer</h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-4">
                Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                SportsPulse, its subsidiaries, affiliates, and its licensors do not warrant that: (a) the Service will function uninterrupted, secure or available at any particular time or location; (b) any errors or defects will be corrected; (c) the Service is free of viruses or other harmful components; or (d) the results of using the Service will meet your requirements.
              </p>
            </div>

            {/* Section 12 */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">12. Indemnification</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                You agree to defend, indemnify and hold harmless SportsPulse and its licensee and licensors, and their employees, contractors, agents, officers and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees), resulting from or arising out of: (a) your use and access of the Service; (b) your violation of any term of these Terms; (c) your violation of any third party right, including without limitation any copyright, property, or privacy right; or (d) any claim that your content caused damage to a third party.
              </p>
            </div>

            {/* Section 13 */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">13. Governing Law</h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-4">
                These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
              </p>
            </div>

            {/* Section 14 */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">14. Dispute Resolution</h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-4">
                Any dispute arising out of or relating to these Terms or the Service shall first be attempted to be resolved through good faith negotiations between the parties. If the dispute cannot be resolved through negotiations, it shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                The arbitration shall take place in New York, New York, and shall be conducted in English. The decision of the arbitrator shall be final and binding upon the parties.
              </p>
            </div>

            {/* Section 15 */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">15. Changes to Terms</h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-4">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Service.
              </p>
            </div>

            {/* Section 16 */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">16. Severability</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                If any provision of these Terms is found to be unenforceable or invalid under any applicable law, such unenforceability or invalidity shall not render these Terms unenforceable or invalid as a whole, and such provisions shall be deleted without affecting the remaining provisions herein.
              </p>
            </div>

            {/* Section 17 */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">17. Entire Agreement</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                These Terms constitute the entire agreement between you and SportsPulse regarding the use of the Service, superseding any prior agreements between you and SportsPulse relating to your use of the Service.
              </p>
            </div>

            {/* Contact Section */}
            <div className="bg-gray-50 rounded-2xl p-10 border border-gray-200 mt-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-6">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2">
                <p className="text-gray-900 font-semibold text-lg">
                  Email: legal@sportspulse.com
                </p>
                <p className="text-gray-900 font-semibold text-lg">
                  Phone: +91 8299523024
                </p>
                <p className="text-gray-900 font-semibold text-lg">
                  Address: GLA University, Mathura, Uttar Pradesh, India
                </p>
              </div>
            </div>
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