import Icon from 'components/basic/Icon/Icon';
import { useState } from 'react';
import { CustomIdProp, MaxNftProp, MinNftProp, SelectedMethodNftRqProps } from 'types';

const SelectMethodDropDown = ({
	nftMaximum,
	handleSetMaximum,
	nftMinimum,
	handleSetMinimum,
	customId,
	handleSetCustomId,
}: SelectedMethodNftRqProps) => {
	const methods = ['Maximum', 'Minimum', 'Maximum and Minimum', 'CustomId'];

	const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
	const [showItems, setShowItems] = useState<boolean>(false);

	const handleSelectMethod = (method: string) => {
		setShowItems(false);
		setSelectedMethod(method);
	};

	return (
		<div>
			<div className="flex w-full relative">
				<div
					onClick={() => setShowItems(!showItems)}
					className="flex w-full bg-gray40 cursor-pointer text-[14px] h-[44px] border border-gray50 rounded-xl items-center justify-between px-3 mb-2"
				>
					<div className="flex items-center gap-2">
						<p>{selectedMethod ? selectedMethod : 'Select Method'}</p>
					</div>
					<Icon iconSrc="assets/images/provider-dashboard/arrow-down.svg" />
				</div>
				{showItems && (
					<div className="flex flex-col gap-2 w-full absolute top-12 bg-gray40 border border-gray50 rounded-xl p-3">
						{methods.map((method, index) => (
							<div
								onClick={() => handleSelectMethod(method)}
								key={index}
								className="cursor-pointer hover:bg-gray90 hover:text-white rounded-xl px-2"
							>
								{method}
							</div>
						))}
					</div>
				)}
			</div>
			{selectedMethod === 'Maximum' && <MaxNft nftAmount={nftMaximum} handleSetMaximum={handleSetMaximum} />}
			{selectedMethod === 'Minimum' && <MinNft nftAmount={nftMinimum} handleSetMinimum={handleSetMinimum} />}
			{selectedMethod === 'Maximum and Minimum' && (
				<div>
					<MaxNft nftAmount={nftMaximum} handleSetMaximum={handleSetMaximum} />
					<MinNft nftAmount={nftMinimum} handleSetMinimum={handleSetMinimum} />
				</div>
			)}
			{selectedMethod == 'CustomId' && <CustomID customId={customId} handleSetCustomId={handleSetCustomId} />}
		</div>
	);
};

const MaxNft = ({ nftAmount, handleSetMaximum }: MaxNftProp) => {
	const handleIncrease = () => {
		handleSetMaximum(nftAmount + 1);
	};
	const handleDecrease = () => {
		if (!nftAmount || nftAmount === 0) return;
		handleSetMaximum(nftAmount - 1);
	};
	return (
		<div className="flex w-full mb-2 items-center justify-between text-[14px] text-white bg-gray40 border border-gray50 h-[44px] pl-3 rounded-xl ">
			<input
				disabled
				placeholder="Maximum Amount"
				value={!nftAmount || nftAmount == 0 ? 'Maximum Amount' : nftAmount}
				className={`${nftAmount == 0 ? 'text-gray80' : 'text-white'} bg-transparent  placeholder-gray80`}
			/>

			<div className="flex flex-col border-l border-l-gray50 h-[100%] justify-center">
				<div
					onClick={handleIncrease}
					className="w-[100%] cursor-pointer h-[100%] flex items-center justify-center min-w-[30px] border-b border-b-gray50"
				>
					<Icon iconSrc="assets/images/provider-dashboard/arrow-top-dark.svg" width="14px" height="8px" />
				</div>
				<div
					onClick={handleDecrease}
					className="cursor-pointer w-[100%] h-[100%] flex items-center justify-center min-w-[30px]"
				>
					<Icon iconSrc="assets/images/provider-dashboard/arrow-down-dark.svg" width="14px" height="8px" />
				</div>
			</div>
		</div>
	);
};

const MinNft = ({ nftAmount, handleSetMinimum }: MinNftProp) => {
	const handleIncrease = () => {
		handleSetMinimum(nftAmount + 1);
	};
	const handleDecrease = () => {
		if (!nftAmount || nftAmount === 0) return;
		handleSetMinimum(nftAmount - 1);
	};
	return (
		<div className="flex w-full items-center justify-between text-[14px] text-white bg-gray40 border border-gray50 h-[44px] pl-3 rounded-xl ">
			<input
				disabled
				placeholder="Minium Amount"
				value={!nftAmount || nftAmount == 0 ? 'Minium Amount' : nftAmount}
				className={`${nftAmount == 0 ? 'text-gray80' : 'text-white'} bg-transparent  placeholder-gray80`}
			/>

			<div className="flex flex-col border-l border-l-gray50 h-[100%] justify-center">
				<div
					onClick={handleIncrease}
					className="w-[100%] cursor-pointer h-[100%] flex items-center justify-center min-w-[30px] border-b border-b-gray50"
				>
					<Icon iconSrc="assets/images/provider-dashboard/arrow-top-dark.svg" width="14px" height="8px" />
				</div>
				<div
					onClick={handleDecrease}
					className="cursor-pointer w-[100%] h-[100%] flex items-center justify-center min-w-[30px]"
				>
					<Icon iconSrc="assets/images/provider-dashboard/arrow-down-dark.svg" width="14px" height="8px" />
				</div>
			</div>
		</div>
	);
};

const CustomID = ({ customId, handleSetCustomId }: CustomIdProp) => {
	const handleChange = (e: { target: { type: any; name: any; checked: any; value: any } }) => {
		handleSetCustomId(e.target.value);
	};
	return (
		<div className="flex w-full items-center justify-between text-[14px] text-white bg-gray40 border border-gray50 h-[44px] pl-3 rounded-xl ">
			<input
				onChange={(e) => handleChange(e)}
				placeholder="Custom ID"
				value={customId ?? ''}
				name="Custom ID"
				className={`${customId ? 'text-white' : 'text-gray80'} bg-transparent h-[100%]  placeholder-gray80`}
			/>
		</div>
	);
};

export default SelectMethodDropDown;
