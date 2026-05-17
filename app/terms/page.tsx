import Link from 'next/link'

export const metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for UpahJe.my - Malaysia\'s trusted freelance marketplace',
}

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="text-emerald-700 hover:text-emerald-800 text-sm font-medium mb-4 inline-block">
            ← Back to home
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-950 mb-4">Terms of Service</h1>
          <p className="text-slate-600">Last updated: 17 May 2026</p>
        </div>

        {/* Content */}
        <div className="prose prose-slate max-w-none space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-xl font-semibold text-slate-950 mb-4">1. Introduction</h2>
            <p className="text-slate-700 leading-relaxed">
              Welcome to UpahJe.my (&quot;Platform&quot;, &quot;we&quot;, &quot;us&quot;, &quot;our&quot;). By accessing or using our platform, 
              you agree to be bound by these Terms of Service (&quot;Terms&quot;) and our Privacy Policy. 
              If you do not agree to these Terms, please do not use our platform.
            </p>
            <p className="text-slate-700 leading-relaxed mt-4">
              UpahJe.my is a Malaysian freelance marketplace that connects employers with skilled 
              labour and technical talent. Our platform facilitates job postings, applications, 
              communications, and payments between users.
            </p>
          </section>

          {/* Eligibility */}
          <section>
            <h2 className="text-xl font-semibold text-slate-950 mb-4">2. Eligibility</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              To use our platform, you must:
            </p>
            <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
              <li>Be at least 18 years of age</li>
              <li>Be a resident of Malaysia or have legal authorization to work in Malaysia</li>
              <li>Have the legal capacity to enter into binding contracts</li>
              <li>Provide accurate and complete information during registration</li>
              <li>Not be prohibited from using our services under applicable laws</li>
            </ul>
            <p className="text-slate-700 leading-relaxed mt-4">
              By registering an account, you represent and warrant that you meet these eligibility requirements.
            </p>
          </section>

          {/* Account Registration */}
          <section>
            <h2 className="text-xl font-semibold text-slate-950 mb-4">3. Account Registration</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              To access certain features of our platform, you must create an account. You agree to:
            </p>
            <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
              <li>Provide accurate, current, and complete information during registration</li>
              <li>Maintain and promptly update your account information</li>
              <li>Maintain the security of your password and account</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
              <li>Accept responsibility for all activities under your account</li>
            </ul>
            <p className="text-slate-700 leading-relaxed mt-4">
              We reserve the right to suspend or terminate accounts that provide false information or 
              violate these Terms.
            </p>
          </section>

          {/* User Roles */}
          <section>
            <h2 className="text-xl font-semibold text-slate-950 mb-4">4. User Roles and Responsibilities</h2>
            
            <h3 className="text-lg font-medium text-slate-900 mb-3">4.1 Employers</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              As an employer, you may:
            </p>
            <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
              <li>Post job opportunities and project requirements</li>
              <li>Review and select freelancers for your projects</li>
              <li>Communicate with freelancers through our platform</li>
              <li>Make payments through our escrow system</li>
              <li>Leave reviews for completed work</li>
            </ul>
            <p className="text-slate-700 leading-relaxed mt-4 mb-6">
              You agree to provide accurate job descriptions, fair compensation, and timely payment 
              for completed work.
            </p>

            <h3 className="text-lg font-medium text-slate-900 mb-3">4.2 Freelancers</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              As a freelancer, you may:
            </p>
            <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
              <li>Create a profile showcasing your skills and experience</li>
              <li>Apply for jobs and submit proposals</li>
              <li>Communicate with employers through our platform</li>
              <li>Receive payments through our escrow system</li>
              <li>Leave reviews for employers</li>
            </ul>
            <p className="text-slate-700 leading-relaxed mt-4">
              You agree to provide accurate information about your skills, experience, and availability, 
              and to complete agreed-upon work professionally and on time.
            </p>
          </section>

          {/* Services */}
          <section>
            <h2 className="text-xl font-semibold text-slate-950 mb-4">5. Platform Services</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Our platform provides the following services:
            </p>
            <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
              <li><strong>Job Board:</strong> Posting and browsing job opportunities</li>
              <li><strong>Matching:</strong> Algorithm-based matching of employers with suitable freelancers</li>
              <li><strong>Communication:</strong> Secure messaging between users</li>
              <li><strong>Escrow Payments:</strong> Secure payment processing and fund holding</li>
              <li><strong>Reviews:</strong> Rating and review system for completed work</li>
              <li><strong>Dispute Resolution:</strong> Mediation services for conflicts between users</li>
            </ul>
            <p className="text-slate-700 leading-relaxed mt-4">
              We do not guarantee that you will find work or hire freelancers through our platform. 
              We are not a party to any agreements between employers and freelancers.
            </p>
          </section>

          {/* Payments and Escrow */}
          <section>
            <h2 className="text-xl font-semibold text-slate-950 mb-4">6. Payments and Escrow</h2>
            
            <h3 className="text-lg font-medium text-slate-900 mb-3">6.1 Payment Processing</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              All payments on our platform are processed through our secure escrow system. When an 
              employer posts a job and a freelancer is selected:
            </p>
            <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
              <li>The employer deposits payment into escrow</li>
              <li>The funds are held securely until work is completed</li>
              <li>Upon completion and approval, funds are released to the freelancer</li>
              <li>Our platform facilitates the payment process but is not a party to the transaction</li>
            </ul>

            <h3 className="text-lg font-medium text-slate-900 mb-3 mt-6">6.2 Fees</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              Our platform charges service fees for certain transactions. Current fee structures are 
              displayed on our pricing page and may be updated from time to time. All fees are 
              transparent and disclosed before transaction completion.
            </p>

            <h3 className="text-lg font-medium text-slate-900 mb-3 mt-6">6.3 Refunds</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              Refunds are processed according to our dispute resolution policy. If work is not 
              completed as agreed, employers may request a refund through our dispute resolution 
              process. Refunds are subject to our review and may take 5-10 business days to process.
            </p>
          </section>

          {/* Prohibited Activities */}
          <section>
            <h2 className="text-xl font-semibold text-slate-950 mb-4">7. Prohibited Activities</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              You agree not to engage in the following prohibited activities on our platform:
            </p>
            <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
              <li>Posting false, misleading, or fraudulent job opportunities</li>
              <li>Providing false information about skills, experience, or qualifications</li>
              <li>Engaging in harassment, discrimination, or abusive behavior</li>
              <li>Attempting to circumvent our payment system or fees</li>
              <li>Sharing contact information to conduct transactions outside the platform</li>
              <li>Violating any applicable laws or regulations</li>
              <li>Infringing on intellectual property rights</li>
              <li>Transmitting viruses or harmful code</li>
              <li>Attempting to gain unauthorized access to our systems</li>
            </ul>
            <p className="text-slate-700 leading-relaxed mt-4">
              Violation of these prohibitions may result in account suspension or termination.
            </p>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-xl font-semibold text-slate-950 mb-4">8. Intellectual Property</h2>
            
            <h3 className="text-lg font-medium text-slate-900 mb-3">8.1 Platform Content</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              All content on our platform, including text, graphics, logos, software, and 
              documentation, is the property of UpahJe.my or its licensors and is protected 
              by Malaysian and international copyright laws.
            </p>

            <h3 className="text-lg font-medium text-slate-900 mb-3 mt-6">8.2 User Content</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              You retain ownership of content you post on our platform, including job postings, 
              proposals, and communications. By posting content, you grant us a non-exclusive, 
              royalty-free license to use, display, and distribute your content on our platform 
              for the purpose of providing our services.
            </p>

            <h3 className="text-lg font-medium text-slate-900 mb-3 mt-6">8.3 Work Product</h3>
            <p className="text-slate-700 leading-relaxed">
              Intellectual property rights for work completed through our platform are determined 
              by the agreement between the employer and freelancer. We recommend that users include 
              clear IP ownership terms in their agreements. We are not responsible for disputes 
              regarding intellectual property ownership.
            </p>
          </section>

          {/* Dispute Resolution */}
          <section>
            <h2 className="text-xl font-semibold text-slate-950 mb-4">9. Dispute Resolution</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              We provide a dispute resolution process for conflicts between employers and freelancers:
            </p>
            <ol className="list-decimal list-inside text-slate-700 space-y-2 ml-4">
              <li><strong>Direct Communication:</strong> Users are encouraged to resolve issues directly</li>
              <li><strong>Platform Mediation:</strong> If direct resolution fails, either party may request mediation through our platform</li>
              <li><strong>Escrow Review:</strong> For payment disputes, our team will review evidence from both parties</li>
              <li><strong>Final Decision:</strong> We may make a binding decision based on the evidence provided</li>
            </ol>
            <p className="text-slate-700 leading-relaxed mt-4">
              Our dispute resolution decisions are final. We reserve the right to release escrow 
              funds based on our review of the evidence.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-xl font-semibold text-slate-950 mb-4">10. Limitation of Liability</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              To the maximum extent permitted by Malaysian law:
            </p>
            <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
              <li>Our platform is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind</li>
              <li>We do not guarantee the quality, safety, or legality of jobs posted on our platform</li>
              <li>We are not responsible for the conduct of users, whether online or offline</li>
              <li>We are not liable for any indirect, incidental, or consequential damages</li>
              <li>Our total liability is limited to the amount of fees paid by you in the 12 months preceding the claim</li>
            </ul>
          </section>

          {/* Indemnification */}
          <section>
            <h2 className="text-xl font-semibold text-slate-950 mb-4">11. Indemnification</h2>
            <p className="text-slate-700 leading-relaxed">
              You agree to indemnify and hold harmless UpahJe.my, its officers, directors, employees, 
              and agents from any claims, damages, losses, or expenses (including reasonable attorneys&apos; 
              fees) arising from your use of our platform, your violation of these Terms, or your 
              violation of any rights of another party.
            </p>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-xl font-semibold text-slate-950 mb-4">12. Termination</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              We may suspend or terminate your account and access to our platform at any time for 
              any reason, including:
            </p>
            <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
              <li>Violation of these Terms</li>
              <li>Fraudulent or illegal activity</li>
              <li>Non-payment of fees</li>
              <li>Extended periods of inactivity</li>
              <li>At our sole discretion</li>
            </ul>
            <p className="text-slate-700 leading-relaxed mt-4">
              Upon termination, you remain liable for any outstanding fees and obligations. 
              We may retain certain information as required by law.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-xl font-semibold text-slate-950 mb-4">13. Governing Law</h2>
            <p className="text-slate-700 leading-relaxed">
              These Terms are governed by and construed in accordance with the laws of Malaysia, 
              without regard to its conflict of law principles. Any disputes arising from these 
              Terms shall be subject to the exclusive jurisdiction of the courts of Malaysia.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-xl font-semibold text-slate-950 mb-4">14. Changes to These Terms</h2>
            <p className="text-slate-700 leading-relaxed">
              We may update these Terms from time to time. We will notify you of material changes 
              by posting the updated Terms on our platform and updating the &quot;Last updated&quot; date. 
              Your continued use of our platform after such changes constitutes your acceptance 
              of the revised Terms.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl font-semibold text-slate-950 mb-4">15. Contact Us</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="bg-slate-100 rounded-lg p-4 space-y-2">
              <p className="text-slate-700">
                <strong>Email:</strong>{' '}
                <a href="mailto:support@upahje.my" className="text-emerald-700 hover:text-emerald-800">
                  support@upahje.my
                </a>
              </p>
              <p className="text-slate-700">
                <strong>Address:</strong> UpahJe.my, Kuala Lumpur, Malaysia
              </p>
            </div>
          </section>

          {/* Severability */}
          <section>
            <h2 className="text-xl font-semibold text-slate-950 mb-4">16. Severability</h2>
            <p className="text-slate-700 leading-relaxed">
              If any provision of these Terms is found to be unenforceable or invalid, that 
              provision will be limited or eliminated to the minimum extent necessary so that 
              the remaining provisions will remain in full force and effect.
            </p>
          </section>

          {/* Entire Agreement */}
          <section>
            <h2 className="text-xl font-semibold text-slate-950 mb-4">17. Entire Agreement</h2>
            <p className="text-slate-700 leading-relaxed">
              These Terms, together with our Privacy Policy, constitute the entire agreement 
              between you and UpahJe.my regarding the use of our platform and supersede all 
              prior agreements and understandings, whether written or oral.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
