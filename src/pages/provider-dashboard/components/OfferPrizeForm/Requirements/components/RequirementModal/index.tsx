import { useMemo, useState } from 'react';
import Icon from 'components/basic/Icon/Icon';
import usePrizeOfferFormContext from 'hooks/usePrizeOfferFormContext';
import Modal from 'components/common/Modal/modal';
import { DataProp } from 'pages/provider-dashboard/components/Context/PrizeOfferFromContext';

// @ts-ignore

interface SelectedMethodProp {
	method: string;
	text: string;
	element: JSX.Element;
}

interface MethodsProp {
	methods: SelectedMethodProp[];
}

const SelectMethodDropDown = ({ methods }: MethodsProp) => {
	const [showItems, setShowItems] = useState<boolean>(false);
	const [selectedMethod, setSelectedMethod] = useState<SelectedMethodProp | null>(null);

	const handleSelectMethod = (method: SelectedMethodProp) => {
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
						<p>{selectedMethod ? selectedMethod.text : 'Select Method'}</p>
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
								{method.text}
							</div>
						))}
					</div>
				)}
			</div>
			<div className="w-full">{selectedMethod?.element}</div>
		</div>
	);
};

const RequirementModalBody = () => {
	const {
		handleSelectRequirementModal,
		requirementModalItems,
		handleBackToRequirementModal,
		handleSelectAllowListPrivate,
		allowListPrivate,
		handleChange,
		data,
	} = usePrizeOfferFormContext();

	function renderNftRequirement() {
		const methods = [
			{
				method: 'maximum',
				text: 'Maximum Amount',
				element: <Counter label="Maximum Amount" logic="nftRequirementMax" />,
			},
			{
				method: 'minimum',
				text: 'Minium Amount',
				element: <Counter label="Minium Amount" logic="nftRequirementMin" />,
			},
			{
				method: 'maximumAndMinimum',
				text: 'Maximum and Minimum',
				element: (
					<div className="flex flex-col gap-2  h-[180px]">
						<Counter label="Maximum" logic="nftRequirementMax" />
						<Counter label="Minimum" logic="nftRequirementMin" />
					</div>
				),
			},
			{ method: 'customID', text: 'Custom ID', element: <CustomID label="Custom ID" logic="nftRequirementCustomID" /> },
		];
		return (
			<div className="flex flex-col gap-2 mt-5 ">
				<div className="absolute top-5 cursor-pointer z-[999]" onClick={handleBackToRequirementModal}>
					<Icon iconSrc="assets/images/provider-dashboard/arrow-left.svg" className="cursor-pointer z-[999999]" />
				</div>
				<div className="flex flex-col gap-2 min-h-[310px]">
					<div className="flex justify-between gap-3 text-white text-[14px] font-medium mb-5">
						<div className="bg-gray50 w-full rounded-xl h-[32px] flex items-center justify-center">Should satisfy</div>
						<div className="bg-gray50 w-full rounded-xl h-[32px] flex items-center justify-center">
							Should not satisfy
						</div>
					</div>
					<div className="flex bg-gray40 text-[14px] h-[44px] border border-gray50 rounded-xl items-center justify-between px-3 mb-2">
						<div className="flex items-center gap-2">
							<Icon iconSrc="assets/images/provider-dashboard/Telos.svg" />
							<p>Telos</p>
						</div>
						<Icon iconSrc="assets/images/provider-dashboard/arrow-down.svg" />
					</div>

					<div className="flex bg-gray40 text-[14px] h-[44px] border border-gray50 rounded-xl items-center justify-between px-3 mb-2">
						<input
							onChange={(e) => handleChange(e)}
							value={data.nftAddress}
							name="nftAddress"
							className="bg-transparent w-full h-[100%]  placeholder-gray80"
							placeholder="Paste NFT address"
						/>
					</div>
					<SelectMethodDropDown methods={methods} />
				</div>
				<div className="flex cursor-pointer  bg-gray40 text-[14px] font-semibold text-white h-[44px] border-2 border-gray70 rounded-xl items-center justify-center mb-2">
					Add Requirement
				</div>
			</div>
		);
	}

	function renderTokenRequirement() {
		const methods = [
			{
				method: 'maximum',
				text: 'Maximum Amount',
				element: <Counter label="Maximum Amount" logic="tokenRequirementMax" />,
			},
			{
				method: 'minimum',
				text: 'Minium Amount',
				element: <Counter label="Minium Amount" logic="tokenRequirementMin" />,
			},
			{
				method: 'maximumAndMinimum',
				text: 'Maximum and Minimum',
				element: (
					<div className="flex flex-col gap-2  h-[130px]">
						<Counter label="Maximum" logic="tokenRequirementMax" />
						<Counter label="Minimum" logic="tokenRequirementMin" />
					</div>
				),
			},
		];
		return (
			<div className="flex flex-col gap-2 mt-5  placeholder-gray80">
				<div className="absolute top-5 cursor-pointer z-[999]" onClick={handleBackToRequirementModal}>
					<Icon iconSrc="assets/images/provider-dashboard/arrow-left.svg" className="cursor-pointer z-[999999]" />
				</div>
				<div className="flex flex-col gap-2 min-h-[310px]">
					<div className="flex justify-between gap-3 text-white text-[14px] font-medium mb-5">
						<div className="bg-gray50 w-full rounded-xl h-[32px] flex items-center justify-center">Should satisfy</div>
						<div className="bg-gray50 w-full rounded-xl h-[32px] flex items-center justify-center">
							Should not satisfy
						</div>
					</div>
					<div className="flex bg-gray40 text-[14px] h-[44px] border border-gray50 rounded-xl items-center justify-between px-3 mb-2">
						<div className="flex items-center gap-2">
							<Icon iconSrc="assets/images/provider-dashboard/Telos.svg" />
							<p>Telos</p>
						</div>
						<Icon iconSrc="assets/images/provider-dashboard/arrow-down.svg" />
					</div>

					<div className="flex bg-gray40 text-[14px] h-[44px] border border-gray50 rounded-xl items-center justify-between px-3 mb-2">
						<input
							name="tokenAddress"
							className="bg-transparent w-full h-[100%]  placeholder-gray80"
							value={data.tokenAddress}
							placeholder="Paste Token address"
							onChange={(e) => handleChange(e)}
						/>
					</div>
					<SelectMethodDropDown methods={methods} />
				</div>

				<div className="flex cursor-pointer  bg-gray40 text-[14px] font-semibold text-white h-[44px] border-2 border-gray70 rounded-xl items-center justify-center mb-2">
					Add Requirement
				</div>
			</div>
		);
	}

	function renderAllowListRequirement() {
		return (
			<div className="flex flex-col gap-2 mt-5">
				<div className="absolute top-5 cursor-pointer z-[999]" onClick={handleBackToRequirementModal}>
					<Icon iconSrc="assets/images/provider-dashboard/arrow-left.svg" className="cursor-pointer z-[999999]" />
				</div>
				<div className="flex flex-col gap-2 min-h-[310px]">
					<div className="flex justify-between gap-3 text-white text-[14px] font-medium mb-5">
						<div className="bg-gray50 w-full rounded-xl h-[32px] flex items-center justify-center">Should satisfy</div>
						<div className="bg-gray50 w-full rounded-xl h-[32px] flex items-center justify-center">
							Should not satisfy
						</div>
					</div>

					<div className="flex bg-gray40 text-[12px] h-[44px] border border-gray50 rounded-xl items-center justify-between gap-3 px-3 mb-2">
						<Icon iconSrc="assets/images/provider-dashboard/upload.svg" />
						<input
							className="bg-transparent w-full h-[100%]  placeholder-gray80"
							placeholder="Upload from file. only .text or .csv"
						/>
					</div>

					<div className="flex bg-gray40 text-[12px] h-[136px] border border-gray50 rounded-xl px-3 mb-2 pt-2">
						<textarea
							className="bg-transparent w-full h-[100%]"
							placeholder="... or paste addresses, each one in a new line"
						/>
					</div>

					<div onClick={handleSelectAllowListPrivate} className="flex gap-2 w-full max-w-[160px] cursor-pointer">
						<Icon
							className="cursor-pointer"
							iconSrc={
								allowListPrivate
									? 'assets/images/provider-dashboard/check-true.svg'
									: 'assets/images/provider-dashboard/checkbox.svg'
							}
						/>
						<p>Make allowList private</p>
					</div>
				</div>
				<div className="flex cursor-pointer  bg-gray40 text-[14px] font-semibold text-white h-[44px] border-2 border-gray70 rounded-xl items-center justify-center mb-2">
					Add Requirement
				</div>
			</div>
		);
	}

	function renderContractQueryRequirement() {
		return (
			<div className="flex flex-col gap-2 mt-5">
				<div className="absolute top-5 cursor-pointer z-[999]" onClick={handleBackToRequirementModal}>
					<Icon iconSrc="assets/images/provider-dashboard/arrow-left.svg" className="cursor-pointer z-[999999]" />
				</div>
				<div className="flex flex-col gap-2 min-h-[310px]">
					<div className="flex justify-between gap-3 text-white text-[14px] font-medium mb-5">
						<div className="bg-gray50 w-full rounded-xl h-[32px] flex items-center justify-center">Should satisfy</div>
						<div className="bg-gray50 w-full rounded-xl h-[32px] flex items-center justify-center">
							Should not satisfy
						</div>
					</div>
					<div className="flex bg-gray40 text-[14px] h-[44px] border border-gray50 rounded-xl items-center justify-between px-3 mb-2">
						<div className="flex items-center gap-2">
							<Icon iconSrc="assets/images/provider-dashboard/Telos.svg" />
							<p>Telos</p>
						</div>
						<Icon iconSrc="assets/images/provider-dashboard/arrow-down.svg" />
					</div>

					<div className="flex bg-gray40 text-[14px] h-[44px] border border-gray50 rounded-xl items-center justify-between px-3 mb-2">
						<input
							name="contractAddress"
							className="bg-transparent w-full placeholder-gray80"
							placeholder="Contract address"
						/>
					</div>
					<div className="flex bg-gray40 text-[14px] h-[44px] border border-gray50 rounded-xl items-center justify-between px-3 mb-2">
						<div className="flex items-center gap-2">
							<p>Select Method</p>
						</div>
						<Icon iconSrc="assets/images/provider-dashboard/arrow-down.svg" />
					</div>
					<div className="flex w-full gap-2 h-[44px]">
						<div className="flex bg-gray40 justify-between rounded-xl w-full max-w-[120px] px-3">
							<input className="bg-transparent h-[100%] w-full placeholder-gray80" />
							<Icon iconSrc="assets/images/provider-dashboard/arrow-down.svg" />
						</div>
						<div className="bg-gray40 rounded-xl px-2 w-full">
							<input className="bg-transparent h-[100%] placeholder-gray80 " placeholder="input text" />
						</div>
					</div>
				</div>
				<div className="flex cursor-pointer  bg-gray40 text-[14px] font-semibold text-white h-[44px] border-2 border-gray70 rounded-xl items-center justify-center mb-2">
					Add Requirement
				</div>
			</div>
		);
	}

	function renderDiscordRequirement() {
		return (
			<div className="flex flex-col gap-2 mt-5">
				<div className="absolute top-5 cursor-pointer z-[999]" onClick={handleBackToRequirementModal}>
					<Icon iconSrc="assets/images/provider-dashboard/arrow-left.svg" className="cursor-pointer z-[999999]" />
				</div>
				<div className="flex flex-col gap-2 min-h-[310px]">
					<div className="flex justify-between gap-3 text-white text-[14px] font-medium mb-5">
						<div className="bg-gray50 w-full rounded-xl h-[32px] flex items-center justify-center">Should satisfy</div>
						<div className="bg-gray50 w-full rounded-xl h-[32px] flex items-center justify-center">
							Should not satisfy
						</div>
					</div>
					<div className="flex bg-gray40 text-[14px] h-[44px] border border-gray50 rounded-xl items-center justify-between px-3 mb-2">
						<div className="flex items-center gap-2">
							<Icon iconSrc="assets/images/provider-dashboard/Telos.svg" />
							<p>Telos</p>
						</div>
						<Icon iconSrc="assets/images/provider-dashboard/arrow-down.svg" />
					</div>

					<div className="flex bg-gray40 text-[14px] h-[44px] border border-gray50 rounded-xl items-center justify-between px-3 mb-2">
						<input
							name="nftAddress"
							className="bg-transparent w-full  placeholder-gray80"
							placeholder="Paste NFT address"
						/>
					</div>
					<div className="flex bg-gray40 text-[14px] h-[44px] border border-gray50 rounded-xl items-center justify-between px-3 mb-2">
						<div className="flex items-center gap-2">
							<p>Select Method</p>
						</div>
						<Icon iconSrc="assets/images/provider-dashboard/arrow-down.svg" />
					</div>
				</div>
				<div className="flex cursor-pointer  bg-gray40 text-[14px] font-semibold text-white h-[44px] border-2 border-gray70 rounded-xl items-center justify-center mb-2">
					Add Requirement
				</div>
			</div>
		);
	}

	function renderTwitterRequirement() {
		return (
			<div className="flex flex-col gap-2 mt-5">
				<div className="absolute top-5 cursor-pointer z-[999]" onClick={handleBackToRequirementModal}>
					<Icon iconSrc="assets/images/provider-dashboard/arrow-left.svg" className="cursor-pointer z-[999999]" />
				</div>
				<div className="flex flex-col gap-2 min-h-[310px]">
					<div className="flex justify-between gap-3 text-white text-[14px] font-medium mb-5">
						<div className="bg-gray50 w-full rounded-xl h-[32px] flex items-center justify-center">Should satisfy</div>
						<div className="bg-gray50 w-full rounded-xl h-[32px] flex items-center justify-center">
							Should not satisfy
						</div>
					</div>
					<div className="flex bg-gray40 text-[14px] h-[44px] border border-gray50 rounded-xl items-center justify-between px-3 mb-2">
						<div className="flex items-center gap-2">
							<Icon iconSrc="assets/images/provider-dashboard/Telos.svg" />
							<p>Telos</p>
						</div>
						<Icon iconSrc="assets/images/provider-dashboard/arrow-down.svg" />
					</div>

					<div className="flex bg-gray40 text-[14px] h-[44px] border border-gray50 rounded-xl items-center justify-between px-3 mb-2">
						<input
							name="nftAddress"
							className="bg-transparent w-full  placeholder-gray80"
							placeholder="Paste NFT address"
						/>
					</div>
					<div className="flex bg-gray40 text-[14px] h-[44px] border border-gray50 rounded-xl items-center justify-between px-3 mb-2">
						<div className="flex items-center gap-2">
							<p>Select Method</p>
						</div>
						<Icon iconSrc="assets/images/provider-dashboard/arrow-down.svg" />
					</div>
				</div>
				<div className="flex cursor-pointer  bg-gray40 text-[14px] font-semibold text-white h-[44px] border-2 border-gray70 rounded-xl items-center justify-center mb-2">
					Add Requirement
				</div>
			</div>
		);
	}

	function renderPoapRequirement() {
		return (
			<div className="flex flex-col gap-2 mt-5">
				<div className="absolute top-5 cursor-pointer z-[999]" onClick={handleBackToRequirementModal}>
					<Icon iconSrc="assets/images/provider-dashboard/arrow-left.svg" className="cursor-pointer z-[999999]" />
				</div>
				<div className="flex flex-col gap-2 min-h-[310px]">
					<div className="flex justify-between gap-3 text-white text-[14px] font-medium mb-5">
						<div className="bg-gray50 w-full rounded-xl h-[32px] flex items-center justify-center">Should satisfy</div>
						<div className="bg-gray50 w-full rounded-xl h-[32px] flex items-center justify-center">
							Should not satisfy
						</div>
					</div>
					<div className="flex bg-gray40 text-[14px] h-[44px] border border-gray50 rounded-xl items-center justify-between px-3 mb-2">
						<div className="flex items-center gap-2">
							<Icon iconSrc="assets/images/provider-dashboard/Telos.svg" />
							<p>Telos</p>
						</div>
						<Icon iconSrc="assets/images/provider-dashboard/arrow-down.svg" />
					</div>

					<div className="flex bg-gray40 text-[14px] h-[44px] border border-gray50 rounded-xl items-center justify-between px-3 mb-2">
						<input
							name="nftAddress"
							className="bg-transparent w-full  placeholder-gray80"
							placeholder="Paste NFT address"
						/>
					</div>
					<div className="flex bg-gray40 text-[14px] h-[44px] border border-gray50 rounded-xl items-center justify-between px-3 mb-2">
						<div className="flex items-center gap-2">
							<p>Select Method</p>
						</div>
						<Icon iconSrc="assets/images/provider-dashboard/arrow-down.svg" />
					</div>
				</div>
				<div className="flex cursor-pointer  bg-gray40 text-[14px] font-semibold text-white h-[44px] border-2 border-gray70 rounded-xl items-center justify-center mb-2">
					Add Requirement
				</div>
			</div>
		);
	}

	function renderGithubRequirement() {
		return (
			<div className="flex flex-col gap-2 mt-5">
				<div className="absolute top-5 cursor-pointer z-[999]" onClick={handleBackToRequirementModal}>
					<Icon iconSrc="assets/images/provider-dashboard/arrow-left.svg" className="cursor-pointer z-[999999]" />
				</div>
				<div className="flex flex-col gap-2 min-h-[310px]">
					<div className="flex justify-between gap-3 text-white text-[14px] font-medium mb-5">
						<div className="bg-gray50 w-full rounded-xl h-[32px] flex items-center justify-center">Should satisfy</div>
						<div className="bg-gray50 w-full rounded-xl h-[32px] flex items-center justify-center">
							Should not satisfy
						</div>
					</div>
					<div className="flex bg-gray40 text-[14px] h-[44px] border border-gray50 rounded-xl items-center justify-between px-3 mb-2">
						<div className="flex items-center gap-2">
							<Icon iconSrc="assets/images/provider-dashboard/Telos.svg" />
							<p>Telos</p>
						</div>
						<Icon iconSrc="assets/images/provider-dashboard/arrow-down.svg" />
					</div>

					<div className="flex bg-gray40 text-[14px] h-[44px] border border-gray50 rounded-xl items-center justify-between px-3 mb-2">
						<input
							name="nftAddress"
							className="bg-transparent w-full  placeholder-gray80"
							placeholder="Paste NFT address"
						/>
					</div>
					<div className="flex bg-gray40 text-[14px] h-[44px] border border-gray50 rounded-xl items-center justify-between px-3 mb-2">
						<div className="flex items-center gap-2">
							<p>Select Method</p>
						</div>
						<Icon iconSrc="assets/images/provider-dashboard/arrow-down.svg" />
					</div>
				</div>
				<div className="flex cursor-pointer  bg-gray40 text-[14px] font-semibold text-white h-[44px] border-2 border-gray70 rounded-xl items-center justify-center mb-2">
					Add Requirement
				</div>
			</div>
		);
	}

	function renderMirrorRequirement() {
		return (
			<div className="flex flex-col gap-2 mt-5">
				<div className="absolute top-5 cursor-pointer z-[999]" onClick={handleBackToRequirementModal}>
					<Icon iconSrc="assets/images/provider-dashboard/arrow-left.svg" className="cursor-pointer z-[999999]" />
				</div>
				<div className="flex flex-col gap-2 min-h-[310px]">
					<div className="flex justify-between gap-3 text-white text-[14px] font-medium mb-5">
						<div className="bg-gray50 w-full rounded-xl h-[32px] flex items-center justify-center">Should satisfy</div>
						<div className="bg-gray50 w-full rounded-xl h-[32px] flex items-center justify-center">
							Should not satisfy
						</div>
					</div>
					<div className="flex bg-gray40 text-[14px] h-[44px] border border-gray50 rounded-xl items-center justify-between px-3 mb-2">
						<div className="flex items-center gap-2">
							<Icon iconSrc="assets/images/provider-dashboard/Telos.svg" />
							<p>Telos</p>
						</div>
						<Icon iconSrc="assets/images/provider-dashboard/arrow-down.svg" />
					</div>

					<div className="flex bg-gray40 text-[14px] h-[44px] border border-gray50 rounded-xl items-center justify-between px-3 mb-2">
						<input
							name="nftAddress"
							className="bg-transparent w-full  placeholder-gray80"
							placeholder="Paste NFT address"
						/>
					</div>
					<div className="flex bg-gray40 text-[14px] h-[44px] border border-gray50 rounded-xl items-center justify-between px-3 mb-2">
						<div className="flex items-center gap-2">
							<p>Select Method</p>
						</div>
						<Icon iconSrc="assets/images/provider-dashboard/arrow-down.svg" />
					</div>
				</div>
				<div className="flex cursor-pointer  bg-gray40 text-[14px] font-semibold text-white h-[44px] border-2 border-gray70 rounded-xl items-center justify-center mb-2">
					Add Requirement
				</div>
			</div>
		);
	}

	function renderOpAttestationRequirement() {
		return (
			<div className="flex flex-col gap-2 mt-5">
				<div className="absolute top-5 cursor-pointer z-[999]" onClick={handleBackToRequirementModal}>
					<Icon iconSrc="assets/images/provider-dashboard/arrow-left.svg" className="cursor-pointer z-[999999]" />
				</div>
				<div className="flex flex-col gap-2 min-h-[310px]">
					<div className="flex justify-between gap-3 text-white text-[14px] font-medium mb-5">
						<div className="bg-gray50 w-full rounded-xl h-[32px] flex items-center justify-center">Should satisfy</div>
						<div className="bg-gray50 w-full rounded-xl h-[32px] flex items-center justify-center">
							Should not satisfy
						</div>
					</div>
					<div className="flex bg-gray40 text-[14px] h-[44px] border border-gray50 rounded-xl items-center justify-between px-3 mb-2">
						<div className="flex items-center gap-2">
							<Icon iconSrc="assets/images/provider-dashboard/Telos.svg" />
							<p>Telos</p>
						</div>
						<Icon iconSrc="assets/images/provider-dashboard/arrow-down.svg" />
					</div>

					<div className="flex bg-gray40 text-[14px] h-[44px] border border-gray50 rounded-xl items-center justify-between px-3 mb-2">
						<input
							name="nftAddress"
							className="bg-transparent w-full  placeholder-gray80"
							placeholder="Paste NFT address"
						/>
					</div>
					<div className="flex bg-gray40 text-[14px] h-[44px] border border-gray50 rounded-xl items-center justify-between px-3 mb-2">
						<div className="flex items-center gap-2">
							<p>Select Method</p>
						</div>
						<Icon iconSrc="assets/images/provider-dashboard/arrow-down.svg" />
					</div>
				</div>
				<div className="flex cursor-pointer  bg-gray40 text-[14px] font-semibold text-white h-[44px] border-2 border-gray70 rounded-xl items-center justify-center mb-2">
					Add Requirement
				</div>
			</div>
		);
	}

	function renderLensRequirement() {
		return (
			<div className="flex flex-col gap-2 mt-5">
				<div className="absolute top-5 cursor-pointer z-[999]" onClick={handleBackToRequirementModal}>
					<Icon iconSrc="assets/images/provider-dashboard/arrow-left.svg" className="cursor-pointer z-[999999]" />
				</div>
				<div className="flex flex-col gap-2 min-h-[310px]">
					<div className="flex justify-between gap-3 text-white text-[14px] font-medium mb-5">
						<div className="bg-gray50 w-full rounded-xl h-[32px] flex items-center justify-center">Should satisfy</div>
						<div className="bg-gray50 w-full rounded-xl h-[32px] flex items-center justify-center">
							Should not satisfy
						</div>
					</div>
					<div className="flex bg-gray40 text-[14px] h-[44px] border border-gray50 rounded-xl items-center justify-between px-3 mb-2">
						<div className="flex items-center gap-2">
							<Icon iconSrc="assets/images/provider-dashboard/Telos.svg" />
							<p>Telos</p>
						</div>
						<Icon iconSrc="assets/images/provider-dashboard/arrow-down.svg" />
					</div>

					<div className="flex bg-gray40 text-[14px] h-[44px] border border-gray50 rounded-xl items-center justify-between px-3 mb-2">
						<input
							name="nftAddress"
							className="bg-transparent w-full  placeholder-gray80"
							placeholder="Paste NFT address"
						/>
					</div>
					<div className="flex bg-gray40 text-[14px] h-[44px] border border-gray50 rounded-xl items-center justify-between px-3 mb-2">
						<div className="flex items-center gap-2">
							<p>Select Method</p>
						</div>
						<Icon iconSrc="assets/images/provider-dashboard/arrow-down.svg" />
					</div>
				</div>
				<div className="flex cursor-pointer  bg-gray40 text-[14px] font-semibold text-white h-[44px] border-2 border-gray70 rounded-xl items-center justify-center mb-2">
					Add Requirement
				</div>
			</div>
		);
	}

	function renderInitialBody() {
		return (
			<div className="flex flex-col gap-2 ">
				<div className="absolute top-5 cursor-pointer z-[999]">
					<Icon iconSrc="assets/images/provider-dashboard/arrow-left.svg" className="cursor-pointer z-[999999]" />
				</div>
				<p className="text-white text-[14px] font-medium">General</p>
				<div className="grid grid-cols-2 gap-2.5 row-gap-2 w-full">
					<div className="requireModal" onClick={() => handleSelectRequirementModal('nft', 'NFT')}>
						<Icon iconSrc="assets/images/provider-dashboard/modalIcon/chainlink-(link).svg" />
						NFT
					</div>
					<div className="requireModal" onClick={() => handleSelectRequirementModal('token', 'Token')}>
						<Icon iconSrc="assets/images/provider-dashboard/modalIcon/dollar-circle.svg" />
						Token
					</div>
					<div className="requireModal" onClick={() => handleSelectRequirementModal('allowList', 'Allowlist')}>
						<Icon iconSrc="assets/images/provider-dashboard/modalIcon/note.svg" />
						Allowlist
					</div>
					<div className="requireModal">
						<Icon iconSrc="assets/images/provider-dashboard/modalIcon/wallet-check.svg" />
						Wallet Activity
					</div>
					<div className="requireModal" onClick={() => handleSelectRequirementModal('contractQuery', 'Contract query')}>
						<Icon iconSrc="assets/images/provider-dashboard/modalIcon/note-2.svg" />
						Contract Query
					</div>
					<div className="requireModal">
						<Icon iconSrc="assets/images/provider-dashboard/modalIcon/scanning.svg" />
						Captcha
					</div>
					<div className="requireModal">
						<Icon iconSrc="assets/images/provider-dashboard/modalIcon/lamp-on.svg" />
						Learn Tap
					</div>
					<div className="requireModal">
						<Icon iconSrc="assets/images/provider-dashboard/modalIcon/gas-station.svg" />
						Gas Tap
					</div>
				</div>
				<p className="text-white text-[14px] font-medium mt-3">Integration</p>
				<div className="requireModalIntegration" onClick={() => handleSelectRequirementModal('discord', 'Discord')}>
					<div className="flex gap-2 items-center">
						<Icon iconSrc="assets/images/provider-dashboard/discord-blue.svg" />
						<p>Discord</p>
					</div>
					<Icon iconSrc="assets/images/provider-dashboard/arrow-right.svg" />
				</div>
				<div className="requireModalIntegration" onClick={() => handleSelectRequirementModal('twitter', 'Twitter')}>
					<div className="flex gap-2 items-center">
						<Icon iconSrc="assets/images/provider-dashboard/twitter-blue.svg" />
						<p>Twitter</p>
					</div>
					<Icon iconSrc="assets/images/provider-dashboard/arrow-right.svg" />
				</div>
				<div className="requireModalIntegration" onClick={() => handleSelectRequirementModal('poap', 'Poap')}>
					<div className="flex gap-2 items-center">
						<Icon iconSrc="assets/images/provider-dashboard/poap.svg" />
						<p>Poap</p>
					</div>
					<Icon iconSrc="assets/images/provider-dashboard/arrow-right.svg" />
				</div>
				<div className="requireModalIntegration" onClick={() => handleSelectRequirementModal('github', 'Github')}>
					<div className="flex gap-2 items-center">
						<Icon iconSrc="assets/images/provider-dashboard/github.svg" />
						<p>Github</p>
					</div>
					<Icon iconSrc="assets/images/provider-dashboard/arrow-right.svg" />
				</div>
				<div className="requireModalIntegration" onClick={() => handleSelectRequirementModal('mirror', 'Mirror')}>
					<div className="flex gap-2 items-center">
						<Icon iconSrc="assets/images/provider-dashboard/mirror.svg" />
						<p>Mirror</p>
					</div>
					<Icon iconSrc="assets/images/provider-dashboard/arrow-right.svg" />
				</div>
				<div
					className="requireModalIntegration"
					onClick={() => handleSelectRequirementModal('OpAttestation', 'OP Attestation')}
				>
					<div className="flex gap-2 items-center">
						<Icon iconSrc="assets/images/provider-dashboard/op.svg" />
						<p>OP Attestation</p>
					</div>
					<Icon iconSrc="assets/images/provider-dashboard/arrow-right.svg" />
				</div>
				<div className="requireModalIntegration" onClick={() => handleSelectRequirementModal('lens', 'Lens')}>
					<div className="flex gap-2 items-center">
						<Icon iconSrc="assets/images/provider-dashboard/lens.svg" />
						<p>Lens</p>
					</div>
					<Icon iconSrc="assets/images/provider-dashboard/arrow-right.svg" />
				</div>
			</div>
		);
	}

	const getRequirementModalBody = () => {
		if (requirementModalItems.nft) return renderNftRequirement();
		if (requirementModalItems.token) return renderTokenRequirement();
		if (requirementModalItems.allowList) return renderAllowListRequirement();
		if (requirementModalItems.contractQuery) return renderContractQueryRequirement();
		if (requirementModalItems.discord) return renderDiscordRequirement();
		if (requirementModalItems.twitter) return renderTwitterRequirement();
		if (requirementModalItems.poap) return renderPoapRequirement();
		if (requirementModalItems.github) return renderGithubRequirement();
		if (requirementModalItems.mirror) return renderMirrorRequirement();
		if (requirementModalItems.opAttestation) return renderOpAttestationRequirement();
		if (requirementModalItems.lens) return renderLensRequirement();

		return renderInitialBody();
	};

	return <div className="claim-modal-wrapper flex flex-col max-h-[550px] pt-5">{getRequirementModalBody()}</div>;
};

interface CounterProp {
	label: string;
	logic: string;
}

const Counter = ({ label, logic }: CounterProp) => {
	const { data, handleChangeNftReq } = usePrizeOfferFormContext();
	const handleIncrease = () => {
		handleChangeNftReq(data[logic as keyof DataProp] + 1, logic);
	};
	const handleDecrease = () => {
		handleChangeNftReq(data[logic as keyof DataProp] == 0 ? 0 : data[logic as keyof DataProp] - 1, logic);
	};
	return (
		<div className="flex w-full items-center justify-between text-[14px] text-white bg-gray40 border border-gray50 h-[44px] pl-3 rounded-xl ">
			<input
				disabled
				placeholder={label}
				value={data[logic as keyof DataProp]}
				className="bg-transparent  placeholder-gray80"
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

const CustomID = ({ label, logic }: CounterProp) => {
	const { data, handleChange } = usePrizeOfferFormContext();
	return (
		<div className="flex w-full items-center justify-between text-[14px] text-white bg-gray40 border border-gray50 h-[44px] pl-3 rounded-xl ">
			<input
				onChange={(e) => handleChange(e)}
				placeholder={label}
				value={data[logic as keyof DataProp]}
				name={logic}
				className="bg-transparent h-[100%]  placeholder-gray80"
			/>
		</div>
	);
};

const RequirementModal = () => {
	const { closeRequirementModal, isModalOpen, requirementTitle } = usePrizeOfferFormContext();

	const isOpen = useMemo(() => {
		return isModalOpen;
	}, [isModalOpen]);

	return (
		<>
			<Modal
				title={`${requirementTitle ? 'Add ' + requirementTitle + ' requirement' : 'Add requirement'}`}
				size="small"
				closeModalHandler={closeRequirementModal}
				isOpen={isOpen}
			>
				<RequirementModalBody />
			</Modal>
		</>
	);
};

export default RequirementModal;
