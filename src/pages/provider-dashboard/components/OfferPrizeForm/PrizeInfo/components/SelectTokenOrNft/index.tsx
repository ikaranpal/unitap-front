import { ProviderDashboardButtonNext } from 'components/basic/Button/button';
import Icon from 'components/basic/Icon/Icon';
import { ZERO_ADDRESS } from 'constants/addresses';
import usePrizeOfferFormContext from 'hooks/usePrizeOfferFormContext';

interface Prop {
	showErrors: boolean;
}
const SelectTokenOrNft = ({ showErrors }: Prop) => {
	const {
		data,
		handleSelectTokenOrNft,
		handleSelectNativeToken,
		handleChange,
		checkContractInfo,
		isTokenContractAddressValid,
		isNftContractAddressValid,
		isOwnerOfNft,
		isErc20Approved,
		handleApproveErc20Token,
		handleApproveErc721Token,
		approveLoading,
		isNftApproved,
		canDisplayErrors,
		canDisplayWrongAddress,
	} = usePrizeOfferFormContext();

	return (
		<div className={data.selectedChain ? 'w-full' : 'setOpacity w-full'}>
			<section className="flex text-gray80 text-[12px] bg-gray30 border border-gray50 rounded-[12px] h-[44px] items-center w-full max-w-[452px] overflow-hidden">
				<div
					className={`${
						!data.isNft ? 'text-white font-medium bg-gray40 border-gray50' : ''
					} flex cursor-pointer items-center justify-center border-r border-r-gray50 w-[50%] h-full `}
					onClick={() => handleSelectTokenOrNft(false)}
				>
					Token
				</div>
				<div
					className={`${
						data.isNft ? 'text-white font-medium  bg-gray40 border-gray50' : ''
					} flex cursor-pointer items-center justify-center border-l border-l-gray50 w-[50%] h-full`}
					onClick={() => handleSelectTokenOrNft(true)}
				>
					NFT
				</div>
			</section>
			{!data.isNft ? (
				<div className="flex flex-col gap-4 w-full mt-2">
					<div
						className="flex items-center justify-center gap-1 text-white text-[10px] mb-[-5px] cursor-pointer max-w-[90px]"
						onClick={() => handleSelectNativeToken(data.isNativeToken)}
					>
						<Icon
							height="12px"
							width="12px"
							iconSrc={`${
								!data.isNativeToken
									? '../assets/images/provider-dashboard/checkbox.svg'
									: '../assets/images/provider-dashboard/check-true.svg'
							}`}
						/>
						<p>Native Token</p>
					</div>
					<div className="relative">
						<div
							className={`${data.isNativeToken ? 'opacity-[.5]' : ''}
							 flex gap-2 text-gray80 text-[12px] bg-gray40 border border-gray50 rounded-[12px] h-[44px] pr-4 items-center justify-between overflow-hidden w-full max-w-[452px]`}
						>
							<div className="bg-gray30 flex h-full w-full max-w-[148px] items-center text-center justify-center">
								<p>Token Contract address</p>
							</div>
							<input
								disabled={data.isNativeToken || !data.selectedChain || checkContractInfo}
								name="tokenContractAddress"
								value={
									data.tokenContractAddress && data.tokenContractAddress != ZERO_ADDRESS
										? data.tokenContractAddress
										: ''
								}
								className={'provider-dashboard-input'}
								type="text"
								onChange={handleChange}
							/>
						</div>
						{!data.isNft && !data.isNativeToken && checkContractInfo && data.tokenContractAddress && (
							<p className="text-error text-[8px] m-0 p-0 absolute left-1">Please wait checking...</p>
						)}
						{showErrors && !data.isNft && !data.isNativeToken && !data.tokenContractAddress && (
							<p className="text-error text-[8px] m-0 p-0 absolute left-1">Required</p>
						)}
						{!data.isNft &&
							!data.isNativeToken &&
							data.tokenContractAddress &&
							!checkContractInfo &&
							!isTokenContractAddressValid &&
							canDisplayWrongAddress && <p className="text-error text-[8px] m-0 p-0 absolute left-1">Wrong address</p>}
					</div>

					<div className="relative">
						<div className="flex gap-2 text-gray80 text-[12px] bg-gray40 border border-gray50 rounded-[12px] h-[44px] pr-4 items-center justify-between overflow-hidden w-full max-w-[452px]">
							<div className="bg-gray30 flex h-full w-full max-w-[148px] items-center items-center justify-center">
								<p>Amount</p>
							</div>
							<input
								disabled={
									!data.selectedChain || checkContractInfo || (!isTokenContractAddressValid && !data.isNativeToken)
								}
								onChange={handleChange}
								value={data.tokenAmount}
								name="tokenAmount"
								className="provider-dashboard-input"
								type="number"
								min={0}
							/>
						</div>
						{showErrors && !data.isNft && !data.tokenAmount && (
							<p className="text-error text-[8px] m-0 p-0 absolute left-1">Required</p>
						)}
					</div>
					{!data.isNativeToken &&
					!isErc20Approved &&
					!checkContractInfo &&
					data.tokenContractAddress &&
					data.tokenAmount &&
					data.tokenDecimals &&
					isTokenContractAddressValid &&
					canDisplayErrors ? (
						<ProviderDashboardButtonNext onClick={handleApproveErc20Token}>
							{approveLoading ? 'Approving...' : 'Approve'}
						</ProviderDashboardButtonNext>
					) : null}
				</div>
			) : (
				<div className="flex flex-col gap-4 w-full mt-4">
					<div className="relative">
						<div className="flex relative gap-2 text-gray80 text-[12px] bg-gray40 border border-gray50 rounded-[12px] h-[44px] pr-4 items-center justify-between overflow-hidden w-full max-w-[452px] ">
							<div className="bg-gray30 flex h-full w-full max-w-[148px] items-center items-center justify-center">
								<p>NFT Contract address</p>
							</div>
							<input
								disabled={!data.selectedChain || checkContractInfo}
								onChange={handleChange}
								name="nftContractAddress"
								value={data.nftContractAddress ? data.nftContractAddress : ''}
								className="provider-dashboard-input"
								type="text"
							/>
						</div>
						{showErrors && data.isNft && !data.nftContractAddress && (
							<p className="text-error text-[8px] m-0 p-0 absolute left-1">Required</p>
						)}
						{data.isNft && data.nftContractAddress && !isNftContractAddressValid && canDisplayWrongAddress && (
							<p className="text-error text-[8px] m-0 p-0 absolute left-1">Wrong address</p>
						)}
					</div>

					<div className="relative">
						<div
							className={`flex relative gap-2 text-gray80 text-[12px] bg-gray40 border border-gray50 rounded-[12px] h-[44px] pr-4 items-center justify-between overflow-hidden w-full max-w-[452px]`}
						>
							<div className="bg-gray30 flex h-full w-full max-w-[148px] items-center items-center justify-center">
								<p>Token ID</p>
							</div>
							<input
								disabled={!data.selectedChain || checkContractInfo || !isNftContractAddressValid || !data.isNft}
								name="nftTokenId"
								value={data.nftTokenId ? data.nftTokenId : ''}
								className="provider-dashboard-input"
								type="number"
								onChange={handleChange}
								min={0}
							/>
						</div>
						{showErrors && data.isNft && !data.nftTokenId && (
							<p className="text-error text-[8px] m-0 p-0 absolute left-1">Required</p>
						)}
						{checkContractInfo && canDisplayErrors && (
							<p className="text-error text-[8px] m-0 p-0 absolute left-1">Please wait checking...</p>
						)}
						{data.nftContractAddress &&
						canDisplayErrors &&
						isNftContractAddressValid &&
						data.nftTokenId &&
						!checkContractInfo &&
						!isOwnerOfNft ? (
							<p className="text-error text-[8px] m-0 p-0 absolute left-1">You are not owner of this Token ID</p>
						) : null}
					</div>

					{!isNftApproved &&
					canDisplayErrors &&
					!checkContractInfo &&
					data.nftContractAddress &&
					data.nftTokenId &&
					isOwnerOfNft &&
					isNftContractAddressValid ? (
						<ProviderDashboardButtonNext onClick={handleApproveErc721Token}>
							{approveLoading ? 'Approving...' : 'Approve'}
						</ProviderDashboardButtonNext>
					) : null}
				</div>
			)}
		</div>
	);
};

export default SelectTokenOrNft;
