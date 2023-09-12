import Icon from 'components/basic/Icon/Icon';
import ShowPreviewModal from './component/ShowPreviewModal';
import usePrizeOfferFormContext from 'hooks/usePrizeOfferFormContext';
import { PrizeInfoProp } from 'types';
import DepositContent from './component/DepositContent';
import DisplaySelectedTokenAndChain from './component/DisplaySelectedTokenAndChain';
import Pagination from '../../PagInation';

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
	description: `Please proceed with depositing the Token for which you have completed the corresponding form. Please wait
	momentarily as we validate your request. In the event of rejection, the token will promptly returned to
	your designated wallet.`,
	icon: 'assets/images/provider-dashboard/tokenSelected.svg',
};

const DepositPrize = ({ handleChangeFormPagePrev, handleChangeFormPageNext }: PrizeInfoProp) => {
	const { openShowPreviewModal, data, page } = usePrizeOfferFormContext();

	const handleNextPage = () => {
		//TO DO handleSubmit()
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

			<Pagination
				handleChangeFormPagePrev={handleChangeFormPagePrev}
				handleNextPage={handleNextPage}
				page={page}
				func="submit"
			/>

			<ShowPreviewModal />
		</div>
	);
};

export default DepositPrize;
