"use client";

import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { motion } from "framer-motion";

export default function TermsOfParticipation() {
  return (
    <div className="min-h-screen bg-paper">
      {/* Minimal Header */}
      <header className="sticky top-0 z-40 w-full bg-paper/80 backdrop-blur-md border-b-4 border-ink">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <ArrowLeft className="h-4 w-4 text-primary group-hover:-translate-x-1 transition-transform" />
            <span className="font-black tracking-tighter text-xl">
              OS<span className="text-primary">ATRIA</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-surface-lighter hidden sm:inline">LEGAL</span>
            <div className="h-8 w-8 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
              <FileText className="h-4 w-4 text-primary" />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-ink text-paper py-16 px-4 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent rounded-full blur-[100px]" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block px-3 py-1 bg-primary text-[10px] font-black tracking-[0.2em] uppercase mb-4">
              Legal Document
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none mb-4">
              Terms of Participation
            </h1>
            <p className="text-paper/70 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
              Please read these terms carefully before participating in the Open Source Atria event.
            </p>
            <p className="text-paper/50 mt-4 font-mono text-sm">
              Last Updated: February 1, 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-3xl font-black uppercase tracking-tight text-ink mb-4 border-l-4 border-primary pl-4">
              Welcome to Open Source Atria
            </h2>
            <p className="text-surface-lighter leading-relaxed">
              By participating in the Open Source Atria event (&quot;the Event&quot;), you agree to comply with these Terms of Participation.
              This event is a collaboration between Apex Community and OSCode, designed to foster open-source contributions and community building.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-black uppercase tracking-tight text-ink mb-4 border-l-4 border-accent pl-4">
              1. Eligibility
            </h2>
            <div className="space-y-4 text-surface-lighter leading-relaxed">
              <p>
                <strong className="text-ink">1.1</strong> The Event is open to all students, faculty, and staff of Atria Institute of Technology.
              </p>
              <p>
                <strong className="text-ink">1.2</strong> Participants must have a valid institutional ID card for registration and authentication.
              </p>
              <p>
                <strong className="text-ink">1.3</strong> Participants must be at least 16 years of age or have parental/guardian consent.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-black uppercase tracking-tight text-ink mb-4 border-l-4 border-primary pl-4">
              2. Participation Requirements
            </h2>
            <div className="space-y-4 text-surface-lighter leading-relaxed">
              <p>
                <strong className="text-ink">2.1 Registration:</strong> All participants must register through the official OSAtria platform using their GitHub account.
              </p>
              <p>
                <strong className="text-ink">2.2 Code of Conduct:</strong> Participants must adhere to our{" "}
                <Link href="/legal/code-of-conduct" className="text-primary font-bold hover:underline">
                  Code of Conduct
                </Link>{" "}
                at all times during the Event.
              </p>
              <p>
                <strong className="text-ink">2.3 Original Work:</strong> All contributions must be original work created by the participant or properly attributed to external sources.
              </p>
              <p>
                <strong className="text-ink">2.4 Open Source Licensing:</strong> All code contributions must be made under an OSI-approved open source license as specified by the project.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-black uppercase tracking-tight text-ink mb-4 border-l-4 border-accent pl-4">
              3. Intellectual Property
            </h2>
            <div className="space-y-4 text-surface-lighter leading-relaxed">
              <p>
                <strong className="text-ink">3.1 Ownership:</strong> Participants retain ownership of their contributions, but grant the project maintainers a license to use, modify, and distribute the contributions as per the project&apos;s open source license.
              </p>
              <p>
                <strong className="text-ink">3.2 Attribution:</strong> All contributions will be attributed to the contributor through Git commit history and project documentation.
              </p>
              <p>
                <strong className="text-ink">3.3 Third-Party Content:</strong> Participants must not include copyrighted material, proprietary code, or any content that infringes on third-party intellectual property rights.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-black uppercase tracking-tight text-ink mb-4 border-l-4 border-primary pl-4">
              4. Event Activities
            </h2>
            <div className="space-y-4 text-surface-lighter leading-relaxed">
              <p>
                <strong className="text-ink">4.1 Workshops & Sessions:</strong> Participants are encouraged to attend workshops, mentoring sessions, and networking events organized as part of the Event.
              </p>
              <p>
                <strong className="text-ink">4.2 Collaboration:</strong> Participants are expected to collaborate respectfully with other contributors, maintainers, and organizers.
              </p>
              <p>
                <strong className="text-ink">4.3 Communication:</strong> Official communication will be conducted through the OSAtria platform, email, and designated communication channels (Discord, Slack, etc.).
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-black uppercase tracking-tight text-ink mb-4 border-l-4 border-accent pl-4">
              5. Prohibited Conduct
            </h2>
            <div className="space-y-4 text-surface-lighter leading-relaxed">
              <p>Participants must NOT:</p>
              <ul className="list-disc pl-8 space-y-2">
                <li>Submit malicious code, viruses, or any harmful software</li>
                <li>Engage in plagiarism or submit work that is not their own</li>
                <li>Harass, discriminate against, or abuse other participants</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Attempt to gain unauthorized access to Event systems or data</li>
                <li>Spam, advertise, or promote commercial products without permission</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-black uppercase tracking-tight text-ink mb-4 border-l-4 border-primary pl-4">
              6. Privacy & Data Protection
            </h2>
            <div className="space-y-4 text-surface-lighter leading-relaxed">
              <p>
                <strong className="text-ink">6.1 Data Collection:</strong> We collect participant names, email addresses, and contribution data for Event administration and analytics.
              </p>
              <p>
                <strong className="text-ink">6.2 Data Usage:</strong> Collected data will be used solely for Event purposes and will not be shared with third parties without consent.
              </p>
              <p>
                <strong className="text-ink">6.3 Data Security:</strong> We implement industry-standard security measures to protect participant data.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-black uppercase tracking-tight text-ink mb-4 border-l-4 border-accent pl-4">
              7. Disclaimers & Liability
            </h2>
            <div className="space-y-4 text-surface-lighter leading-relaxed">
              <p>
                <strong className="text-ink">7.1 No Warranty:</strong> The Event and platform are provided &quot;as is&quot; without warranties of any kind.
              </p>
              <p>
                <strong className="text-ink">7.2 Limitation of Liability:</strong> The organizers, Apex Community, and OSCode shall not be liable for any damages arising from participation in the Event.
              </p>
              <p>
                <strong className="text-ink">7.3 Technical Issues:</strong> The organizers are not responsible for technical failures, internet connectivity issues, or force majeure events.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-black uppercase tracking-tight text-ink mb-4 border-l-4 border-primary pl-4">
              8. Termination & Enforcement
            </h2>
            <div className="space-y-4 text-surface-lighter leading-relaxed">
              <p>
                <strong className="text-ink">8.1 Violation Consequences:</strong> Violation of these Terms may result in immediate disqualification, removal from the Event, and reporting to institutional authorities.
              </p>
              <p>
                <strong className="text-ink">8.2 Right to Modify:</strong> The organizers reserve the right to modify these Terms at any time. Participants will be notified of significant changes.
              </p>
              <p>
                <strong className="text-ink">8.3 Right to Terminate:</strong> The organizers reserve the right to cancel or postpone the Event due to unforeseen circumstances.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-black uppercase tracking-tight text-ink mb-4 border-l-4 border-accent pl-4">
              9. Acknowledgment
            </h2>
            <p className="text-surface-lighter leading-relaxed">
              By participating in Open Source Atria, you acknowledge that you have read, understood, and agree to be bound by these Terms of Participation.
            </p>
          </section>

          {/* Related Links */}
          <section className="mt-16 pt-8 border-t-4 border-ink">
            <h3 className="text-2xl font-black uppercase tracking-tight text-ink mb-6">
              Related Documents
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href="/legal/code-of-conduct"
                className="p-6 bg-surface-light text-white border-4 border-ink shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] transition-all"
              >
                <h4 className="font-bold text-xl mb-2">Code of Conduct</h4>
                <p className="text-sm text-paper/75">Community standards and expectations</p>
              </Link>
              <Link
                href="/legal/contribution-guidelines"
                className="p-6 bg-surface-light text-white border-4 border-ink shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] transition-all"
              >
                <h4 className="font-bold text-xl mb-2">Contribution Guidelines</h4>
                <p className="text-sm text-paper/75">How to contribute effectively</p>
              </Link>
            </div>
          </section>
        </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t-4 border-ink bg-surface/5">
        <div className="max-w-5xl mx-auto px-4 text-center">
          {/* <p className="text-surface-lighter text-xs mb-2">
            Questions? Contact us at{" "}
            <a href="mailto:opensource@atria.edu" className="text-primary hover:underline font-medium">
              opensource@atria.edu
            </a>
          </p> */}
          <p className="text-surface-lighter text-[10px]">
            © {new Date().getFullYear()} Atria Open Source Community. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
