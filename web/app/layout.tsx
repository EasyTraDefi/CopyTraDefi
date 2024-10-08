import './global.css';
import { UiLayout } from '../components/ui/ui-layout';
import { ClusterProvider } from '../components/cluster/cluster-data-access';
import { SolanaProvider } from '../components/solana/solana-provider';
import { ReactQueryProvider } from './react-query-provider';

export const metadata = {
  title: 'TraDefi',
  description: 'The Best Copy Trading Platform',
};

const links: { label: string; path: string }[] = [
  { label: 'Account', path: '/account' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'TraDefi', path: '/tradefi' },

];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className='bg-gradient-to-b from-skyblue-200 via-cyan-100 to-lightblue-200'>
        <ReactQueryProvider>
          <ClusterProvider>
            <SolanaProvider>
              <UiLayout links={links}>{children}</UiLayout>
            </SolanaProvider>
          </ClusterProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
