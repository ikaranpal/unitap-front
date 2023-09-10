import Icon from 'components/basic/Icon/Icon';
import ShowPreviewModal from './component/ShowPreviewModal';
import usePrizeOfferFormContext from 'hooks/usePrizeOfferFormContext';
import { ProviderDashboardButtonPrevious, ProviderDashboardButtonSubmit } from 'components/basic/Button/button';
import { PrizeInfoProp } from 'types';
import DepositContent from './component/DepositContent';
import DisplaySelectedTokenAndChain from './component/DisplaySelectedTokenAndChain';

export const DepositDescription = {
	id: 4,
	prevIcon: 'assets/images/provider-dashboard/step-4-green.svg',
	activeIcon: 'assets/images/provider-dashboard/step-4-active.svg',
	nextIcon: 'assets/images/provider-dashboard/step-4-off.svg',
	title: 'Deposit Prize',
	description: 'Deposit Token or Nft',
};

const nftDescription = {
	title: 'Deposit Selected NFT',
	description: `Please proceed with depositing the NFT for which you have completed the corresponding form. Please wait
	momentarily as we validate your request. In the event of rejection, the token will promptly returned to
	your designated wallet.`,
	icon: 'assets/images/provider-dashboard/Subtract.svg',
};

const tokenDescription = {
	title: 'Deposit Selected Token',
	description: `							Please proceed with depositing the Token for which you have completed the corresponding form. Please wait
	momentarily as we validate your request. In the event of rejection, the token will promptly returned to
	your designated wallet.`,
	icon: 'assets/images/provider-dashboard/tokenSelected.svg',
};

const DepositPrize = ({ handleChangeFormPagePrev, handleChangeFormPageNext }: PrizeInfoProp) => {
	const { openShowPreviewModal, data, page } = usePrizeOfferFormContext();

	const handleSubmitContribution = () => {
		handleChangeFormPageNext();
	};
	return (
		<div className="flex flex-col gap-5 w-full max-w-[452px] min-w-[300px]">
			<section>
				<div className="text-center">
					{data.isNft ? (
						<DepositContent
							title={nftDescription.title}
							description={nftDescription.description}
							icon={nftDescription.icon}
						/>
					) : (
						<DepositContent
							title={tokenDescription.title}
							description={tokenDescription.description}
							icon={tokenDescription.icon}
						/>
					)}
				</div>
			</section>

			<section
				className="flex items-center gap-2 text-white font-semibold cursor-pointer max-w-[130px]"
				onClick={openShowPreviewModal}
			>
				<p>Show preview</p>
				<Icon iconSrc="assets/images/provider-dashboard/ic_link_white.svg" />
			</section>

			<DisplaySelectedTokenAndChain data={data} />

			<div className="flex flex-col lg:flex-row w-full max-w-[452px] mt-5 items-center ">
				<div className="flex flex-col sm:flex-row w-full gap-5">
					<ProviderDashboardButtonPrevious
						disabled={page == 0 ? true : false}
						className="w-full"
						onClick={handleChangeFormPagePrev}
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
