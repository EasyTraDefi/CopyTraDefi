import DepositForm from "~/components/depositfunds"
import AccountDetailFeature from "../../../components/account/account-detail-feature"


export default function Page() {

  return (
    <div className='flex justify-between gap-3'>
      <DepositForm />
      <AccountDetailFeature />
    </div>
  )

}
