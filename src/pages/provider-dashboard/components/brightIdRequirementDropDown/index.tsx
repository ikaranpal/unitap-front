import { useState } from 'react';
import Icon from 'components/basic/Icon/Icon';

const BrightIdRequirementDropDown = () => {
	const [showItems, setShowItems] = useState(false);
	const [selectedType, setSelectedType] = useState<string | null>(null);
	const handleSelectType = (type: string) => {
		setShowItems(false);
		setSelectedType(type);
	};
	const types = [{ name: 'brightID meet' }];
	const handleShowItems = () => {
		setShowItems(!showItems);
	};
	return (
		<>
			<div
				className="flex bg-gray40 cursor-pointer text-[14px] h-[44px] border border-gray50 rounded-xl items-center justify-between px-3 mb-2"
				onClick={handleShowItems}
			>
				<div className="flex items-center gap-2">
					<p className={selectedType ? 'text-white' : 'text-gray80'}>{selectedType ? selectedType : 'Type'}</p>
				</div>
				<Icon iconSrc="assets/images/provider-dashboard/arrow-down.svg" />
			</div>
			{showItems && (
				<ul className="bg-gray40 p-2 rounded-xl mt-[-10px]">
					{types.map((type, index) => (
						<li
							onClick={() => handleSelectType(type.name)}
							className="cursor-pointer hover:bg-gray60 hover:text-white px-2 rounded-xl"
							key={index}
						>
							{type.name}
						</li>
					))}
				</ul>
			)}
		</>
	);
};

export default BrightIdRequirementDropDown;
