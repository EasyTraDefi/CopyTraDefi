'use client';

import { AppHero } from '../ui/ui-layout';
import { Card, Button } from 'flowbite-react';

export default function DashboardFeature() {
  return (
    <div className="container mx-auto px-4 py-8">
      <AppHero title="Welcome to TraDefi" subtitle="Your Copy Trading Platform on Solana" />

      <section className="mt-8">
        <h2 className="text-3xl font-bold mb-4">What's TraDefi?</h2>
        <p className="text-lg text-gray-600 mb-6">
          TraDefi is a revolutionary copy trading platform built on the Solana blockchain. Our mission is to democratize access to successful trading strategies, allowing users to effortlessly replicate trades made by experienced traders.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <h5 className="text-xl font-semibold mb-2">Decentralized</h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">Built on Solana, ensuring transparency and security.</p>
          </Card>

          <Card>
            <h5 className="text-xl font-semibold mb-2">Community-driven</h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">Connect with other traders and learn from their experiences.</p>
          </Card>

          <Card>
            <h5 className="text-xl font-semibold mb-2">Low Fees</h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">Benefit from Solana's fast transaction times and low fees.</p>
          </Card>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-bold mb-4">How it Works</h2>
        <ol className="list-decimal space-y-4 pl-4">
          <li>
            <span className="font-semibold">Choose a Trader:</span> Browse our curated list of top-performing traders.
          </li>
          <li>
            <span className="font-semibold">Set Your Budget:</span> Decide how much you want to invest in copying trades.
          </li>
          <li>
            <span className="font-semibold">Start Copying:</span> Automatically mirror the trader's moves in real-time.
          </li>
          <li>
            <span className="font-semibold">Monitor and Adjust:</span> Keep track of your copied trades and adjust your strategy as needed.
          </li>
        </ol>
      </section>

      <section className="mt-12 text-center">
        <Button size="lg" color="primary">
          Get Started
        </Button>
      </section>

      <footer className="text-center text-sm text-gray-500 mt-8">
        &copy; 2023 TraDefi. All rights reserved.
      </footer>
    </div>
  );
}

