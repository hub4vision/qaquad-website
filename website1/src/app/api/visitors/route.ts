import { NextResponse } from 'next/server';
import { BetaAnalyticsDataClient } from '@google-analytics/data';

// Cache this API response for 60 seconds to avoid hitting GA rate limits
export const revalidate = 60;

export async function GET() {
  try {
    const propertyId = process.env.GA_PROPERTY_ID;
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;

    // If credentials are not set up yet, return a fallback so the frontend knows
    if (!propertyId || !clientEmail || !privateKey) {
      return NextResponse.json({ activeUsers: 0, status: 'unconfigured' });
    }

    // Initialize the Google Analytics client
    const analyticsDataClient = new BetaAnalyticsDataClient({
      credentials: {
        client_email: clientEmail,
        // The private key from GCP usually has \n characters that need to be parsed
        private_key: privateKey.replace(/\\n/g, '\n'),
      },
    });

    // Fetch the active users in the last 30 minutes
    const [response] = await analyticsDataClient.runRealtimeReport({
      property: `properties/${propertyId}`,
      metrics: [
        {
          name: 'activeUsers',
        },
      ],
    });

    const activeUsers = response.rows?.[0]?.metricValues?.[0]?.value || '0';

    return NextResponse.json({ 
      activeUsers: parseInt(activeUsers, 10),
      status: 'success'
    });
  } catch (error) {
    console.error('Error fetching real-time GA4 data:', error);
    return NextResponse.json({ activeUsers: 0, status: 'error' }, { status: 500 });
  }
}
