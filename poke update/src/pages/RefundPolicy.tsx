import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-brand-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Back */}
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 sm:p-12">
          <h1 className="text-3xl sm:text-4xl font-black text-white font-display mb-2">
            Refund <span className="text-red-500">Policy</span>
          </h1>
          <p className="text-sm text-gray-500 mb-10">Last updated: February 20, 2026</p>

          <div className="space-y-8 text-gray-300 text-sm leading-relaxed">
            {/* 1 */}
            <section>
              <h2 className="text-lg font-bold text-white mb-3">1. Overview</h2>
              <p>
                PokéMarket is a peer-to-peer marketplace. When you purchase a card, you are buying directly from another user — not from PokéMarket. This Refund Policy outlines the circumstances under which refunds may be granted and the process for requesting one. We are committed to ensuring fair transactions for both buyers and sellers.
              </p>
            </section>

            {/* 2 */}
            <section>
              <h2 className="text-lg font-bold text-white mb-3">2. Buyer Protection Program</h2>
              <p className="mb-3">PokéMarket provides buyer protection under the following conditions:</p>
              <ul className="list-disc list-inside space-y-1.5 ml-2">
                <li><strong className="text-white">Item Not Received:</strong> If you do not receive your card within 14 days of the expected delivery date, you may file a claim.</li>
                <li><strong className="text-white">Item Not as Described:</strong> If the card you receive is significantly different from the listing description (wrong card, wrong condition, counterfeit, or materially damaged during shipping).</li>
                <li><strong className="text-white">Counterfeit Items:</strong> If the card is verified to be counterfeit, you are entitled to a full refund including shipping costs.</li>
              </ul>
              <p className="mt-3">
                Buyer protection claims must be filed within <strong className="text-white">7 days</strong> of receiving the item, or <strong className="text-white">21 days</strong> after the purchase date if the item was never received.
              </p>
            </section>

            {/* 3 */}
            <section>
              <h2 className="text-lg font-bold text-white mb-3">3. Eligible Refund Reasons</h2>
              <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-5 mb-4">
                <h3 className="text-green-400 font-semibold mb-2">Eligible for Refund</h3>
                <ul className="list-disc list-inside space-y-1.5 ml-2">
                  <li>Card never arrived and seller cannot provide valid tracking proof.</li>
                  <li>Card is counterfeit or a reproduction not disclosed in the listing.</li>
                  <li>Card condition is significantly worse than described (e.g., listed as PSA 9 but received as PSA 5 or lower).</li>
                  <li>Wrong card shipped (different card than what was listed and purchased).</li>
                  <li>Card was damaged during shipping due to inadequate packaging by the seller.</li>
                </ul>
              </div>
              <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-5">
                <h3 className="text-red-400 font-semibold mb-2">Not Eligible for Refund</h3>
                <ul className="list-disc list-inside space-y-1.5 ml-2">
                  <li>Buyer's remorse — you changed your mind after purchasing.</li>
                  <li>Minor condition discrepancies within one grade level.</li>
                  <li>Price drops after purchase — market value changes are not grounds for refund.</li>
                  <li>Cards accurately described as "no returns" in the listing.</li>
                  <li>Trades — completed trades are final and cannot be reversed.</li>
                  <li>Auction wins — winning bids are binding commitments.</li>
                </ul>
              </div>
            </section>

            {/* 4 */}
            <section>
              <h2 className="text-lg font-bold text-white mb-3">4. Refund Process</h2>
              <p className="mb-3">To request a refund, follow these steps:</p>
              <ol className="list-decimal list-inside space-y-3 ml-2">
                <li>
                  <strong className="text-white">Contact the Seller:</strong> First, reach out to the seller through PokéMarket's messaging system. Many issues can be resolved directly between parties.
                </li>
                <li>
                  <strong className="text-white">File a Claim:</strong> If the seller is unresponsive within 48 hours or you cannot reach an agreement, file a refund claim through your Dashboard → Order History → "Request Refund."
                </li>
                <li>
                  <strong className="text-white">Provide Evidence:</strong> Include photos of the item received, screenshots of the original listing, tracking information, and a description of the issue.
                </li>
                <li>
                  <strong className="text-white">Review Period:</strong> PokéMarket will review the claim within 5 business days. Both the buyer and seller may be asked to provide additional information.
                </li>
                <li>
                  <strong className="text-white">Resolution:</strong> Once a decision is made, the refund (if approved) will be issued within 3–5 business days to the original payment method.
                </li>
              </ol>
            </section>

            {/* 5 */}
            <section>
              <h2 className="text-lg font-bold text-white mb-3">5. Return Shipping</h2>
              <p className="mb-3">When a refund requires the item to be returned:</p>
              <ul className="list-disc list-inside space-y-1.5 ml-2">
                <li>If the refund is due to seller error (wrong item, misrepresented condition), the <strong className="text-white">seller pays return shipping</strong>.</li>
                <li>Return shipping must use a tracked method. Untracked returns are at the buyer's risk.</li>
                <li>The card must be returned in the same condition it was received. Cards that are further damaged after receipt may not qualify for a full refund.</li>
                <li>Returns must be shipped within <strong className="text-white">7 days</strong> of the refund being approved.</li>
              </ul>
            </section>

            {/* 6 */}
            <section>
              <h2 className="text-lg font-bold text-white mb-3">6. Refund Amounts</h2>
              <ul className="list-disc list-inside space-y-1.5 ml-2">
                <li><strong className="text-white">Full Refund:</strong> Issued for counterfeit items, items never received, or items significantly not as described. Includes the purchase price and original shipping cost.</li>
                <li><strong className="text-white">Partial Refund:</strong> May be offered when the item has minor discrepancies from the listing or when both parties agree to a partial resolution.</li>
                <li><strong className="text-white">PokéMarket Fees:</strong> Transaction fees charged by PokéMarket will be refunded in full when the refund is due to seller fault.</li>
              </ul>
            </section>

            {/* 7 */}
            <section>
              <h2 className="text-lg font-bold text-white mb-3">7. Seller Protections</h2>
              <p className="mb-3">Sellers are also protected under this policy:</p>
              <ul className="list-disc list-inside space-y-1.5 ml-2">
                <li>Refund claims filed outside the eligible window will be denied.</li>
                <li>Sellers who provide valid tracking with delivery confirmation are protected against "item not received" claims.</li>
                <li>PokéMarket will investigate claims of buyer fraud (e.g., claiming an item wasn't received when tracking shows delivery).</li>
                <li>Repeated fraudulent claims from a buyer will result in account suspension.</li>
              </ul>
            </section>

            {/* 8 */}
            <section>
              <h2 className="text-lg font-bold text-white mb-3">8. Auction Refunds</h2>
              <p>
                Auction transactions are generally final. Refunds on auction purchases are only granted in cases of counterfeit items or items that are drastically not as described. The standard buyer protection conditions apply. Non-payment by a winning bidder may result in negative feedback, account restrictions, and the seller being allowed to relist the item or offer it to the next highest bidder.
              </p>
            </section>

            {/* 9 */}
            <section>
              <h2 className="text-lg font-bold text-white mb-3">9. Disputes and Appeals</h2>
              <p>
                If you disagree with a refund decision, you may submit an appeal within <strong className="text-white">14 days</strong> of the decision by contacting{' '}
                <a href="mailto:disputes@pokemarket.com" className="text-red-400 hover:text-red-300 underline">disputes@pokemarket.com</a>{' '}
                with your case number and additional evidence. Appeals are reviewed by a senior member of our support team and a final decision will be issued within 10 business days. All appeal decisions are final.
              </p>
            </section>

            {/* 10 */}
            <section>
              <h2 className="text-lg font-bold text-white mb-3">10. Contact Us</h2>
              <p>
                For any questions regarding this Refund Policy, please reach out to our support team at{' '}
                <a href="mailto:support@pokemarket.com" className="text-red-400 hover:text-red-300 underline">support@pokemarket.com</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
