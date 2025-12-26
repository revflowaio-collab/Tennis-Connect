
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient backgrounds */}
      <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <Link 
        to={-1 as any} 
        className="fixed top-6 left-6 p-2.5 rounded-xl bg-white/5 text-gray-400 hover:text-white transition-all active:scale-90 group z-50 flex items-center gap-2 border border-white/10 backdrop-blur-md shadow-2xl"
      >
        <ArrowLeft size={20} strokeWidth={3} />
      </Link>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="bg-white rounded-[2.5rem] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.5)] p-8 md:p-16 overflow-hidden border border-gray-100">
          
          <div className="mb-12 border-b border-gray-100 pb-10">
            <div className="flex items-center gap-3 text-blue-600 mb-4">
                <ShieldCheck size={32} strokeWidth={2.5} />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Privacy & Data</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">Privacy Policy</h1>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                Last Updated: <span className="text-gray-900">December 22, 2025</span>
            </p>
          </div>

          <div className="prose prose-blue max-w-none text-gray-600 font-medium leading-relaxed space-y-12">
            
            <section className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100/50">
              <p className="text-gray-900 font-bold">
                This Privacy Policy explains how <strong>Revflow AIO</strong> (“Company,” “we,” “us,” or “our”) collects, uses, discloses, and protects personal information when you access or use the mobile application, website, and related services (collectively, the “Service”).
              </p>
              <p className="mt-4">
                By using the Service, you consent to the practices described in this Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-black">01</span>
                Information We Collect
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">a. Information You Provide Directly</h3>
                  <p>When you create an account or use the Service, you may provide:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Name</li>
                    <li>Email address</li>
                    <li>Username and profile details</li>
                    <li>Skill level, preferences, and tennis-related data</li>
                    <li>Messages and communications with other users</li>
                    <li>Uploaded content (photos, text, or other materials)</li>
                    <li>Support inquiries or feedback</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">b. Automatically Collected Information</h3>
                  <p>When you access the Service, we may automatically collect:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Device type, operating system, and app version</li>
                    <li>IP address and general location (city/state level)</li>
                    <li>Usage data, interactions, and feature engagement</li>
                    <li>Log data, timestamps, and error reports</li>
                    <li>Cookies or similar technologies (for web-based features)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">c. AI and Analytics Data</h3>
                  <p>To provide AI-powered features, we may collect and process:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Performance inputs (e.g., match data, activity patterns)</li>
                    <li>Interaction data used to generate insights or recommendations</li>
                    <li>Aggregated or anonymized usage trends</li>
                  </ul>
                  <p className="mt-4">AI processing may involve third-party tools, including Google AI services, to deliver insights and automation.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-black">02</span>
                How We Use Your Information
              </h2>
              <p>We use personal information to:</p>
              <ul className="list-disc pl-5 mt-4 space-y-1">
                <li>Provide, operate, and maintain the Service</li>
                <li>Create and manage user accounts</li>
                <li>Enable player discovery, matching, and messaging</li>
                <li>Deliver AI-powered insights and features</li>
                <li>Improve functionality, performance, and user experience</li>
                <li>Communicate service updates, security notices, and support responses</li>
                <li>Monitor misuse, fraud, or violations of our Terms</li>
                <li>Comply with legal and regulatory obligations</li>
              </ul>
              <p className="mt-4 font-bold text-gray-900">We do not sell your personal information.</p>
            </section>

            <section className="p-8 bg-blue-50/50 rounded-[2rem] border border-blue-100">
              <h2 className="text-xl font-black text-blue-900 uppercase tracking-tight mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-black">03</span>
                AI & Automated Processing
              </h2>
              <p className="mb-4">Certain features of the Service use artificial intelligence and machine learning technologies.</p>
              <ul className="space-y-3 text-blue-800">
                <li>• AI outputs are generated based on user-provided and usage data</li>
                <li>• AI insights are informational only and not professional advice</li>
                <li>• We may use anonymized or aggregated data to improve AI models</li>
                <li>• We do not train public AI models on private user messages</li>
              </ul>
              <p className="mt-4 font-bold text-blue-900">You remain responsible for how you interpret and use AI-generated content.</p>
            </section>

            <section>
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-black">04</span>
                How We Share Information
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-gray-900 mb-2 text-sm uppercase tracking-wider">a. Service Providers</h3>
                  <p>We may share data with trusted vendors who help operate the Service, such as cloud hosting providers, analytics platforms, AI and automation service providers, and customer support tools. These providers are contractually obligated to protect your data.</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2 text-sm uppercase tracking-wider">b. Legal & Safety Reasons</h3>
                  <p>We may disclose information if required to comply with applicable laws or legal processes, enforce our Terms of Service, or protect the rights, safety, or property of users or the Company.</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2 text-sm uppercase tracking-wider">c. Business Transfers</h3>
                  <p>If Revflow AIO is involved in a merger, acquisition, or asset sale, user information may be transferred as part of that transaction.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-black">05</span>
                Data Retention
              </h2>
              <p>We retain personal information only as long as necessary to provide the Service, fulfill legal, accounting, or reporting obligations, or resolve disputes and enforce agreements. You may request deletion of your account and associated data, subject to legal requirements.</p>
            </section>

            <section>
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-black">06</span>
                Data Security
              </h2>
              <p>We implement reasonable administrative, technical, and organizational safeguards to protect personal information. However, no system is completely secure. You acknowledge that transmission of data over the internet carries inherent risk.</p>
            </section>

            <section>
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-black">07</span>
                Your Rights & Choices
              </h2>
              <p>Depending on your location, you may have the right to access personal information we hold about you, request correction or deletion of your data, opt out of certain communications, or restrict/object to certain processing activities. Requests can be submitted by contacting us at the email below.</p>
            </section>

            <section>
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-black">08</span>
                Children’s Privacy
              </h2>
              <p>The Service is not intended for children under 13. We do not knowingly collect personal information from children under 13. If we become aware that such data has been collected, we will take steps to delete it promptly.</p>
            </section>

            <section>
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-black">09</span>
                Third-Party Links & Services
              </h2>
              <p>The Service may contain links to third-party websites or services. We are not responsible for the privacy practices or content of third-party services. Your interactions with those services are governed by their respective policies.</p>
            </section>

            <section>
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-black">10</span>
                International Users
              </h2>
              <p>If you access the Service from outside the United States, you acknowledge that your information may be transferred to and processed in the United States or other jurisdictions where we operate.</p>
            </section>

            <section>
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-black">11</span>
                Changes to This Privacy Policy
              </h2>
              <p>We may update this Privacy Policy from time to time. Changes will be posted within the Service or on our website. Continued use of the Service after updates constitutes acceptance of the revised policy.</p>
            </section>

            <section className="pt-10 border-t border-gray-100">
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-black">12</span>
                Contact Us
              </h2>
              <div className="bg-gray-50 p-6 rounded-3xl space-y-2">
                <p className="font-black">
                  <a href="https://revflowaio.com" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline transition-all">Revflow AIO</a>
                </p>
                <p className="text-gray-600">Text/Call: <a href="tel:7147860139" className="text-emerald-600 font-bold hover:underline">(714) 786-0139</a></p>
              </div>
            </section>
          </div>
        </div>
        
        <div className="mt-12 text-center text-gray-500 text-sm font-medium">
          &copy; {new Date().getFullYear()} Revflow AIO. All rights reserved.
        </div>
      </div>
    </div>
  );
};
