import { LegalLayout } from "@/components/layout/LegalLayout";
import { Shield, Users, MessageCircle, AlertCircle } from "lucide-react";

export default function CodeOfConduct() {
  return (
    <LegalLayout
      title="Code of Conduct"
      description="Our commitment to fostering an open, welcoming, and inclusive environment for all participants."
      lastUpdated="February 1, 2026"
    >
      <div className="space-y-12 text-ink/80 text-lg leading-relaxed">

        {/* Intro */}
        <section>
          <div className="border-l-4 border-primary pl-6 py-2 bg-primary/5 mb-8">
            <h2 className="text-3xl font-black text-ink uppercase tracking-tighter mb-4">Our Pledge</h2>
            <p className="font-medium">
              In the interest of fostering an open and welcoming environment, we as contributors, maintainers, and organizers pledge to make participation in Atria Summer of Code a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.
            </p>
          </div>
        </section>

        {/* Standards */}
        <section>
          <h2 className="text-3xl font-black text-ink uppercase tracking-tighter mb-6 flex items-center gap-3">
            <Shield className="h-8 w-8 text-primary" />
            Our Standards
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-green-50/50 p-6 border-t-4 border-green-500 shadow-sm">
              <h3 className="text-xl font-bold text-green-900 mb-4 uppercase tracking-tight flex items-center gap-2">
                <Users className="h-5 w-5" />
                Positive Behavior
              </h3>
              <ul className="space-y-3 text-green-900/80 text-base list-disc list-inside marker:text-green-500">
                <li>Using welcoming and inclusive language</li>
                <li>Being respectful of differing viewpoints and experiences</li>
                <li>Gracefully accepting constructive criticism</li>
                <li>Focusing on what is best for the community</li>
                <li>Showing empathy towards other community members</li>
              </ul>
            </div>

            <div className="bg-red-50/50 p-6 border-t-4 border-red-500 shadow-sm">
              <h3 className="text-xl font-bold text-red-900 mb-4 uppercase tracking-tight flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Unacceptable Behavior
              </h3>
              <ul className="space-y-3 text-red-900/80 text-base list-disc list-inside marker:text-red-500">
                <li>The use of sexualized language or imagery</li>
                <li>Trolling, insulting/derogatory comments</li>
                <li>Public or private harassment</li>
                <li>Publishing others&apos; private information</li>
                <li>Other conduct which could reasonably be considered inappropriate</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Responsibilities */}
        <section>
          <h2 className="text-3xl font-black text-ink uppercase tracking-tighter mb-6">Our Responsibilities</h2>
          <p className="mb-4">
            Event organizers and project maintainers are responsible for clarifying the standards of acceptable behavior and are expected to take appropriate and fair corrective action in response to any instances of unacceptable behavior.
          </p>
          <p>
            Event organizers have the right and responsibility to remove, edit, or reject comments, commits, code, wiki edits, issues, and other contributions that are not aligned with this Code of Conduct, or to ban temporarily or permanently any contributor for behaviors that they deem inappropriate, threatening, offensive, or harmful.
          </p>
        </section>

        {/* Scope */}
        <section>
          <h2 className="text-3xl font-black text-ink uppercase tracking-tighter mb-6">Scope</h2>
          <p className="mb-4">
            This Code of Conduct applies to all Atria Summer of Code spaces, including but not limited to:
          </p>
          <ul className="grid sm:grid-cols-2 gap-4 mt-6">
            <li className="bg-surface p-4 border border-ink/10 rounded-none font-(family-name:--font-jetbrains) text-sm text-ink/70 flex items-center gap-3">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              The Atria Summer of Code platform website
            </li>
            <li className="bg-surface p-4 border border-ink/10 rounded-none font-(family-name:--font-jetbrains) text-sm text-ink/70 flex items-center gap-3">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              GitHub repositories & discussions
            </li>
            <li className="bg-surface p-4 border border-ink/10 rounded-none font-(family-name:--font-jetbrains) text-sm text-ink/70 flex items-center gap-3">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              Communication channels (Discord, WhatsApp)
            </li>
            <li className="bg-surface p-4 border border-ink/10 rounded-none font-(family-name:--font-jetbrains) text-sm text-ink/70 flex items-center gap-3">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              In-person & virtual events
            </li>
          </ul>
        </section>

        {/* Enforcement */}
        <section>
          <h2 className="text-3xl font-black text-ink uppercase tracking-tighter mb-6 flex items-center gap-3">
            <MessageCircle className="h-8 w-8 text-primary" />
            Enforcement
          </h2>

          <div className="bg-ink/5 p-8 border-l-4 border-ink">
            <p className="mb-4">
              Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by contacting the event organizers. All complaints will be reviewed and investigated promptly and fairly.
            </p>
            <div className="grid sm:grid-cols-2 gap-8 mt-6">
              <div>
                <strong className="block text-ink font-bold uppercase text-sm mb-2">Confidentiality</strong>
                <p className="text-base">All reports will be kept confidential. We will only share details after consulting with the reporter.</p>
              </div>
              <div>
                <strong className="block text-ink font-bold uppercase text-sm mb-2">Investigation</strong>
                <ol className="list-decimal list-inside space-y-1 text-base">
                  <li>Receipt & acknowledgment (24h)</li>
                  <li>Incident investigation</li>
                  <li>Decision on action</li>
                  <li>Communication & follow-up</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Attribution */}
        <section className="pt-8 border-t border-ink/10 text-sm text-ink/50">
          <p>
            This Code of Conduct is adapted from the <a href="https://www.contributor-covenant.org/version/2/1/code_of_conduct/" className="underline hover:text-primary transition-colors">Contributor Covenant, version 2.1</a>, and inspired by the <a href="https://github.com/MLH/mlh-policies" className="underline hover:text-primary transition-colors">Major League Hacking Code of Conduct</a>.
          </p>
        </section>

      </div>
    </LegalLayout>
  );
}
