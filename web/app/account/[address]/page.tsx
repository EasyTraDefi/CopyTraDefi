import Wallet from "~/components/wallet"
import AccountDetailFeature from "../../../components/account/account-detail-feature"


export default function Page() {

  return (
    <div className='flex justify-between gap-3'>
      <Wallet />
      <AccountDetailFeature />
    </div>
  )

}
