import Icon from 'components/basic/Icon/Icon';
import usePrizeOfferFormContext from 'hooks/usePrizeOfferFormContext';

interface Props {
	label: string;
}

const NewAddedRequirements = ({ label }: Props) => {
	const {
		handleSelectRequirementModal,
		openRequirementModal,
		// handleResetRequirementNft,
		handleResetRequirementBrightId,
	} = usePrizeOfferFormContext();

	const handleClick = () => {
		handleSelectRequirementModal(label);
		openRequirementModal();
	};

	const handleDeleteNftRequirement = (label: string) => {
		if (label === 'NFT') {
			// handleResetRequirementNft();
		}
		if (label === 'BrightId') {
			handleResetRequirementBrightId();
		}
	};

	return (
		<div className="m-0 p-0">
			<div className="bg-gray50 h-[44px] rounded-xl flex justify-between  items-center px-4 border-2 border-gray60">
				<div className="flex items-center gap-2">
					<Icon iconSrc={`assets/images/provider-dashboard/modalIcon/${label}.svg`} />
					<p>{label} requirement</p>
				</div>
				<div className="flex items-center gap-3">
					<div
						onClick={handleClick}
						className="cursor-pointer flex items-center justify-center text-gray90 text-[10px] w-[60px] h-[20px] font-semibold bg-gray70 border border-gray80 rounded-[8px]"
					>
						Edit
					</div>
					<Icon
						onClick={() => handleDeleteNftRequirement(label)}
						className="cursor-pointer"
						iconSrc="assets/images/modal/exit.svg"
						height="14px"
						width="14px"
					/>
				</div>
			</div>
			<p className="flex w-full items-center justify-center m-0 p-0">and</p>
		</div>
	);
};

export default NewAddedRequirements;
