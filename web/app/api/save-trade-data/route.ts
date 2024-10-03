import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { traderAddress, copyAmount, symbol } = await request.json();

  // Here you would typically save the data to a database
  console.log('Received trade data:', traderAddress, copyAmount, symbol);

  return NextResponse.json({ message: 'Trade data saved successfully' });
}