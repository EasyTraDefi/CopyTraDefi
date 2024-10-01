// components/dashboard/dashboard.tsx

'use client';

import { useState, useEffect } from 'react';



interface DashboardProps { }

export function Dashboard({ }: DashboardProps) {







    return (
        <div className="container mx-auto px-4 py-8 min-h-screen bg-gradient-to-b from-skyblue-200 via-cyan-100 to-lightblue-200">
            {/* Hero Section */}
            <header className="relative z-10 mb-12">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-indigo-600 opacity-50"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                            Welcome to Your Copy Trade Dashboard
                        </h1>
                        <p className="mt-4 max-w-2xl text-xl text-white-300">
                            Track your trades and manage your portfolio efficiently.
                        </p>
                        <div className="mt-6">
                            <button className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out">
                                Refresh Data
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Dashboard Sections */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">




            </main>
        </div>
    );
}







// // components/dashboard/dashboard.tsx

// 'use client';

// import { useState, useEffect } from 'react';
// import TradeCard from '../trade-card/trade-card';
// import { TradeData } from '../../../Backend/types/trade-data';
// import { TransactionHistory } from '../transaction-history/transaction-history';
// import { TransactionData } from '../../../Backend/types/transaction-data';
// import { fetchTrades, fetchTransactions } from '../../../Backend/utils/apiCalls';
// import { RealTimeTradesComponent } from './RealTimeTradesComponent';
// import { SwapComponent } from './swapComponent';
// import { useWallet } from '@solana/wallet-adapter-react';
// import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

// interface DashboardProps { }

// export function Dashboard({ }: DashboardProps) {
//     const [trades, setTrades] = useState<TradeData[]>([]);
//     const [transactions, setTransactions] = useState<TransactionData[]>([]);
//     const [balance, setBalance] = useState<number>(0);
//     const [depositAmount, setDepositAmount] = useState('');
//     const [withdrawAmount, setWithdrawAmount] = useState('');
//     const [tradeSymbol, setTradeSymbol] = useState('');
//     const [tradeAmount, setTradeAmount] = useState('');

//     const wallet = useWallet();

//     useEffect(() => {
//         async function fetchData() {
//             try {
//                 const [fetchedTrades, fetchedTransactions] = await Promise.all([
//                     fetchTrades(),
//                     fetchTransactions()
//                 ]);
//                 setTrades(fetchedTrades);
//                 setTransactions(fetchedTransactions);

//                 if (wallet.publicKey) {
//                     const balanceResponse = await fetch(`/api/user-balance?userId=${wallet.publicKey.toBase58()}`);
//                     const balanceData = await balanceResponse.json();
//                     setBalance(balanceData.balance);
//                 }
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         }

//         fetchData();
//     }, [wallet.publicKey]);

//     const handleDeposit = async () => {
//         if (wallet.publicKey && Number(depositAmount) > 0) {
//             try {
//                 const response = await fetch(`/api/deposit?userId=${wallet.publicKey.toBase58()}&amount=${depositAmount}`, {
//                     method: 'POST',
//                 });
//                 const data = await response.json();
//                 console.log('Deposit result:', data);
//                 // Update balance state
//                 setBalance((prevBalance) => prevBalance + Number(depositAmount));
//             } catch (error) {
//                 console.error('Error depositing funds:', error);
//             }
//         }
//     };

//     const handleWithdraw = async () => {
//         if (wallet.publicKey && Number(withdrawAmount) > 0) {
//             try {
//                 const response = await fetch(`/api/withdrawal?userId=${wallet.publicKey.toBase58()}&amount=${withdrawAmount}`, {
//                     method: 'POST',
//                 });
//                 const data = await response.json();
//                 console.log('Withdrawal result:', data);
//                 // Update balance state
//                 setBalance((prevBalance) => prevBalance - Number(withdrawAmount));
//             } catch (error) {
//                 console.error('Error withdrawing funds:', error);
//             }
//         }
//     };

//     const handleExecuteTrade = async () => {
//         if (wallet.publicKey && Number(tradeAmount) > 0 && tradeSymbol) {
//             try {
//                 const response = await fetch(`/api/execute-trade?userId=${wallet.publicKey.toBase58()}&symbol=${tradeSymbol}&amount=${tradeAmount}`, {
//                     method: 'POST',
//                 });
//                 const data = await response.json();
//                 console.log('Trade execution result:', data);
//                 // Update trades state
//                 setTrades((prevTrades) => [...prevTrades, {
//                     id: Date.now().toString(),
//                     userId: wallet.publicKey?.toBase58() ?? '', // Use optional chaining
//                     amount: Number(tradeAmount),
//                     memeCoinName: tradeSymbol,
//                     price: Number(tradeAmount),
//                     volume: 0,
//                     traderAddress: wallet.publicKey?.toBase58() ?? '', // Use optional chaining
//                     timestamp: new Date().getTime(),
//                 }]);
//             } catch (error) {
//                 console.error('Error executing trade:', error);
//             }
//         }
//     };
//     return (
//         <div className="container mx-auto px-4 py-8 min-h-screen bg-gradient-to-b from-skyblue-200 via-cyan-100 to-lightblue-200">
//             {/* Hero Section */}
//             <header className="relative z-10 mb-12">
//                 <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-indigo-600 opacity-50"></div>
//                 <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <div className="text-center">
//                         <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
//                             Welcome to Your Copy Trade Dashboard
//                         </h1>
//                         <p className="mt-4 max-w-2xl text-xl text-white-300">
//                             Track your trades and manage your portfolio efficiently.
//                         </p>
//                         <div className="mt-6">
//                             <button className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out">
//                                 Refresh Data
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </header>

//             {/* Wallet Connection */}
//             <div className="mb-12">
//                 <WalletMultiButton />
//             </div>

//             {/* Balance Display */}
//             <div className="bg-white p-6 rounded-lg shadow-md mb-12">
//                 <h2 className="text-2xl font-semibold mb-4 text-gray-800">Your Balance</h2>
//                 <p>Current Balance: {balance} SOL</p>
//             </div>

//             {/* Deposit/Withdraw Section */}
//             <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
//                 <div className="bg-white p-6 rounded-lg shadow-md">
//                     <h2 className="text-2xl font-semibold mb-4 text-gray-800">Deposit Funds</h2>
//                     <input
//                         type="number"
//                         value={depositAmount}
//                         onChange={(e) => setDepositAmount(e.target.value)}
//                         placeholder="Enter amount to deposit"
//                         className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     <button onClick={handleDeposit} className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                         Deposit
//                     </button>
//                 </div>
//                 <div className="bg-white p-6 rounded-lg shadow-md">
//                     <h2 className="text-2xl font-semibold mb-4 text-gray-800">Withdraw Funds</h2>
//                     <input
//                         type="number"
//                         value={withdrawAmount}
//                         onChange={(e) => setWithdrawAmount(e.target.value)}
//                         placeholder="Enter amount to withdraw"
//                         className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     <button onClick={handleWithdraw} className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
//                         Withdraw
//                     </button>
//                 </div>
//             </section>

//             {/* Execute Trade Section */}
//             <div className="bg-white p-6 rounded-lg shadow-md mb-12">
//                 <h2 className="text-2xl font-semibold mb-4 text-gray-800">Execute Trade</h2>
//                 <input
//                     type="text"
//                     value={tradeSymbol}
//                     onChange={(e) => setTradeSymbol(e.target.value)}
//                     placeholder="Enter trade symbol (e.g., SOLUSDT)"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <input
//                     type="number"
//                     value={tradeAmount}
//                     onChange={(e) => setTradeAmount(e.target.value)}
//                     placeholder="Enter trade amount"
//                     className="w-full px-4 py-2 mt-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <button onClick={handleExecuteTrade} className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
//                     Execute Trade
//                 </button>
//             </div>

//             {/* Dashboard Sections */}
//             <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 {/* ... rest of your existing dashboard components ... */}
//             </main>
//         </div>
//     );
// }



