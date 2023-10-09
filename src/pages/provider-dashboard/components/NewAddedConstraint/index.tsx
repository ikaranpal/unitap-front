import Icon from 'components/basic/Icon/Icon';
import usePrizeOfferFormContext from 'hooks/usePrizeOfferFormContext';

import { ConstraintParamValues, ConstraintProps } from 'types';

interface Props {
	requirement: ConstraintParamValues;
}

const NewAddedConstraint = ({ requirement }: Props) => {
	const { handleSelectConstraint, openRequirementModal, deleteRequirement, constraintsList } =
		usePrizeOfferFormContext();

	const constraint = constraintsList.filter((item) => item.pk == requirement.pk)[0];

	const handleClick = () => {
		handleSelectConstraint(constraint);
		openRequirementModal();
	};

	const handleDelete = (id: number) => {
		deleteRequirement(id);
	};

	return (
		<div className="m-0 p-0">
			<div className="bg-gray50 h-[44px] rounded-xl flex justify-between  items-center px-4 border-2 border-gray60">
				<div className="flex items-center gap-2">
					{constraint.iconUrl && <Icon iconSrc={constraint.iconUrl} />}
					<p>{constraint.title} requirement</p>
				</div>
				<div className="flex items-center gap-3">
					{requirement.values && (
						<div
							onClick={handleClick}
							className="cursor-pointer flex items-center justify-center text-gray90 text-[10px] w-[60px] h-[20px] font-semibold bg-gray70 border border-gray80 rounded-[8px]"
						>
							Edit
						</div>
					)}
					<Icon
						onClick={() => handleDelete(constraint.pk)}
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

export default NewAddedConstraint;
