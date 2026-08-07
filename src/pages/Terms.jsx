import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const SECTIONS = [
  { id: 'acceptance', title: 'Acceptance' },
  { id: 'use', title: 'Use of Service' },
  { id: 'accounts', title: 'Accounts' },
  { id: 'ip', title: 'Intellectual Property' },
  { id: 'disclaimers', title: 'Disclaimers' },
  { id: 'liability', title: 'Limitation of Liability' },
  { id: 'termination', title: 'Termination' },
  { id: 'governing', title: 'Governing Law' },
  { id: 'contact', title: 'Contact' },
];

const Terms = () => {
  const [active, setActive] = useState(SECTIONS[0].id);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { root: null, rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );

    const els = containerRef.current?.querySelectorAll('section[id]') || [];
    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handlePrint = () => window.print();

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold">Terms & Conditions</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">Last updated: August 6, 2026</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handlePrint} className="inline-flex items-center px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700">
            Print
          </button>
          <Link to="/" className="text-sm text-brand-600 hover:underline">Return to Home</Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* TOC */}
        <aside className="lg:col-span-3">
          <div className="sticky top-24 hidden lg:block">
            <div className="bg-white/60 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800 rounded-lg p-4 shadow-sm">
              <h3 className="text-sm font-semibold mb-3">On this page</h3>
              <nav className="space-y-2 text-sm">
                {SECTIONS.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className={`block pl-2 py-1 rounded-md hover:bg-brand-50 dark:hover:bg-gray-800 ${active === s.id ? 'font-semibold text-brand-600' : 'text-gray-600 dark:text-gray-400'}`}>
                    {s.title}
                  </a>
                ))}
              </nav>
            </div>
          </div>
          {/* Mobile quick nav */}
          <div className="lg:hidden mb-4">
            <label className="block text-xs font-medium text-gray-600 mb-1">Jump to</label>
            <select onChange={(e) => (location.hash = e.target.value)} className="w-full rounded-md border p-2 text-sm">
              {SECTIONS.map((s) => (
                <option key={s.id} value={`#${s.id}`}>{s.title}</option>
              ))}
            </select>
          </div>
        </aside>

        {/* Content */}
        <div className="lg:col-span-9">
          <article ref={containerRef} className="prose prose-lg dark:prose-invert max-w-none">
            <section id="acceptance">
              <h2>Acceptance</h2>
              <p>
                By accessing or using Bulk Saves Hub (the "Service"), you agree to be bound by these
                Terms &amp; Conditions. If you do not agree, do not use the Service.
              </p>
            </section>

            <section id="use">
              <h2>Use of Service</h2>
              <p>
                You may use the Service only in compliance with these Terms and all applicable laws. You are
                responsible for any activity that occurs under your account.
              </p>
            </section>

            <section id="accounts">
              <h2>Accounts</h2>
              <p>
                Where account registration is required, you must provide accurate information and keep your
                credentials secure. We may suspend or terminate accounts that violate these Terms.
              </p>
            </section>

            <section id="ip">
              <h2>Intellectual Property</h2>
              <p>
                All content, trademarks, and other intellectual property on the platform are the property of
                Bulk Saves Hub or its licensors. You may not reproduce or distribute our content except as
                expressly permitted.
              </p>
            </section>

            <section id="disclaimers">
              <h2>Disclaimers</h2>
              <p>
                THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. BULK
                SAVES HUB DISCLAIMS ALL WARRANTIES TO THE MAXIMUM EXTENT PERMITTED BY LAW.
              </p>
            </section>

            <section id="liability">
              <h2>Limitation of Liability</h2>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, BULK SAVES HUB WILL NOT BE LIABLE FOR ANY INDIRECT,
                INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES ARISING OUT OF OR RELATED TO THE SERVICE.
              </p>
            </section>

            <section id="termination">
              <h2>Termination</h2>
              <p>
                We may suspend or terminate your access at any time for violations of these Terms or other
                conduct we deem harmful to the Service.
              </p>
            </section>

            <section id="governing">
              <h2>Governing Law</h2>
              <p>
                These Terms are governed by the laws of the jurisdiction in which Bulk Saves Hub is
                incorporated, without regard to conflict of law rules.
              </p>
            </section>

            <section id="contact">
              <h2>Contact</h2>
              <p>
                For questions about these Terms, contact us at <a href="mailto:support@bulksaveshub.com">support@bulksaveshub.com</a>.
              </p>
            </section>
          </article>
        </div>
      </div>
    </div>
  );
};

export default Terms;
