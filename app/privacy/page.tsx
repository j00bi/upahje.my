import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for UpahJe.my - Malaysia\'s trusted freelance marketplace',
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="text-teal-700 hover:text-teal-800 text-sm font-medium mb-4 inline-block">
            ← Back to home
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-950 mb-4">Privacy Policy</h1>
          <p className="text-slate-600">Last updated: 17 May 2026</p>
        </div>

        {/* Content */}
        <div className="prose prose-slate max-w-none space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-xl font-semibold text-slate-950 mb-4">1. Introduction</h2>
            <p className="text-slate-700 leading-relaxed">
              UpahJe.my (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is a Malaysian freelance marketplace platform that connects 
              employers with skilled labour and technical talent. We are committed to protecting your 
              personal data in accordance with the <strong>Personal Data Protection Act 2010 (PDPA)</strong> 
              and other applicable Malaysian laws.
            </p>
            <p className="text-slate-700 leading-relaxed mt-4">
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
              when you use our platform, including our website, mobile applications, and related services.
            </p>
          </section>

          {/* Data Collection */}
          <section>
            <h2 className="text-xl font-semibold text-slate-950 mb-4">2. Information We Collect</h2>
            
            <h3 className="text-lg font-medium text-slate-900 mb-3">2.1 Personal Information</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              We collect personal information that you voluntarily provide to us, including:
            </p>
            <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
              <li>Full name and contact information (email address, phone number)</li>
              <li>MyKad/Identity Card details for verification purposes</li>
              <li>Profile information, including photos, skills, and work history</li>
              <li>Payment information (bank account details, e-wallet information)</li>
              <li>Communications with us and other users</li>
              <li>Job postings, applications, and project details</li>
            </ul>

            <h3 className="text-lg font-medium text-slate-900 mb-3 mt-6">2.2 Technical Information</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              We automatically collect certain technical information when you use our platform:
            </p>
            <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
              <li>IP address and device information</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Usage patterns and analytics</li>
              <li>Location data (with your consent)</li>
            </ul>
          </section>

          {/* Data Usage */}
          <section>
            <h2 className="text-xl font-semibold text-slate-950 mb-4">3. How We Use Your Information</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              We use your personal data for the following purposes:
            </p>
            <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
              <li>To provide and maintain our platform services</li>
              <li>To verify your identity and prevent fraud (MyKad verification)</li>
              <li>To process payments and escrow transactions</li>
              <li>To facilitate communication between employers and freelancers</li>
              <li>To send you service updates and important notices</li>
              <li>To improve our platform and user experience</li>
              <li>To comply with legal obligations under Malaysian law</li>
              <li>To protect the safety and security of our community</li>
            </ul>
          </section>

          {/* Data Disclosure */}
          <section>
            <h2 className="text-xl font-semibold text-slate-950 mb-4">4. Data Disclosure</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              We may disclose your personal data in the following circumstances:
            </p>
            <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
              <li><strong>To other users:</strong> Profile information is shared with potential employers or freelancers as part of job matching</li>
              <li><strong>To service providers:</strong> Payment processors, escrow services, and verification partners</li>
              <li><strong>For legal compliance:</strong> When required by law, court order, or government authority</li>
              <li><strong>Business transfers:</strong> In connection with any merger, acquisition, or sale of assets</li>
              <li><strong>With your consent:</strong> When you explicitly authorize us to share your information</li>
            </ul>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-xl font-semibold text-slate-950 mb-4">5. Data Security</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              We implement appropriate technical and organizational measures to protect your personal data 
              against unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
              <li>Encryption of data in transit and at rest</li>
              <li>Secure payment processing through trusted partners</li>
              <li>Regular security assessments and updates</li>
              <li>Access controls and authentication measures</li>
              <li>Employee training on data protection</li>
            </ul>
            <p className="text-slate-700 leading-relaxed mt-4">
              However, no method of transmission over the Internet or electronic storage is 100% secure. 
              We cannot guarantee absolute security of your data.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-xl font-semibold text-slate-950 mb-4">6. Your Rights Under PDPA</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Under the Personal Data Protection Act 2010, you have the following rights:
            </p>
            <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
              <li><strong>Right to access:</strong> Request a copy of your personal data held by us</li>
              <li><strong>Right to correction:</strong> Request correction of inaccurate or incomplete data</li>
              <li><strong>Right to withdraw consent:</strong> Withdraw consent for data processing (subject to legal limitations)</li>
              <li><strong>Right to prevent processing:</strong> Request that we stop processing your data for direct marketing</li>
              <li><strong>Right to data portability:</strong> Request your data in a structured, commonly used format</li>
            </ul>
            <p className="text-slate-700 leading-relaxed mt-4">
              To exercise these rights, please contact us at{' '}
              <a href="mailto:privacy@upahje.my" className="text-teal-700 hover:text-teal-800">
                privacy@upahje.my
              </a>
              . We will respond to your request within 21 days as required by PDPA.
            </p>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-xl font-semibold text-slate-950 mb-4">7. Data Retention</h2>
            <p className="text-slate-700 leading-relaxed">
              We retain your personal data only for as long as necessary to fulfill the purposes for which 
              it was collected, including for the purposes of satisfying any legal, accounting, or reporting 
              requirements. Generally:
            </p>
            <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4 mt-4">
              <li>Account information is retained while your account is active</li>
              <li>Transaction records are kept for 7 years for tax and legal compliance</li>
              <li>Job and project records are retained for dispute resolution purposes</li>
              <li>After account deletion, we may retain certain data as required by law</li>
            </ul>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-xl font-semibold text-slate-950 mb-4">8. Cookies and Tracking</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              We use cookies and similar tracking technologies to enhance your experience on our platform. 
              Cookies help us:
            </p>
            <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
              <li>Remember your preferences and settings</li>
              <li>Analyze how you use our platform</li>
              <li>Improve our services and user experience</li>
              <li>Provide personalized content and advertisements</li>
            </ul>
            <p className="text-slate-700 leading-relaxed mt-4">
              You can control cookies through your browser settings. However, disabling cookies may limit 
              some functionality of our platform.
            </p>
          </section>

          {/* Third-Party Services */}
          <section>
            <h2 className="text-xl font-semibold text-slate-950 mb-4">9. Third-Party Services</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Our platform may contain links to third-party websites or services. We are not responsible 
              for the privacy practices of these third parties. We encourage you to review their privacy 
              policies before providing any personal data.
            </p>
            <p className="text-slate-700 leading-relaxed">
              We use the following third-party services that may collect your data:
            </p>
            <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4 mt-4">
              <li>Payment processors (e.g., FPX, credit card processors)</li>
              <li>Cloud hosting providers</li>
              <li>Analytics services</li>
              <li>Customer support tools</li>
            </ul>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-xl font-semibold text-slate-950 mb-4">10. Children&apos;s Privacy</h2>
            <p className="text-slate-700 leading-relaxed">
              Our platform is not intended for use by individuals under the age of 18. We do not knowingly 
              collect personal information from children. If we become aware that we have collected personal 
              data from a child under 18, we will take steps to delete that information.
            </p>
          </section>

          {/* Changes to Policy */}
          <section>
            <h2 className="text-xl font-semibold text-slate-950 mb-4">11. Changes to This Policy</h2>
            <p className="text-slate-700 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any material 
              changes by posting the new policy on this page and updating the &quot;Last updated&quot; date. 
              We encourage you to review this policy periodically.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl font-semibold text-slate-950 mb-4">12. Contact Us</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-slate-100 rounded-lg p-4 space-y-2">
              <p className="text-slate-700">
                <strong>Email:</strong>{' '}
                <a href="mailto:privacy@upahje.my" className="text-teal-700 hover:text-teal-800">
                  privacy@upahje.my
                </a>
              </p>
              <p className="text-slate-700">
                <strong>Address:</strong> UpahJe.my, Kuala Lumpur, Malaysia
              </p>
              <p className="text-slate-700">
                <strong>Data Protection Officer:</strong> Available upon request
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}