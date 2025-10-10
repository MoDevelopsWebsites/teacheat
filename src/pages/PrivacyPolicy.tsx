"use client";

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header className="absolute top-0 left-0 right-0" />
      <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl mt-20 sm:py-16 sm:mt-24">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-8 sm:mb-12">Privacy Policy</h1>

        <section className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">1. Introduction</h2>
          <p className="mb-3 sm:mb-4 text-sm sm:text-base">
            Welcome to Teacheat! We are committed to protecting your privacy and handling your data in an open and transparent manner. This Privacy Policy explains how Teacheat ("we," "us," or "our") collects, uses, discloses, and protects your information when you use our AI assistant services, including our website, desktop application, and any related services (collectively, the "Service").
          </p>
          <p className="text-sm sm:text-base">
            By using the Service, you agree to the collection and use of information in accordance with this policy.
          </p>
        </section>

        <section className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">2. Information We Collect</h2>
          <p className="mb-3 sm:mb-4 text-sm sm:text-base">
            We collect various types of information to provide and improve our Service to you.
          </p>
          <h3 className="text-lg sm:text-xl font-semibold mb-2">2.1. Information You Provide Directly</h3>
          <ul className="list-disc list-inside ml-4 mb-3 sm:mb-4 space-y-1 text-sm sm:text-base">
            <li><strong>Account Information:</strong> When you create an account, we collect your email address and any other information you choose to provide (e.g., first name, last name, avatar URL) through our Supabase authentication system.</li>
            <li><strong>Payment Information:</strong> If you subscribe to a paid plan, payment processing is handled by third-party payment processors (e.g., Stripe). We do not directly store your credit card details, but we may receive information about your transaction, such as the date and amount of the payment.</li>
            <li><strong>Communications:</strong> When you contact us for support, feedback, or inquiries, we collect the content of your communications and any contact information you provide.</li>
          </ul>

          <h3 className="text-lg sm:text-xl font-semibold mb-2">2.2. Information Collected Through Your Use of the Service</h3>
          <ul className="list-disc list-inside ml-4 mb-3 sm:mb-4 space-y-1 text-sm sm:text-base">
            <li><strong>Meeting Content (Audio & Screen):</strong> Teacheat is designed to listen to your meetings and observe your screen content locally on your device to provide real-time AI assistance, take notes, and offer suggestions. This raw meeting content (audio, visual data from your screen) is primarily processed locally. We do not transmit raw, unanonymized meeting audio or screen content to our servers or third-party AI models without your explicit consent or if it's necessary to fulfill a specific feature you've enabled (e.g., sending a specific prompt to an AI model).</li>
            <li><strong>AI Interactions:</strong> When you interact with our AI assistant (e.g., by asking questions or requesting suggestions), the specific prompts you send and the AI's responses are processed to provide the service. These interactions may be sent to our secure backend (Supabase Edge Functions) and potentially to third-party AI models (like Hugging Face, as configured in our `chat` function) for processing. We take steps to anonymize or de-identify data where possible before sending it to third-party AI services.</li>
            <li><strong>Usage Data:</strong> We collect information about how you access and use the Service, such as the features you use, the time and duration of your activities, and performance data. This helps us understand user behavior and improve the Service.</li>
            <li><strong>Technical Data:</strong> We collect information about your device and internet connection, including your IP address, browser type, operating system, and unique device identifiers.</li>
          </ul>
        </section>

        <section className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">3. How We Use Your Information</h2>
          <p className="mb-3 sm:mb-4 text-sm sm:text-base">
            We use the information we collect for various purposes, including:
          </p>
          <ul className="list-disc list-inside ml-4 mb-3 sm:mb-4 space-y-1 text-sm sm:text-base">
            <li>To provide, operate, and maintain our Service, including real-time AI assistance, note-taking, and post-call analytics.</li>
            <li>To manage your account, process your subscriptions, and provide customer support.</li>
            <li>To personalize your experience and deliver content and features tailored to your interests.</li>
            <li>To improve and develop new features, products, and services.</li>
            <li>To monitor and analyze usage and trends to enhance the functionality and user-friendliness of our Service.</li>
            <li>To detect, prevent, and address technical issues, security incidents, and fraudulent activities.</li>
            <li>To comply with legal obligations and enforce our Terms of Service.</li>
            <li>To communicate with you about updates, promotions, and important notices.</li>
          </ul>
        </section>

        <section className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">4. How We Share Your Information</h2>
          <p className="mb-3 sm:mb-4 text-sm sm:text-base">
            We may share your information in the following circumstances:
          </p>
          <ul className="list-disc list-inside ml-4 mb-3 sm:mb-4 space-y-1 text-sm sm:text-base">
            <li><strong>Service Providers:</strong> We engage third-party service providers to perform functions on our behalf, such as hosting, data analysis, payment processing (Stripe), and AI model inference (e.g., Hugging Face for processing AI prompts). These providers have access to your information only to perform their tasks and are obligated not to disclose or use it for any other purpose.</li>
            <li><strong>Legal Compliance:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court order or government agency).</li>
            <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction.</li>
            <li><strong>With Your Consent:</strong> We may share your information with third parties when we have your explicit consent to do so.</li>
          </ul>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base">
            <strong>Important Note on Meeting Content:</strong> As stated, raw meeting audio and screen content are primarily processed locally. When AI interactions occur (e.g., sending a prompt to our `chat` Edge Function), only the specific text of the prompt and relevant context (which may be derived from meeting content but is not the raw content itself) is sent to our backend and potentially to third-party AI models. We do not share raw, identifiable meeting content with third parties unless explicitly consented to by you for a specific feature.
          </p>
        </section>

        <section className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">5. Data Retention</h2>
          <p className="text-sm sm:text-base">
            We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. This includes retaining information to comply with legal obligations, resolve disputes, and enforce our agreements.
          </p>
        </section>

        <section className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">6. Your Data Protection Rights</h2>
          <p className="mb-3 sm:mb-4 text-sm sm:text-base">
            Depending on your location, you may have the following rights regarding your personal data:
          </p>
          <ul className="list-disc list-inside ml-4 mb-3 sm:mb-4 space-y-1 text-sm sm:text-base">
            <li><strong>Right to Access:</strong> You have the right to request copies of your personal data.</li>
            <li><strong>Right to Rectification:</strong> You have the right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete.</li>
            <li><strong>Right to Erasure:</strong> You have the right to request that we erase your personal data, under certain conditions.</li>
            <li><strong>Right to Restrict Processing:</strong> You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
            <li><strong>Right to Object to Processing:</strong> You have the right to object to our processing of your personal data, under certain conditions.</li>
            <li><strong>Right to Data Portability:</strong> You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
          </ul>
          <p className="text-sm sm:text-base">
            To exercise any of these rights, please contact us using the details provided in the "Contact Us" section below.
          </p>
        </section>

        <section className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">7. Data Security</h2>
          <p className="text-sm sm:text-base">
            We implement reasonable security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">8. Children's Privacy</h2>
          <p className="text-sm sm:text-base">
            Our Service is not intended for individuals under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with personal data, please contact us. If we become aware that we have collected personal data from a child under age 13 without verification of parental consent, we take steps to remove that information from our servers.
          </p>
        </section>

        <section className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">9. Changes to This Privacy Policy</h2>
          <p className="text-sm sm:text-base">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
          </p>
        </section>

        <section className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">10. Contact Us</h2>
          <p className="text-sm sm:text-base">
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1 text-sm sm:text-base">
            <li>By email: support@teacheat.com (Placeholder)</li>
            <li>Through our website: [Link to Contact Form, if applicable]</li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;