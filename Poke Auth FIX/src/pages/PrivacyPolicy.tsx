import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-brand-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Back */}
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 sm:p-12">
          <h1 className="text-3xl sm:text-4xl font-black text-white font-display mb-2">
            Privacy <span className="text-red-500">Policy</span>
          </h1>
          <p className="text-sm text-gray-500 mb-10">Last updated: February 20, 2026</p>

          <div className="space-y-8 text-gray-300 text-sm leading-relaxed">
            {/* 1 */}
            <section>
              <h2 className="text-lg font-bold text-white mb-3">1. Introduction</h2>
              <p>
                PokéMarket ("we", "us", "our") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, store, and share your information when you use our website and services. By using PokéMarket, you consent to the practices described in this policy.
              </p>
            </section>

            {/* 2 */}
            <section>
              <h2 className="text-lg font-bold text-white mb-3">2. Information We Collect</h2>
              <p className="mb-3">We collect the following types of information:</p>

              <h3 className="text-white font-semibold mt-4 mb-2">2.1 Information You Provide</h3>
              <ul className="list-disc list-inside space-y-1.5 ml-2">
                <li><strong className="text-white">Account Information:</strong> Username, email address, and password (stored as a secure bcrypt hash — we never store your plaintext password).</li>
                <li><strong className="text-white">Profile Information:</strong> Avatar, bio, and other optional profile details you choose to share.</li>
                <li><strong className="text-white">Listing Data:</strong> Card details, descriptions, images, pricing, and condition information for cards you list.</li>
                <li><strong className="text-white">Messages:</strong> Communications sent through our messaging system to other users.</li>
              </ul>

              <h3 className="text-white font-semibold mt-4 mb-2">2.2 Information Collected Automatically</h3>
              <ul className="list-disc list-inside space-y-1.5 ml-2">
                <li><strong className="text-white">Usage Data:</strong> Pages visited, features used, search queries, and interaction patterns.</li>
                <li><strong className="text-white">Device Information:</strong> Browser type, operating system, screen resolution, and device identifiers.</li>
                <li><strong className="text-white">IP Address:</strong> Used for security, fraud prevention, and rate limiting.</li>
                <li><strong className="text-white">Cookies:</strong> We use httpOnly cookies for authentication (access tokens and refresh tokens). These are essential for the Service to function and cannot be opted out of.</li>
              </ul>
            </section>

            {/* 3 */}
            <section>
              <h2 className="text-lg font-bold text-white mb-3">3. How We Use Your Information</h2>
              <p className="mb-3">We use your information for the following purposes:</p>
              <ul className="list-disc list-inside space-y-1.5 ml-2">
                <li><strong className="text-white">Account Management:</strong> To create and maintain your account, authenticate your identity, and provide customer support.</li>
                <li><strong className="text-white">Marketplace Operations:</strong> To facilitate buying, selling, trading, and auctioning of cards between users.</li>
                <li><strong className="text-white">Security:</strong> To detect, prevent, and respond to fraud, unauthorized access, and other harmful activities.</li>
                <li><strong className="text-white">Communication:</strong> To send you transaction notifications, security alerts, and important service updates.</li>
                <li><strong className="text-white">Improvement:</strong> To analyze usage patterns, improve our features, and enhance user experience.</li>
              </ul>
            </section>

            {/* 4 */}
            <section>
              <h2 className="text-lg font-bold text-white mb-3">4. Data Storage and Security</h2>
              <p className="mb-3">We take data security seriously and implement the following measures:</p>
              <ul className="list-disc list-inside space-y-1.5 ml-2">
                <li><strong className="text-white">Password Security:</strong> All passwords are hashed using bcrypt with 12 salt rounds. We never store plaintext passwords.</li>
                <li><strong className="text-white">Token Security:</strong> Refresh tokens are hashed using SHA-256 before storage. Access tokens expire after 15 minutes.</li>
                <li><strong className="text-white">Cookie Security:</strong> Authentication cookies are httpOnly (inaccessible to JavaScript), use SameSite=Lax to prevent CSRF, and are marked Secure in production.</li>
                <li><strong className="text-white">Rate Limiting:</strong> Login and registration endpoints are rate-limited to prevent brute-force attacks.</li>
                <li><strong className="text-white">Database:</strong> User data is stored in a PostgreSQL database hosted on Supabase with encryption at rest.</li>
                <li><strong className="text-white">HTTPS:</strong> All data in transit is encrypted using TLS/SSL.</li>
              </ul>
              <p className="mt-3">
                While we implement industry-standard security measures, no method of electronic storage or transmission is 100% secure. We cannot guarantee absolute security of your data.
              </p>
            </section>

            {/* 5 */}
            <section>
              <h2 className="text-lg font-bold text-white mb-3">5. Data Sharing</h2>
              <p className="mb-3">We do not sell your personal data. We may share information in the following circumstances:</p>
              <ul className="list-disc list-inside space-y-1.5 ml-2">
                <li><strong className="text-white">Public Profile:</strong> Your username, avatar, rating, review count, and sales count are visible to other users.</li>
                <li><strong className="text-white">Transaction Partners:</strong> When you complete a transaction, relevant contact and shipping information may be shared with the other party.</li>
                <li><strong className="text-white">Service Providers:</strong> We use third-party services (Supabase for database hosting, payment processors) who may process data on our behalf under strict data processing agreements.</li>
                <li><strong className="text-white">Legal Requirements:</strong> We may disclose information if required by law, court order, or to protect the rights, safety, or property of PokéMarket or its users.</li>
              </ul>
            </section>

            {/* 6 */}
            <section>
              <h2 className="text-lg font-bold text-white mb-3">6. Your Rights</h2>
              <p className="mb-3">Depending on your jurisdiction, you may have the following rights:</p>
              <ul className="list-disc list-inside space-y-1.5 ml-2">
                <li><strong className="text-white">Access:</strong> Request a copy of the personal data we hold about you.</li>
                <li><strong className="text-white">Correction:</strong> Request correction of inaccurate or incomplete data.</li>
                <li><strong className="text-white">Deletion:</strong> Request deletion of your account and associated personal data.</li>
                <li><strong className="text-white">Portability:</strong> Request your data in a machine-readable format.</li>
                <li><strong className="text-white">Objection:</strong> Object to certain processing of your data.</li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, contact us at{' '}
                <a href="mailto:privacy@pokemarket.com" className="text-red-400 hover:text-red-300 underline">privacy@pokemarket.com</a>.
                We will respond within 30 days.
              </p>
            </section>

            {/* 7 */}
            <section>
              <h2 className="text-lg font-bold text-white mb-3">7. Data Retention</h2>
              <p>
                We retain your account data for as long as your account is active. If you delete your account, we will remove your personal data within 30 days, except where we are required to retain it for legal or regulatory purposes. Transaction records may be retained for up to 7 years for tax and compliance purposes. Expired refresh tokens are automatically deleted from our database.
              </p>
            </section>

            {/* 8 */}
            <section>
              <h2 className="text-lg font-bold text-white mb-3">8. Children's Privacy</h2>
              <p>
                PokéMarket is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected data from a child under 13, please contact us immediately and we will take steps to delete it.
              </p>
            </section>

            {/* 9 */}
            <section>
              <h2 className="text-lg font-bold text-white mb-3">9. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. When we make material changes, we will notify you by email or by posting a prominent notice on the Service. The "Last updated" date at the top of this policy indicates when it was last revised. Your continued use of the Service after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            {/* 10 */}
            <section>
              <h2 className="text-lg font-bold text-white mb-3">10. Contact Us</h2>
              <p>
                If you have any questions or concerns about this Privacy Policy, please contact us at{' '}
                <a href="mailto:privacy@pokemarket.com" className="text-red-400 hover:text-red-300 underline">privacy@pokemarket.com</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
