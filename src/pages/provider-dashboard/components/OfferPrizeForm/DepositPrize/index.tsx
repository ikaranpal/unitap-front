import Icon from 'components/basic/Icon/Icon';
import ShowPreviewModal from './component/ShowPreviewModal';
import usePrizeOfferFormContext from 'hooks/usePrizeOfferFormContext';
import { ProviderDashboardButtonPrevious, ProviderDashboardButtonSubmit } from 'components/basic/Button/button';
import { PrizeInfoProp } from 'types';
export const DepositDescription = {
	id: 4,
	prevIcon: 'assets/images/provider-dashboard/step-4-green.svg',
	activeIcon: 'assets/images/provider-dashboard/step-4-active.svg',
	nextIcon: 'assets/images/provider-dashboard/step-4-off.svg',
	title: 'Deposit Prize',
	description: 'Deposit Token or Nft',
};

const DepositPrize = ({ handleChangeFormPagePrev, handleChangeFormPageNext }: PrizeInfoProp) => {
	const { openShowPreviewModal, data, page } = usePrizeOfferFormContext();

	const handleSubmitContribution = () => {
		handleChangeFormPageNext(page);
	};
	return (
		<div className="flex flex-col gap-5 w-full max-w-[452px] min-w-[300px]">
			<Icon
				iconSrc={
					data.isNft
						? 'assets/images/provider-dashboard/tokenSelected.svg'
						: 'assets/images/provider-dashboard/Subtract.svg'
				}
				className="mb-5"
			/>
			<div className="text-center">
				{data.isNft ? (
					<div>
						<p className="text-[14px] font-semibold text-white">Deposit Selected NFT</p>
						<p className="text-gray100 text-[12px] mt-2">
							Please proceed with depositing the NFT for which you have completed the corresponding form. Please wait
							momentarily as we validate your request. In the event of rejection, the token will promptly returned to
							your designated wallet.
						</p>
					</div>
				) : (
					<div>
						<p className="text-[14px] font-semibold text-white">Deposit Selected Token</p>
						<p className="text-gray100 text-[12px] mt-2">
							Please proceed with depositing the Token for which you have completed the corresponding form. Please wait
							momentarily as we validate your request. In the event of rejection, the token will promptly returned to
							your designated wallet.
						</p>
					</div>
				)}
			</div>
			<div
				onClick={openShowPreviewModal}
				className="flex items-center gap-2 text-white font-semibold cursor-pointer max-w-[130px]"
			>
				<p>Show preview</p>
				<Icon iconSrc="assets/images/provider-dashboard/ic_link_white.svg" />
			</div>
			<div className="flex w-full gap-5 text-white h-[48px] text-[14px] mt-[-12px] ">
				<div className="cursor-pointer gap-2 w-full flex items-center justify-center bg-gray50 rounded-xl">
					<Icon iconSrc={data.selectedChain ? data.selectedChain?.logoUrl : ''} height="24px" width="24px" />
					<p>{data.selectedChain ? data.selectedChain?.chainName : ''}</p>
				</div>
				<div className="cursor-pointer gap-2 w-full flex items-center justify-center bg-gray50 rounded-xl">
					<Icon iconSrc="assets/images/provider-dashboard/kolahGhermezi.svg" />
					<p>Kolah Qermezi</p>
				</div>
			</div>
			<div className="flex flex-col lg:flex-row w-full max-w-[452px] mt-5 items-center ">
				<div className="flex flex-col sm:flex-row w-full gap-5">
					<ProviderDashboardButtonPrevious
						disabled={page == 0 ? true : false}
						className="w-full"
						onClick={() => handleChangeFormPagePrev(page)}
					>
						Previous
					</ProviderDashboardButtonPrevious>
					<ProviderDashboardButtonSubmit
						onClick={handleSubmitContribution}
						className="text-[14px] md:text-[12px] lg:text-[14px] "
					>
						<p>Submit Contribution</p>
					</ProviderDashboardButtonSubmit>
				</div>
			</div>
			<ShowPreviewModal />
		</div>
	);
};

export default DepositPrize;
