import Icon from 'components/basic/Icon/Icon';
import usePrizeOfferFormContext from 'hooks/usePrizeOfferFormContext';
import { useEffect, useState } from 'react';
import SelectMethodDropDown from './SelectMethodDropDown';
import ChainDropDown from './ChainDropDown';
import { Chain } from 'types';

const RenderNftRequirement = () => {
	const { handleBackToRequirementModal, handleAddRequirementNft, nftRequirement } = usePrizeOfferFormContext();
	const [nftSatisfy, setNftSatisfy] = useState<boolean | null>(null);
	const [nftAddress, setNftAddress] = useState<string | null>(null);
	const [nftMaximum, setNftMaximum] = useState(0);
	const [nftMinimum, setNftMinimum] = useState(0);
	const [customId, setCustomId] = useState<number | null>(null);
	const [selectedChain, setSelectedChain] = useState<Chain | null>(null);

	useEffect(() => {
		if (nftRequirement?.nftRequirementCustomID) {
			setCustomId(nftRequirement?.nftRequirementCustomID);
		}

		if (nftRequirement?.nftRequirementSatisfy) {
			setNftSatisfy(nftRequirement?.nftRequirementSatisfy);
		}

		if (nftRequirement?.nftRequirementNftAddress) {
			setNftAddress(nftRequirement?.nftRequirementNftAddress);
		}
		if (nftRequirement?.nftRequirementMax) {
			setNftMaximum(nftRequirement?.nftRequirementMax);
		}
		if (nftRequirement?.nftRequirementMin) {
			setNftMinimum(nftRequirement?.nftRequirementMin);
		}
		if (nftRequirement?.nftRequirementSelectedChain) {
			setSelectedChain(nftRequirement?.nftRequirementSelectedChain);
		}
	}, []);

	const onSelectChain = (chain: Chain) => {
		setSelectedChain(chain);
	};

	const handleSetMax = (val: number) => {
		setNftMaximum(val);
	};

	const handleSetMin = (val: number) => {
		setNftMinimum(val);
	};

	const handleSetCustomId = (val: number) => {
		setCustomId(val);
	};

	const handleChange = (e: { target: { type: any; name: any; checked: any; value: any } }) => {
		setNftAddress(e.target.value);
	};

	const handleAddRequirement = () => {
		handleBackToRequirementModal();
		handleAddRequirementNft({
			nftRequirementSatisfy: nftSatisfy,
			nftRequirementSelectedChain: selectedChain,
			nftRequirementNftAddress: nftAddress,
			nftRequirementCustomID: customId,
			nftRequirementMax: nftMaximum,
			nftRequirementMin: nftMinimum,
		});
	};

	return (
		<div className="flex flex-col gap-2 mt-5 ">
			<div className="absolute top-5 cursor-pointer z-[999]" onClick={handleBackToRequirementModal}>
				<Icon iconSrc="assets/images/provider-dashboard/arrow-left.svg" className="cursor-pointer z-[999999]" />
			</div>
			<div className="flex flex-col gap-2 min-h-[310px]">
				<div className="flex justify-between gap-3 text-white text-[14px] font-medium mb-5">
					<div
						className={`${
							nftSatisfy ? 'bg-gray90' : 'bg-gray50'
						} "bg-gray50 bg-gray50 w-full rounded-xl h-[32px] flex items-center justify-center cursor-pointer`}
						onClick={() => setNftSatisfy(true)}
					>
						Should satisfy
					</div>
					<div
						onClick={() => setNftSatisfy(false)}
						className={`${
							!nftSatisfy ? 'bg-gray90' : 'bg-gray50'
						} bg-gray50 w-full rounded-xl h-[32px] flex items-center justify-center cursor-pointer`}
					>
						Should not satisfy
					</div>
				</div>
				<ChainDropDown selectedChain={selectedChain} onSelectChain={onSelectChain} />
				<div className="flex bg-gray40 text-[14px] h-[44px] border border-gray50 rounded-xl items-center justify-between px-3 mb-2">
					<input
						onChange={(e) => handleChange(e)}
						value={nftAddress ?? ''}
						name="nftAddress"
						className="bg-transparent w-full h-[100%]  placeholder-gray80"
						placeholder="Paste NFT address"
					/>
				</div>
				<SelectMethodDropDown
					nftMaximum={nftMaximum}
					handleSetMaximum={(val) => handleSetMax(val)}
					nftMinimum={nftMinimum}
					handleSetMinimum={(val) => handleSetMin(val)}
					customId={customId}
					handleSetCustomId={(val) => handleSetCustomId(val)}
				/>
			</div>
			<div
				onClick={handleAddRequirement}
				className="flex cursor-pointer  bg-gray40 text-[14px] font-semibold text-white h-[44px] border-2 border-gray70 rounded-xl items-center justify-center mb-2"
			>
				Add Requirement
			</div>
		</div>
	);
};

export default RenderNftRequirement;
