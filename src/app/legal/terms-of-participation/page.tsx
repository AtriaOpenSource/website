import { LegalLayout } from "@/components/layout/LegalLayout";
import { CheckCircle2, XCircle } from "lucide-react";

export default function TermsOfParticipation() {
  return (
    <LegalLayout
      title="Terms of Participation"
      description="Please read these terms carefully before participating in the Atria Summer of Code event."
      lastUpdated="February 1, 2026"
    >
      <div className="space-y-12 text-ink/80 text-lg leading-relaxed">

        {/* Intro */}
        <section>
          <div className="border-l-4 border-ink pl-6 py-2 bg-ink/5 mb-8">
            <h2 className="text-3xl font-black text-ink uppercase tracking-tighter mb-4">Agreement</h2>
            <p className="font-medium">
              By participating in the Atria Summer of Code event (&quot;the Event&quot;), you agree to comply with these Terms of Participation. This event is a collaboration between Apex Community and OSCode, designed to foster open-source contributions and community building.
            </p>
          </div>
        </section>

        {/* 1. Eligibility */}
        <section>
          <h2 className="text-3xl font-black text-ink uppercase tracking-tighter mb-6 flex items-center gap-3">
            <div className="bg-primary/20 text-primary w-10 h-10 flex items-center justify-center rounded-none font-(family-name:--font-jetbrains) text-xl">01</div>
            Eligibility
          </h2>
          <ul className="grid gap-4">
            <li className="bg-surface p-6 border-l-4 border-primary shadow-sm flex gap-4">
              <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-1" />
              <div>
                <strong className="block text-ink font-bold uppercase mb-1">Institutional Access</strong>
                <p>The Event is open to all students, faculty, and staff with a valid ID card.</p>
              </div>
            </li>
            <li className="bg-surface p-6 border-l-4 border-primary shadow-sm flex gap-4">
              <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-1" />
              <div>
                <strong className="block text-ink font-bold uppercase mb-1">Age Requirement</strong>
                <p>Participants must be at least 18 years of age or have parental/guardian consent.</p>
              </div>
            </li>
          </ul>
        </section>

        {/* 2. Requirements */}
        <section>
          <h2 className="text-3xl font-black text-ink uppercase tracking-tighter mb-6 flex items-center gap-3">
            <div className="bg-primary/20 text-primary w-10 h-10 flex items-center justify-center rounded-none font-(family-name:--font-jetbrains) text-xl">02</div>
            Requirements
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-surface-50 p-6 border border-ink/10">
              <h3 className="font-bold text-ink uppercase mb-2">Registration</h3>
              <p>All participants must register through the official Atria Summer of Code platform using their GitHub account.</p>
            </div>
            <div className="bg-surface-50 p-6 border border-ink/10">
              <h3 className="font-bold text-ink uppercase mb-2">Code of Conduct</h3>
              <p>Participants must adhere to our Code of Conduct at all times during the Event.</p>
            </div>
            <div className="bg-surface-50 p-6 border border-ink/10">
              <h3 className="font-bold text-ink uppercase mb-2">Original Work</h3>
              <p>All contributions must be original work created by the participant or properly attributed.</p>
            </div>
            <div className="bg-surface-50 p-6 border border-ink/10">
              <h3 className="font-bold text-ink uppercase mb-2">Licensing</h3>
              <p>All code contributions must be made under an OSI-approved open source license.</p>
            </div>
          </div>
        </section>

        {/* 3. Intellectual Property */}
        <section>
          <h2 className="text-3xl font-black text-ink uppercase tracking-tighter mb-6 flex items-center gap-3">
            <div className="bg-primary/20 text-primary w-10 h-10 flex items-center justify-center rounded-none font-(family-name:--font-jetbrains) text-xl">03</div>
            Intellectual Property
          </h2>
          <div className="space-y-4">
            <p>
              <strong className="text-ink">Ownership:</strong> Participants retain ownership of their contributions, but grant the project maintainers a license to use, modify, and distribute the contributions.
            </p>
            <p>
              <strong className="text-ink">Attribution:</strong> All contributions will be attributed to the contributor through Git commit history.
            </p>
            <p>
              <strong className="text-ink">Third-Party Content:</strong> Participants must not include copyrighted material without permission.
            </p>
          </div>
        </section>

        {/* 4. Prohibited Conduct */}
        <section>
          <h2 className="text-3xl font-black text-ink uppercase tracking-tighter mb-6 flex items-center gap-3">
            <div className="bg-red-500/10 text-red-500 w-10 h-10 flex items-center justify-center rounded-none font-(family-name:--font-jetbrains) text-xl">04</div>
            Prohibited Conduct
          </h2>
          <div className="bg-red-50/50 border-2 border-red-500/20 p-6">
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
              <li className="flex items-start gap-3 text-red-900/80">
                <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                Malicious code or viruses
              </li>
              <li className="flex items-start gap-3 text-red-900/80">
                <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                Plagiarism
              </li>
              <li className="flex items-start gap-3 text-red-900/80">
                <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                Harassment or discrimination
              </li>
              <li className="flex items-start gap-3 text-red-900/80">
                <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                Unauthorized access
              </li>
              <li className="flex items-start gap-3 text-red-900/80">
                <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                Violating laws
              </li>
              <li className="flex items-start gap-3 text-red-900/80">
                <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                Spam or unauthorized ads
              </li>
            </ul>
          </div>
        </section>

        {/* 5. Liability & Enforcement */}
        <section className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-black text-ink uppercase tracking-tighter mb-4">Liability</h2>
            <div className="prose prose-p:text-ink/70">
              <p>The Event and platform are provided &quot;as is&quot; without warranties of any kind.</p>
              <p>The organizers shall not be liable for any damages arising from participation.</p>
              <p>We are not responsible for technical failures or connectivity issues.</p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-black text-ink uppercase tracking-tighter mb-4">Enforcement</h2>
            <div className="prose prose-p:text-ink/70">
              <p>Violation of these terms may result in immediate disqualification.</p>
              <p>Organizers reserve the right to modify these terms at any time.</p>
              <p>We reserve the right to cancel or postpone the event if necessary.</p>
            </div>
          </div>
        </section>

        {/* Acknowledgment */}
        <section className="bg-ink text-paper p-8 text-center">
          <p className="text-lg font-medium">
            By participating in Atria Summer of Code, you acknowledge that you have read, understood, and agree to be bound by these Terms of Participation.
          </p>
        </section>
      </div>
    </LegalLayout>
  );
}
