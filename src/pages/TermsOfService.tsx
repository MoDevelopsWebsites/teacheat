"use client";

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12">Terms of Service</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
          <p className="mb-4">
            Welcome to Teacheat! These Terms of Service ("Terms") govern your access to and use of the Teacheat AI assistant services, including our website, desktop application, and any related services (collectively, the "Service"). By accessing or using the Service, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, do not use the Service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">2. Description of Service</h2>
          <p className="mb-4">
            Teacheat provides an AI assistant designed to enhance your productivity during online meetings, interviews, sales calls, and other desktop activities. Our Service offers real-time note-taking, AI-powered answers, suggestions, and post-call analytics by processing audio and screen content locally on your device.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">3. User Accounts</h2>
          <ul className="list-disc list-inside ml-4 mb-4 space-y-1">
            <li><strong>Registration:</strong> To access certain features of the Service, you may be required to register for an account using our Supabase authentication system. You agree to provide accurate, current, and complete information during the registration process.</li>
            <li><strong>Account Security:</strong> You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.</li>
            <li><strong>Eligibility:</strong> You must be at least 13 years old to use the Service. By using the Service, you represent and warrant that you meet this age requirement.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">4. Acceptable Use</h2>
          <p className="mb-4">
            You agree not to use the Service for any purpose that is unlawful or prohibited by these Terms. Specifically, you agree not to:
          </p>
          <ul className="list-disc list-inside ml-4 mb-4 space-y-1">
            <li>Violate any applicable local, state, national, or international law or regulation.</li>
            <li>Infringe upon the rights of others, including intellectual property rights.</li>
            <li>Transmit any content that is harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable.</li>
            <li>Attempt to gain unauthorized access to any portion of the Service, other accounts, computer systems, or networks connected to the Service.</li>
            <li>Interfere with or disrupt the integrity or performance of the Service or the data contained therein.</li>
            <li>Use the Service to record conversations without the knowledge and consent of all participants, where such consent is required by law. You are solely responsible for complying with all applicable laws regarding the recording of conversations.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">5. Intellectual Property</h2>
          <ul className="list-disc list-inside ml-4 mb-4 space-y-1">
            <li><strong>Teacheat's IP:</strong> The Service, including all content, features, and functionality (e.g., software, text, graphics, logos, trademarks), is and will remain the exclusive property of Teacheat and its licensors.</li>
            <li><strong>Your Content:</strong> You retain all rights to the content you create or input using the Service (e.g., meeting notes, AI prompts). By using the Service, you grant Teacheat a limited, non-exclusive, worldwide, royalty-free license to use, process, and store your content solely for the purpose of providing and improving the Service to you.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">6. Privacy Policy</h2>
          <p>
            Your use of the Service is also governed by our Privacy Policy, which is incorporated into these Terms by reference. Please review our Privacy Policy to understand our practices regarding the collection, use, and disclosure of your information.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">7. Disclaimers</h2>
          <p className="mb-4">
            THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR COURSE OF PERFORMANCE.
          </p>
          <p>
            TEACHEAT DOES NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE; THAT DEFECTS WILL BE CORRECTED; OR THAT THE SERVICE IS FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">8. Limitation of Liability</h2>
          <p className="mb-4">
            IN NO EVENT SHALL TEACHEAT, NOR ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES, BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM (I) YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICE; (II) ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICE; (III) ANY CONTENT OBTAINED FROM THE SERVICE; AND (IV) UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), OR ANY OTHER LEGAL THEORY, WHETHER OR NOT WE HAVE BEEN INFORMED OF THE POSSIBILITY OF SUCH DAMAGE.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">9. Indemnification</h2>
          <p>
            You agree to defend, indemnify, and hold harmless Teacheat and its licensees and licensors, and their employees, contractors, agents, officers, and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees), resulting from or arising out of a) your use and access of the Service, by you or any person using your account and password; b) a breach of these Terms; or c) your violation of any applicable law or the rights of a third party.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">10. Termination</h2>
          <p className="mb-4">
            We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">11. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of [Your Jurisdiction, e.g., Delaware, USA], without regard to its conflict of law provisions.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">12. Changes to These Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">13. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>By email: support@teacheat.com (Placeholder)</li>
            <li>Through our website: [Link to Contact Form, if applicable]</li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;