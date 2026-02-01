"use client";

import Link from "next/link";
import { ArrowLeft, Code2, GitBranch, GitPullRequest, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function ContributionGuidelines() {
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
              <Code2 className="h-4 w-4 text-primary" />
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
              Developer Guide
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none mb-4">
              Contribution Guidelines
            </h1>
            <p className="text-paper/70 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
              Learn how to make effective contributions and collaborate with the Open Source Atria community.
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
              Welcome Contributors! 🚀
            </h2>
            <p className="text-surface-lighter leading-relaxed">
              Thank you for your interest in contributing to Open Source Atria! This guide will help you understand our
              contribution workflow and best practices. Whether you&apos;re a first-time contributor or an experienced open source
              developer, we&apos;re excited to have you here.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-black uppercase tracking-tight text-ink mb-4 border-l-4 border-accent pl-4">
              Getting Started
            </h2>
            <div className="space-y-4 text-surface-lighter leading-relaxed">
              <p>
                <strong className="text-ink">1. Prerequisites:</strong> Before you begin, make sure you have:
              </p>
              <ul className="list-disc pl-8 space-y-2">
                <li>A GitHub account</li>
                <li>Git installed on your local machine</li>
                <li>Basic understanding of Git and GitHub workflows</li>
                <li>Read our <Link href="/legal/code-of-conduct" className="text-primary font-bold hover:underline">Code of Conduct</Link></li>
                <li>Registered on the OSAtria platform</li>
              </ul>
              
              <p className="mt-4">
                <strong className="text-ink">2. Choose an Issue:</strong> Browse open issues in the project repositories. 
                Look for issues labeled with:
              </p>
              <ul className="list-disc pl-8 space-y-2">
                <li><code className="bg-surface-50 px-2 py-1 rounded text-sm">good first issue</code> - Perfect for beginners</li>
                <li><code className="bg-surface-50 px-2 py-1 rounded text-sm">help wanted</code> - We need your expertise</li>
                <li><code className="bg-surface-50 px-2 py-1 rounded text-sm">hacktoberfest</code> - Event-specific contributions</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-black uppercase tracking-tight text-ink mb-4 border-l-4 border-primary pl-4">
              Contribution Workflow
            </h2>
            
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="shrink-0">
                  <div className="p-3 bg-primary text-white border-4 border-ink shadow-[4px_4px_0_0_rgba(0,0,0,1)] font-bold text-xl">
                    1
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-ink mb-2 flex items-center gap-2">
                    <GitBranch className="h-5 w-5" /> Fork & Clone
                  </h3>
                  <p className="text-surface-lighter mb-2">
                    Fork the repository to your GitHub account and clone it to your local machine:
                  </p>
                  <div className="bg-surface text-white p-4 font-mono text-sm border-4 border-ink shadow-[4px_4px_0_0_rgba(0,0,0,1)] overflow-x-auto">
                    <div>git clone https://github.com/YOUR-USERNAME/REPO-NAME.git</div>
                    <div>cd REPO-NAME</div>
                    <div>git remote add upstream https://github.com/ORIGINAL-OWNER/REPO-NAME.git</div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0">
                  <div className="p-3 bg-accent text-white border-4 border-ink shadow-[4px_4px_0_0_rgba(0,0,0,1)] font-bold text-xl">
                    2
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-ink mb-2">Create a Branch</h3>
                  <p className="text-surface-lighter mb-2">
                    Create a new branch for your feature or fix. Use descriptive branch names:
                  </p>
                  <div className="bg-surface text-white p-4 font-mono text-sm border-4 border-ink shadow-[4px_4px_0_0_rgba(0,0,0,1)] overflow-x-auto">
                    <div>git checkout -b feature/add-awesome-feature</div>
                    <div className="text-surface-lighter"># or</div>
                    <div>git checkout -b fix/bug-description</div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0">
                  <div className="p-3 bg-primary text-white border-4 border-ink shadow-[4px_4px_0_0_rgba(0,0,0,1)] font-bold text-xl">
                    3
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-ink mb-2">Make Your Changes</h3>
                  <p className="text-surface-lighter mb-2">
                    Write clean, well-documented code following the project's coding standards:
                  </p>
                  <ul className="list-disc pl-8 space-y-2 text-surface-lighter">
                    <li>Follow the existing code style and conventions</li>
                    <li>Write meaningful commit messages</li>
                    <li>Add comments where necessary</li>
                    <li>Update documentation if needed</li>
                    <li>Test your changes thoroughly</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0">
                  <div className="p-3 bg-accent text-white border-4 border-ink shadow-[4px_4px_0_0_rgba(0,0,0,1)] font-bold text-xl">
                    4
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-ink mb-2">Commit Your Changes</h3>
                  <p className="text-surface-lighter mb-2">
                    Write clear, concise commit messages using conventional commits format:
                  </p>
                  <div className="bg-surface text-white p-4 font-mono text-sm border-4 border-ink shadow-[4px_4px_0_0_rgba(0,0,0,1)] overflow-x-auto">
                    <div>git add .</div>
                    <div>git commit -m &quot;feat: add new feature&quot;</div>
                    <div className="text-surface-lighter"># or</div>
                    <div>git commit -m &quot;fix: resolve issue with component&quot;</div>
                  </div>
                  <p className="text-surface-lighter mt-3 text-sm">
                    <strong>Commit Types:</strong> feat, fix, docs, style, refactor, test, chore
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0">
                  <div className="p-3 bg-primary text-white border-4 border-ink shadow-[4px_4px_0_0_rgba(0,0,0,1)] font-bold text-xl">
                    5
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-ink mb-2 flex items-center gap-2">
                    <GitPullRequest className="h-5 w-5" /> Submit a Pull Request
                  </h3>
                  <p className="text-surface-lighter mb-2">
                    Push your changes and create a pull request:
                  </p>
                  <div className="bg-surface text-white p-4 font-mono text-sm border-4 border-ink shadow-[4px_4px_0_0_rgba(0,0,0,1)] overflow-x-auto">
                    <div>git push origin feature/add-awesome-feature</div>
                  </div>
                  <p className="text-surface-lighter mt-3">
                    Then go to GitHub and click &quot;Create Pull Request&quot;. Fill out the PR template with:
                  </p>
                  <ul className="list-disc pl-8 space-y-2 text-surface-lighter mt-2">
                    <li>Clear description of changes</li>
                    <li>Reference to related issue (e.g., "Closes #123")</li>
                    <li>Screenshots (if applicable)</li>
                    <li>Testing steps</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0">
                  <div className="p-3 bg-accent text-white border-4 border-ink shadow-[4px_4px_0_0_rgba(0,0,0,1)] font-bold text-xl">
                    6
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-ink mb-2 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" /> Review & Iterate
                  </h3>
                  <p className="text-surface-lighter">
                    Respond to code review feedback promptly. Make requested changes and push updates to your branch. 
                    The PR will automatically update. Once approved, a maintainer will merge your contribution!
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-black uppercase tracking-tight text-ink mb-4 border-l-4 border-accent pl-4">
              Code Quality Standards
            </h2>
            <div className="space-y-4 text-surface-lighter leading-relaxed">
              <p>
                <strong className="text-ink">Style Guidelines:</strong>
              </p>
              <ul className="list-disc pl-8 space-y-2">
                <li><strong>JavaScript/TypeScript:</strong> Follow ESLint rules configured in the project</li>
                <li><strong>Python:</strong> Follow PEP 8 style guide</li>
                <li><strong>Formatting:</strong> Use Prettier for code formatting</li>
                <li><strong>Naming:</strong> Use descriptive, meaningful variable and function names</li>
                <li><strong>Documentation:</strong> Add JSDoc/docstrings for functions and components</li>
              </ul>

              <p className="mt-6">
                <strong className="text-ink">Testing Requirements:</strong>
              </p>
              <ul className="list-disc pl-8 space-y-2">
                <li>Write unit tests for new features</li>
                <li>Ensure all existing tests pass</li>
                <li>Aim for at least 80% code coverage</li>
                <li>Test edge cases and error scenarios</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-black uppercase tracking-tight text-ink mb-4 border-l-4 border-primary pl-4">
              Pull Request Best Practices
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-green-50 border-l-4 border-green-600">
                <h3 className="text-lg font-bold text-green-800 mb-3">✅ DO</h3>
                <ul className="space-y-2 text-sm text-green-900">
                  <li>Keep PRs focused and small</li>
                  <li>Write descriptive PR titles</li>
                  <li>Link related issues</li>
                  <li>Add screenshots for UI changes</li>
                  <li>Respond to reviews promptly</li>
                  <li>Update documentation</li>
                  <li>Test thoroughly before submitting</li>
                </ul>
              </div>

              <div className="p-6 bg-red-50 border-l-4 border-red-600">
                <h3 className="text-lg font-bold text-red-800 mb-3">❌ DON'T</h3>
                <ul className="space-y-2 text-sm text-red-900">
                  <li>Submit massive PRs with unrelated changes</li>
                  <li>Ignore code review feedback</li>
                  <li>Break existing functionality</li>
                  <li>Skip testing</li>
                  <li>Use vague commit messages</li>
                  <li>Force push after review started</li>
                  <li>Include commented-out code</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-black uppercase tracking-tight text-ink mb-4 border-l-4 border-accent pl-4">
              Types of Contributions
            </h2>
            <div className="space-y-6">
              <div className="p-6 bg-surface-50 border-l-4 border-primary">
                <h3 className="text-xl font-bold text-ink mb-2">🐛 Bug Fixes</h3>
                <p className="text-surface-lighter">
                  Found a bug? Create an issue first describing the bug, then submit a fix with test cases.
                </p>
              </div>

              <div className="p-6 bg-surface-50 border-l-4 border-accent">
                <h3 className="text-xl font-bold text-ink mb-2">✨ New Features</h3>
                <p className="text-surface-lighter">
                  Discuss the feature in an issue before starting work. Ensure it aligns with project goals.
                </p>
              </div>

              <div className="p-6 bg-surface-50 border-l-4 border-primary">
                <h3 className="text-xl font-bold text-ink mb-2">📚 Documentation</h3>
                <p className="text-surface-lighter">
                  Improve README, add code comments, create tutorials, or fix typos. Documentation is crucial!
                </p>
              </div>

              <div className="p-6 bg-surface-50 border-l-4 border-accent">
                <h3 className="text-xl font-bold text-ink mb-2">🎨 Design & UI</h3>
                <p className="text-surface-lighter">
                  Enhance user experience, improve accessibility, or refine visual elements.
                </p>
              </div>

              <div className="p-6 bg-surface-50 border-l-4 border-primary">
                <h3 className="text-xl font-bold text-ink mb-2">🧪 Testing</h3>
                <p className="text-surface-lighter">
                  Add test coverage, write integration tests, or improve testing infrastructure.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-black uppercase tracking-tight text-ink mb-4 border-l-4 border-primary pl-4">
              Communication Channels
            </h2>
            <div className="space-y-4 text-surface-lighter leading-relaxed">
              <ul className="list-disc pl-8 space-y-2">
                <li><strong className="text-ink">GitHub Issues:</strong> For bug reports and feature requests</li>
                <li><strong className="text-ink">GitHub Discussions:</strong> For questions and community discussions</li>
                <li><strong className="text-ink">WhatsApp:</strong> For real-time chat and collaboration. <a className="text-green-400 hover:text-green-500" href="https://chat.whatsapp.com/DmWJm7XyQjeAg1psXWUj6K?mode=gi_t">Join WhatsApp</a></li>
                {/* <li><strong className="text-ink">Email:</strong> <a href="mailto:opensource@atria.edu" className="text-primary font-bold hover:underline">opensource@atria.edu</a> for private inquiries</li> */}
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-black uppercase tracking-tight text-ink mb-4 border-l-4 border-accent pl-4">
              Recognition & Rewards
            </h2>
            <div className="space-y-4 text-surface-lighter leading-relaxed">
              <p>We value every contribution! Contributors will receive:</p>
              <ul className="list-disc pl-8 space-y-2">
                <li>Recognition in the project&apos;s contributor list</li>
                <li>Certificate of contribution</li>
                <li>Contributor badge on the OSAtria platform</li>
                <li>Eligibility for event prizes and swag</li>
                <li>Networking opportunities with mentors and peers</li>
              </ul>
            </div>
          </section>

          {/* Related Links */}
          <section className="mt-16 pt-8 border-t-4 border-ink">
            <h3 className="text-2xl font-black uppercase tracking-tight text-ink mb-6">
              Related Documents
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href="/legal/terms-of-participation"
                className="p-6 bg-surface-light text-white border-4 border-ink shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] transition-all"
              >
                <h4 className="font-bold text-xl mb-2">Terms of Participation</h4>
                <p className="text-sm text-paper/75">Event terms and conditions</p>
              </Link>
              <Link
                href="/legal/code-of-conduct"
                className="p-6 bg-surface-light text-white border-4 border-ink shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] transition-all"
              >
                <h4 className="font-bold text-xl mb-2">Code of Conduct</h4>
                <p className="text-sm text-paper/75">Community standards and expectations</p>
              </Link>
            </div>
          </section>

          {/* Call to Action */}
          {/* <section className="mt-16 p-8 bg-primary text-white border-4 border-ink shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
            <h3 className="text-3xl font-black uppercase mb-4">Ready to Contribute?</h3>
            <p className="text-lg mb-6">
              Start your open source journey with Open Source Atria today! Check out our projects and find an issue that interests you.
            </p>
            <Link href="/">
              <Button className="bg-accent hover:bg-accent-600 text-white border-4 border-ink shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
                Browse Projects
              </Button>
            </Link>
          </section> */}
        </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t-4 border-ink bg-surface/5">
        <div className="max-w-5xl mx-auto px-4 text-center">
          {/* <p className="text-surface-lighter text-xs mb-2">
            Need help? Reach out at{" "}
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
