"use client";

import { LegalLayout } from "@/components/layout/LegalLayout";
import { GitBranch, GitPullRequest, Code2, CheckCircle2, AlertOctagon } from "lucide-react";

export default function ContributionGuidelines() {
  return (
    <LegalLayout
      title="Contribution Guidelines"
      description="Learn how to make effective contributions and collaborate with the Atria Summer of Code community."
      badge="DEVELOP"
      lastUpdated="February 1, 2026"
    >
      <div className="space-y-16 text-ink/80 text-lg leading-relaxed">

        {/* Intro */}
        <section className="bg-primary/5 p-8 border-l-4 border-primary">
          <h2 className="text-3xl font-black text-ink uppercase tracking-tighter mb-4">Welcome Contributors! 🚀</h2>
          <p className="font-medium text-xl">
            Thank you for your interest in contributing to Atria Summer of Code! This guide will help you understand our contribution workflow and best practices. Whether you&apos;re a first-time contributor or an experienced open source developer, we&apos;re excited to have you here.
          </p>
        </section>

        {/* 1. Getting Started */}
        <section>
          <h2 className="text-4xl font-black text-ink uppercase tracking-tighter mb-8 flex items-center gap-4">
            <span className="w-12 h-12 bg-ink text-paper flex items-center justify-center text-2xl rounded-none">1</span>
            Getting Started
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-surface p-6 border border-ink/10">
              <h3 className="font-bold text-ink uppercase mb-4 text-xl">Prerequisites</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>A GitHub account</li>
                <li>Git installed on your local machine</li>
                <li>Basic understanding of Git workflows</li>
                <li>Registered on the Atria Summer of Code platform</li>
              </ul>
            </div>

            <div className="bg-surface p-6 border border-ink/10">
              <h3 className="font-bold text-ink uppercase mb-4 text-xl">Find an Issue</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-3">
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-bold uppercase rounded-none border border-green-300">good first issue</span>
                  Perfect for beginners
                </li>
                <li className="flex items-center gap-3">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-bold uppercase rounded-none border border-blue-300">help wanted</span>
                  We need expertise
                </li>
                <li className="flex items-center gap-3">
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-bold uppercase rounded-none border border-purple-300">hacktoberfest</span>
                  Event-specific
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 2. Workflow */}
        <section>
          <h2 className="text-4xl font-black text-ink uppercase tracking-tighter mb-8 flex items-center gap-4">
            <span className="w-12 h-12 bg-ink text-paper flex items-center justify-center text-2xl rounded-none">2</span>
            Workflow
          </h2>

          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-6 before:w-0.5 before:-z-10 before:bg-ink/10">
            {/* Step 1 */}
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-surface border-4 border-ink flex items-center justify-center shrink-0 z-10">
                <GitBranch className="w-6 h-6 text-ink" />
              </div>
              <div className="bg-surface p-6 border border-ink/10 grow">
                <h3 className="font-bold text-xl uppercase mb-2">Fork & Clone</h3>
                <div className="bg-black text-green-400 p-4 font-(family-name:--font-jetbrains) text-sm rounded-none border border-ink/20 overflow-x-auto">
                  git clone https://github.com/YOUR-USERNAME/REPO-NAME.git<br />
                  cd REPO-NAME<br />
                  git remote add upstream https://github.com/ORIGINAL-OWNER/REPO-NAME.git
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-surface border-4 border-primary flex items-center justify-center shrink-0 z-10">
                <Code2 className="w-6 h-6 text-primary" />
              </div>
              <div className="bg-surface p-6 border border-primary/20 grow">
                <h3 className="font-bold text-xl uppercase mb-2">Create Branch & Code</h3>
                <div className="bg-black text-green-400 p-4 font-(family-name:--font-jetbrains) text-sm rounded-none border border-ink/20 overflow-x-auto mb-4">
                  git checkout -b feature/amazing-feature
                </div>
                <p className="text-base text-ink/70">Write clean code, follow style guides, and test thoroughly.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-surface border-4 border-accent flex items-center justify-center shrink-0 z-10">
                <GitPullRequest className="w-6 h-6 text-accent" />
              </div>
              <div className="bg-surface p-6 border border-accent/20 grow">
                <h3 className="font-bold text-xl uppercase mb-2">Submit PR</h3>
                <div className="bg-black text-green-400 p-4 font-(family-name:--font-jetbrains) text-sm rounded-none border border-ink/20 overflow-x-auto mb-4">
                  git push origin feature/amazing-feature
                </div>
                <p className="text-base text-ink/70">Open a Pull Request on GitHub. Fill out the template completely.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Best Practices */}
        <section>
          <h2 className="text-4xl font-black text-ink uppercase tracking-tighter mb-8 flex items-center gap-4">
            <span className="w-12 h-12 bg-ink text-paper flex items-center justify-center text-2xl rounded-none">3</span>
            Best Practices
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-green-50/50 p-8 border-t-4 border-green-500">
              <h3 className="font-black text-green-900 uppercase text-xl mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6" /> Do This
              </h3>
              <ul className="space-y-3 text-green-900/80">
                <li>✅ Keep PRs small and focused</li>
                <li>✅ Write descriptive commit messages</li>
                <li>✅ Add screenshots for UI changes</li>
                <li>✅ Update documentation</li>
              </ul>
            </div>

            <div className="bg-red-50/50 p-8 border-t-4 border-red-500">
              <h3 className="font-black text-red-900 uppercase text-xl mb-4 flex items-center gap-2">
                <AlertOctagon className="w-6 h-6" /> Don&apos;t Do This
              </h3>
              <ul className="space-y-3 text-red-900/80">
                <li>❌ Submit massive PRs with multiple features</li>
                <li>❌ Ignore code review feedback</li>
                <li>❌ Break existing tests</li>
                <li>❌ Force push without communication</li>
              </ul>
            </div>
          </div>
        </section>

      </div>
    </LegalLayout>
  );
}
