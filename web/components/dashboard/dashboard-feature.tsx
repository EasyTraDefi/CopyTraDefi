'use client';

import { AppHero } from '../ui/ui-layout';
import { Card, Button } from 'flowbite-react';
import Link from 'next/link';

export default function DashboardFeature() {
  return (
    <div className="container mx-auto px-4 py-8">
      <AppHero title="Welcome to TraDefi" subtitle="Your Copy Trading Platform on Solana" />

      <section className="mt-12">
        <h2 className="text-4xl font-bold text-center mb-8">Unlock Your Trading Potential</h2>
        <p className="text-xl text-gray-600 text-center mb-12">
          TraDefi is your gateway to effortless copy trading on the Solana blockchain. Join our community of successful traders and start growing your wealth today!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="bg-gradient-to-br from-purple-400 to-indigo-600 text-white">
            <h5 className="text-2xl font-semibold mb-4">Decentralized Trading</h5>
            <p className="text-lg">Experience transparent and secure trading on the Solana blockchain.</p>
            <Link href="/trading" className="mt-4 inline-block text-white hover:underline">
              Start Trading
            </Link>
          </Card>

          <Card className="bg-gradient-to-br from-green-400 to-blue-600 text-white">
            <h5 className="text-2xl font-semibold mb-4">Community-Driven Success</h5>
            <p className="text-lg">Connect with top traders and learn from their strategies.</p>
            <Link href="/community" className="mt-4 inline-block text-white hover:underline">
              Join Our Community
            </Link>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-400 to-orange-600 text-white">
            <h5 className="text-2xl font-semibold mb-4">Low Fees, High Returns</h5>
            <p className="text-lg">Benefit from Solana's lightning-fast transactions and minimal fees.</p>
            <Link href="/fees" className="mt-4 inline-block text-white hover:underline">
              Learn More
            </Link>
          </Card>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-4xl font-bold text-center mb-8">How TraDefi Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <h3 className="text-xl font-semibold mb-2">Choose Your Trader</h3>
            <p className="text-gray-600">Browse our curated list of top-performing traders.</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1c1.11 0 2.08-.402 2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold mb-2">Set Your Budget</h3>
            <p className="text-gray-600">Decide how much you want to invest in copying trades.</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2m0 5h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
            </svg>
            <h3 className="text-xl font-semibold mb-2">Start Copying</h3>
            <p className="text-gray-600">Automatically mirror the trader's moves in real-time.</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <h3 className="text-xl font-semibold mb-2">Monitor and Adjust</h3>
            <p className="text-gray-600">Keep track of your copied trades and adjust your strategy as needed.</p>
          </div>
        </div>
      </section>

      <section className="mt-16 text-center">
        <Button size="lg" color="primary">
          Get Started
        </Button>
      </section>
    </div>
  );
}