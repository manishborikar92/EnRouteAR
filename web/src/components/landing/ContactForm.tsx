'use client';

import { useState, FormEvent } from 'react';
import Section from '@/components/layout/Section';
import { FORMSPREE_ENDPOINT } from '@/lib/constants';

// ============================================================================
// ContactForm — Contact us form with Formspree integration
// ============================================================================

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm() {
    const [status, setStatus] = useState<FormStatus>('idle');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('submitting');

        const formData = new FormData(e.currentTarget);

        try {
            const response = await fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                body: formData,
                headers: {
                    Accept: 'application/json',
                },
            });

            if (response.ok) {
                setStatus('success');
                (e.target as HTMLFormElement).reset();
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

    return (
        <Section id="contact">
            <h2 className="mb-4 text-2xl font-bold text-gold md:text-3xl">
                Contact Us
            </h2>
            <p className="mb-6 text-justify leading-relaxed text-sky">
                Fill out the form below to get in touch with our team. We&apos;re here
                to help with any questions or inquiries you may have.
            </p>

            <form
                onSubmit={handleSubmit}
                className="rounded-xl bg-navy-card p-6 shadow-lg"
            >
                <div className="mb-5">
                    <label
                        htmlFor="contact-name"
                        className="mb-2 block text-sm font-bold text-sky-light"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        id="contact-name"
                        name="name"
                        required
                        className="w-full rounded-xl border border-gray-600 bg-navy-mid px-5 py-3
                       text-gray-300 outline-none transition-colors
                       focus:border-blue focus:ring-1 focus:ring-blue"
                    />
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="contact-email"
                        className="mb-2 block text-sm font-bold text-sky-light"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="contact-email"
                        name="email"
                        required
                        className="w-full rounded-xl border border-gray-600 bg-navy-mid px-5 py-3
                       text-gray-300 outline-none transition-colors
                       focus:border-blue focus:ring-1 focus:ring-blue"
                    />
                </div>

                <div className="mb-6">
                    <label
                        htmlFor="contact-message"
                        className="mb-2 block text-sm font-bold text-sky-light"
                    >
                        Message
                    </label>
                    <textarea
                        id="contact-message"
                        name="message"
                        rows={5}
                        required
                        className="w-full resize-none rounded-xl border border-gray-600 bg-navy-mid
                       px-5 py-3 text-gray-300 outline-none transition-colors
                       focus:border-blue focus:ring-1 focus:ring-blue"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="rounded-xl bg-blue px-8 py-3 font-semibold text-white
                       transition-all duration-300 hover:bg-navy-mid
                       disabled:cursor-not-allowed disabled:opacity-50
                       active:scale-95"
                    >
                        {status === 'submitting' ? 'Sending…' : 'Send'}
                    </button>

                    {status === 'success' && (
                        <p className="text-sm font-medium text-green-400">
                            ✓ Message sent successfully!
                        </p>
                    )}
                    {status === 'error' && (
                        <p className="text-sm font-medium text-red-400">
                            ✗ Failed to send. Please try again.
                        </p>
                    )}
                </div>
            </form>
        </Section>
    );
}
