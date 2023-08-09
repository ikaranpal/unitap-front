import { useMemo } from 'react';
import { Text } from 'components/basic/Text/text.style';
import { DropIconWrapper } from 'pages/home/components/ClaimModal/claimModal.style';
import Icon from 'components/basic/Icon/Icon';
import { ClaimButton } from 'components/basic/Button/button';
import usePrizeOfferFormContext from 'hooks/usePrizeOfferFormContext';
import Modal from 'components/common/Modal/modal';

// @ts-ignore
const RequirementModalBody = () => {
	const { handleSelectRequirementModal, requirementModalItems, handleBackToRequirementModal } =
		usePrizeOfferFormContext();

	function renderNftRequirement() {
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
						<input name="nftAddress" className="bg-transparent w-full" placeholder="Paste NFT address" />
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

	function renderTokenRequirement() {
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
						<input name="nftAddress" className="bg-transparent w-full" placeholder="Paste NFT address" />
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
					<div className="flex bg-gray40 text-[14px] h-[44px] border border-gray50 rounded-xl items-center justify-between px-3 mb-2">
						<div className="flex items-center gap-2">
							<Icon iconSrc="assets/images/provider-dashboard/Telos.svg" />
							<p>Telos</p>
						</div>
						<Icon iconSrc="assets/images/provider-dashboard/arrow-down.svg" />
					</div>

					<div className="flex bg-gray40 text-[14px] h-[44px] border border-gray50 rounded-xl items-center justify-between px-3 mb-2">
						<input name="nftAddress" className="bg-transparent w-full" placeholder="Paste NFT address" />
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
						<input name="nftAddress" className="bg-transparent w-full" placeholder="Paste NFT address" />
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
						<input name="nftAddress" className="bg-transparent w-full" placeholder="Paste NFT address" />
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
						<input name="nftAddress" className="bg-transparent w-full" placeholder="Paste NFT address" />
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
						<input name="nftAddress" className="bg-transparent w-full" placeholder="Paste NFT address" />
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
						<input name="nftAddress" className="bg-transparent w-full" placeholder="Paste NFT address" />
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
						<input name="nftAddress" className="bg-transparent w-full" placeholder="Paste NFT address" />
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

	function renderopAttestationRequirement() {
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
						<input name="nftAddress" className="bg-transparent w-full" placeholder="Paste NFT address" />
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
						<input name="nftAddress" className="bg-transparent w-full" placeholder="Paste NFT address" />
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
		if (requirementModalItems.discord) return renderContractQueryRequirement();
		if (requirementModalItems.twitter) return renderContractQueryRequirement();
		if (requirementModalItems.poap) return renderContractQueryRequirement();
		if (requirementModalItems.github) return renderContractQueryRequirement();
		if (requirementModalItems.mirror) return renderContractQueryRequirement();
		if (requirementModalItems.opAttestation) return renderContractQueryRequirement();
		if (requirementModalItems.lens) return renderContractQueryRequirement();

		return renderInitialBody();
	};

	return <div className="claim-modal-wrapper flex flex-col max-h-[500px] pt-5">{getRequirementModalBody()}</div>;
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
