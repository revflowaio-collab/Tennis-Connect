
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Scale } from 'lucide-react';

export const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient backgrounds */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <Link 
        to={-1 as any} 
        className="fixed top-6 left-6 p-2.5 rounded-xl bg-white/5 text-gray-400 hover:text-white transition-all active:scale-90 group z-50 flex items-center gap-2 border border-white/10 backdrop-blur-md shadow-2xl"
      >
        <ArrowLeft size={20} strokeWidth={3} />
      </Link>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="bg-white rounded-[2.5rem] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.5)] p-8 md:p-16 overflow-hidden border border-gray-100">
          
          <div className="mb-12 border-b border-gray-100 pb-10">
            <div className="flex items-center gap-3 text-emerald-600 mb-4">
                <Scale size={32} strokeWidth={2.5} />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Legal Document</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">Terms of Service</h1>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                Last Updated: <span className="text-gray-900">December 22, 2025</span>
            </p>
          </div>

          <div className="prose prose-emerald max-w-none text-gray-600 font-medium leading-relaxed space-y-12">
            
            <section className="bg-emerald-50/50 p-6 rounded-3xl border border-emerald-100/50">
              <p className="text-gray-900 font-bold">
                These Terms of Service (“Terms”) govern your access to and use of the mobile application, website, and related services (collectively, the “Service”), operated by <strong>Revflow AIO</strong> (“Company,” “we,” “us,” or “our”).
              </p>
              <p className="mt-4">
                By accessing or using the Service, you agree to be bound by these Terms. If you do not agree, you may not use the Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs font-black">01</span>
                Eligibility
              </h2>
              <p>You must be at least <strong>13 years old</strong> to use the Service. If you are under 18, you represent that you have obtained permission from a parent or legal guardian.</p>
            </section>

            <section>
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs font-black">02</span>
                Description of the Service
              </h2>
              <p>The Service is a tennis-focused application designed to help users connect, play, and improve through technology. Features of the Service may include:</p>
              <ul className="list-disc pl-5 mt-4 space-y-2">
                <li>Player discovery and matching</li>
                <li>Court discovery, availability, and scheduling</li>
                <li>Community features and messaging</li>
                <li>Skill tracking, analytics, and performance insights</li>
                <li>AI-powered insights, recommendations, or automation</li>
              </ul>
              <p className="mt-4">Certain features of the Service rely on artificial intelligence and machine learning technologies, including tools and APIs provided through <strong>Google AI Studio</strong> and related Google services.</p>
            </section>

            <section>
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs font-black">03</span>
                User Accounts
              </h2>
              <p>Some features require creating an account. You are responsible for:</p>
              <ul className="list-disc pl-5 mt-4 space-y-2">
                <li>Maintaining the confidentiality of your login credentials</li>
                <li>All activity that occurs under your account</li>
                <li>Providing accurate and up-to-date information</li>
              </ul>
              <p className="mt-4">Revflow AIO reserves the right to suspend or terminate accounts that violate these Terms or compromise the integrity of the Service.</p>
            </section>

            <section>
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs font-black">04</span>
                Acceptable Use
              </h2>
              <p>You agree not to:</p>
              <ul className="list-disc pl-5 mt-4 space-y-2">
                <li>Use the Service for unlawful, fraudulent, or harmful purposes</li>
                <li>Harass, threaten, impersonate, or exploit other users</li>
                <li>Attempt to gain unauthorized access to systems or data</li>
                <li>Reverse-engineer, scrape, or interfere with the Service</li>
                <li>Upload malware, viruses, or malicious code</li>
              </ul>
              <p className="mt-4">We may investigate violations and take appropriate enforcement action, including suspension or termination.</p>
            </section>

            <section className="p-8 bg-blue-50/50 rounded-[2rem] border border-blue-100">
              <h2 className="text-xl font-black text-blue-900 uppercase tracking-tight mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-black">05</span>
                AI-Powered Features Disclaimer
              </h2>
              <p className="text-blue-900 font-bold mb-4">You acknowledge that the Service includes features powered by artificial intelligence and machine learning.</p>
              <div className="space-y-3 text-blue-800">
                <p>• AI-generated outputs may be inaccurate, incomplete, or outdated</p>
                <p>• AI-generated insights or recommendations are provided for <strong>informational purposes only</strong></p>
                <p>• The Application does <strong>not</strong> provide professional coaching, medical, fitness, or legal advice</p>
                <p>• You are solely responsible for decisions made based on AI-generated outputs</p>
              </div>
              <p className="mt-4 italic">Revflow AIO makes no guarantees regarding the accuracy or reliability of AI-generated content.</p>
            </section>

            <section>
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs font-black">06</span>
                User Content
              </h2>
              <p>You retain ownership of content you submit to the Service, including profile information, messages, and uploads (“User Content”).</p>
              <p className="mt-4">By submitting User Content, you grant Revflow AIO a <strong>non-exclusive, worldwide, royalty-free, sublicensable license</strong> to use, store, reproduce, display, and process such content solely to operate, maintain, and improve the Service.</p>
              <p className="mt-4">You represent that you have all necessary rights to submit your User Content.</p>
            </section>

            <section>
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs font-black">07</span>
                Data & Privacy
              </h2>
              <p>Your use of the Service is governed by our <strong>Privacy Policy</strong>, which explains how we collect, use, store, and protect personal data, including data processed through AI systems and third-party services.</p>
            </section>

            <section>
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs font-black">08</span>
                Third-Party Services
              </h2>
              <p>The Service may integrate with third-party platforms, tools, or APIs, including Google services.</p>
              <p className="mt-4">Revflow AIO is not responsible for third-party services, their content, availability, or practices. Your use of such services is subject to their respective terms and policies.</p>
            </section>

            <section>
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs font-black">09</span>
                Intellectual Property
              </h2>
              <p>All software, trademarks, logos, designs, and content provided through the Service (excluding User Content) are owned by or licensed to Revflow AIO and are protected by intellectual property laws.</p>
              <p className="mt-4">You may not copy, modify, distribute, sell, or exploit any portion of the Service without prior written consent.</p>
            </section>

            <section>
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs font-black">10</span>
                Termination
              </h2>
              <p>Revflow AIO may suspend or terminate your access to the Service at any time, with or without notice, for violations of these Terms or as required by law. Upon termination, your right to use the Service immediately ceases.</p>
            </section>

            <section>
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs font-black">11</span>
                Disclaimers
              </h2>
              <p>The Service is provided <strong>“as is”</strong> and <strong>“as available.”</strong> To the fullest extent permitted by law, Revflow AIO disclaims all warranties, express or implied, including warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not guarantee uninterrupted, secure, or error-free operation of the Service.</p>
            </section>

            <section>
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs font-black">12</span>
                Limitation of Liability
              </h2>
              <p>To the maximum extent permitted by law, Revflow AIO shall not be liable for any indirect, incidental, consequential, special, or punitive damages arising out of or related to your use of the Service. Our total liability shall not exceed the amount you paid to us, if any, in the twelve (12) months preceding the claim.</p>
            </section>

            <section>
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs font-black">13</span>
                Indemnification
              </h2>
              <p>You agree to indemnify, defend, and hold harmless Revflow AIO from and against any claims, liabilities, damages, losses, and expenses arising from your use of the Service, your violation of these Terms, or your User Content or conduct.</p>
            </section>

            <section>
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs font-black">14</span>
                Governing Law
              </h2>
              <p>These Terms are governed by and construed in accordance with the laws of the <strong>State of California</strong>, without regard to conflict of law principles.</p>
            </section>

            <section>
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs font-black">15</span>
                Changes to These Terms
              </h2>
              <p>We may update these Terms from time to time. Continued use of the Service after changes constitutes acceptance of the revised Terms.</p>
            </section>

            <section className="pt-10 border-t border-gray-100">
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs font-black">16</span>
                Contact Information
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
