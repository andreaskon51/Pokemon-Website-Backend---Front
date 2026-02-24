import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-brand-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Back */}
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 sm:p-12">
          <h1 className="text-3xl sm:text-4xl font-black text-white font-display mb-2">
            Terms of <span className="text-red-500">Service</span>
          </h1>
          <p className="text-sm text-gray-500 mb-10">Last updated: February 20, 2026</p>

          <div className="space-y-8 text-gray-300 text-sm leading-relaxed">
            {/* 1 */}
            <section>
              <h2 className="text-lg font-bold text-white mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing or using PokéMarket ("the Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to all of these Terms, you may not access or use the Service. We reserve the right to update or modify these Terms at any time. Your continued use of the Service after any changes constitutes acceptance of the new Terms.
              </p>
            </section>

            {/* 2 */}
            <section>
              <h2 className="text-lg font-bold text-white mb-3">2. Description of Service</h2>
              <p>
                PokéMarket is an online marketplace that enables users to buy, sell, trade, and auction Pokémon trading cards. We act as a platform connecting buyers and sellers and are not a party to any transaction between users. PokéMarket does not own, inspect, or guarantee any cards listed on the platform.
              </p>
            </section>

            {/* 3 */}
            <section>
              <h2 className="text-lg font-bold text-white mb-3">3. Account Registration</h2>
              <p className="mb-3">To use certain features of the Service, you must create an account. When creating an account, you agree to:</p>
              <ul className="list-disc list-inside space-y-1.5 ml-2">
                <li>Provide accurate, current, and complete information during registration.</li>
                <li>Maintain and promptly update your account information.</li>
                <li>Keep your password secure and confidential.</li>
                <li>Accept responsibility for all activities that occur under your account.</li>
                <li>Immediately notify PokéMarket of any unauthorized use of your account.</li>
              </ul>
              <p className="mt-3">
                You must be at least 13 years of age to create an account. If you are under 18, you must have the consent of a parent or legal guardian.
              </p>
            </section>

            {/* 4 */}
            <section>
              <h2 className="text-lg font-bold text-white mb-3">4. Listings and Transactions</h2>
              <p className="mb-3">When listing a card for sale, trade, or auction, you represent and warrant that:</p>
              <ul className="list-disc list-inside space-y-1.5 ml-2">
                <li>You are the lawful owner of the card or authorized to sell it.</li>
                <li>The card description, condition grading, images, and details are accurate and not misleading.</li>
                <li>You will fulfill any completed transaction in a timely manner (within 3 business days of payment).</li>
                <li>Auction listings are binding — you must sell to the highest bidder at or above your reserve price.</li>
              </ul>
              <p className="mt-3">
                Buyers agree that bids placed on auction items are binding. Failure to complete payment after winning an auction may result in account suspension.
              </p>
            </section>

            {/* 5 */}
            <section>
              <h2 className="text-lg font-bold text-white mb-3">5. Fees and Payments</h2>
              <p className="mb-3">PokéMarket may charge the following fees:</p>
              <ul className="list-disc list-inside space-y-1.5 ml-2">
                <li><strong className="text-white">Listing Fee:</strong> Free for standard listings. Featured or promoted listings may incur a fee.</li>
                <li><strong className="text-white">Transaction Fee:</strong> A commission of up to 5% of the final sale price may be charged to the seller upon a completed transaction.</li>
                <li><strong className="text-white">Payment Processing:</strong> Third-party payment processing fees may apply and are the responsibility of the seller.</li>
              </ul>
              <p className="mt-3">All fees are non-refundable unless otherwise stated. We reserve the right to modify our fee structure with 30 days' notice.</p>
            </section>

            {/* 6 */}
            <section>
              <h2 className="text-lg font-bold text-white mb-3">6. Prohibited Conduct</h2>
              <p className="mb-3">You agree not to:</p>
              <ul className="list-disc list-inside space-y-1.5 ml-2">
                <li>List counterfeit, stolen, or illegally obtained cards.</li>
                <li>Manipulate prices, bids, or feedback through fraudulent means (shill bidding).</li>
                <li>Harass, threaten, or abuse other users.</li>
                <li>Use automated bots, scrapers, or scripts to access the Service.</li>
                <li>Circumvent, disable, or interfere with security features of the Service.</li>
                <li>Create multiple accounts to evade bans or manipulate the platform.</li>
                <li>List non-Pokémon items or items unrelated to Pokémon trading cards.</li>
              </ul>
            </section>

            {/* 7 */}
            <section>
              <h2 className="text-lg font-bold text-white mb-3">7. Intellectual Property</h2>
              <p>
                The Service, including its design, logos, text, graphics, and software, is the property of PokéMarket and protected by intellectual property laws. Pokémon, the Pokémon logo, and related trademarks are the property of Nintendo, The Pokémon Company, and Game Freak. PokéMarket is not affiliated with, endorsed by, or sponsored by these companies. User-submitted content (listings, images, reviews) remains the property of the user, but you grant PokéMarket a non-exclusive, worldwide, royalty-free license to display and distribute such content on the platform.
              </p>
            </section>

            {/* 8 */}
            <section>
              <h2 className="text-lg font-bold text-white mb-3">8. Dispute Resolution</h2>
              <p>
                PokéMarket may, at its discretion, mediate disputes between buyers and sellers. However, we are not obligated to resolve disputes and are not liable for any losses arising from transactions between users. In the event of a dispute, users agree to first attempt to resolve the issue directly with the other party. If mediation by PokéMarket is requested, both parties agree to cooperate in good faith.
              </p>
            </section>

            {/* 9 */}
            <section>
              <h2 className="text-lg font-bold text-white mb-3">9. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, PokéMarket shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly. The Service is provided "as is" and "as available" without warranties of any kind, either express or implied. Our total liability for any claim arising from or related to the Service shall not exceed the amount you paid to PokéMarket in the 12 months preceding the claim.
              </p>
            </section>

            {/* 10 */}
            <section>
              <h2 className="text-lg font-bold text-white mb-3">10. Account Termination</h2>
              <p>
                PokéMarket reserves the right to suspend or terminate your account at any time, with or without notice, for conduct that we determine violates these Terms or is harmful to other users, third parties, or the Service. You may delete your account at any time by contacting support. Upon termination, your right to use the Service ceases immediately, but sections of these Terms that by their nature should survive will remain in effect.
              </p>
            </section>

            {/* 11 */}
            <section>
              <h2 className="text-lg font-bold text-white mb-3">11. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which PokéMarket operates, without regard to conflict of law principles. Any legal action or proceeding arising under these Terms shall be brought exclusively in the courts located within that jurisdiction.
              </p>
            </section>

            {/* 12 */}
            <section>
              <h2 className="text-lg font-bold text-white mb-3">12. Contact Information</h2>
              <p>
                If you have any questions about these Terms, please contact us at{' '}
                <a href="mailto:support@pokemarket.com" className="text-red-400 hover:text-red-300 underline">support@pokemarket.com</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
