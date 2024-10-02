import PortfolioPage from '~/components/cluster/portfolio';
import ClusterFeature from '../../components/cluster/cluster-feature';
import DepositForm from '~/components/depositfunds';

export default function Page() {
  return (
    <>
      <div className='flex '>
        <DepositForm />
        <PortfolioPage />
      </div>
      <ClusterFeature />


    </>
  );
}
