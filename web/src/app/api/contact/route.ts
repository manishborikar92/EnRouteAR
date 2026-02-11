import { NextRequest, NextResponse } from 'next/server';

// ============================================================================
// Contact Form API Route — POST /api/contact
// Proxies form submissions to Formspree (avoids exposing endpoint client-side)
// ============================================================================

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, message } = body;

        // Basic validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'All fields are required.' },
                { status: 400 }
            );
        }

        const formspreeEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

        if (!formspreeEndpoint) {
            return NextResponse.json(
                { error: 'Form service is not configured.' },
                { status: 500 }
            );
        }

        const response = await fetch(formspreeEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({ name, email, message }),
        });

        if (response.ok) {
            return NextResponse.json({ success: true });
        } else {
            const error = await response.text();
            return NextResponse.json(
                { error: 'Failed to submit form.', details: error },
                { status: response.status }
            );
        }
    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'Internal server error.' },
            { status: 500 }
        );
    }
}
