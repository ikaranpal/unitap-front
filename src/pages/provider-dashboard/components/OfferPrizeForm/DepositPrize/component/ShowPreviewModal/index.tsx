import Icon from 'components/basic/Icon/Icon';
import { DV } from 'components/basic/designVariables';
import Modal from 'components/common/Modal/modal';
import usePrizeOfferFormContext from 'hooks/usePrizeOfferFormContext';
import { useMemo } from 'react';
import styled from 'styled-components';

const Action = styled.div`
	display: flex;

	@media only screen and (max-width: ${DV.breakpoints.smallDesktop}) {
		flex-direction: column;
	}
`;
const ShowPreviewModalBody = () => {
	const { data } = usePrizeOfferFormContext();

	function renderInitialBody() {
		return (
			<div className="flex flex-col gap-10">
				<div className={data.isNft ? 'prize-card-bg-1' : 'prize-card-bg-2'}>
					<div className="flex flex-col lg:flex-row items-center justify-center gap-4 p-5 lg:p-0 rounded-xl bg-gray30 lg:bg-inherit">
						<div className="prize-card__image relative mb-3 lg:mb-0">
							<div>
								<div
									className={`prize-card__container h-[212px] w-[212px] flex justify-center items-center p-5 rounded-xl`}
								>
									{/* <img src={imageUrl ? imageUrl : tokenImgLink} alt={name} /> */}
								</div>
							</div>
							<div className="absolute bottom-[-10px] left-[40px] rounded-[6px] flex items-center bg-gray50  border-2 border-gray70 min-w-[130px] justify-center">
								<Icon iconSrc={data.selectedChain ? data.selectedChain.logoUrl : ''} width="20px" height="16px" />
								<p className="text-gray100 text-[10px] p-1">
									on {data.selectedChain?.chainName ? data.selectedChain.chainName : ''}
								</p>
							</div>
						</div>
						<div className="w-full">
							<div
								className={`card prize-card__content z-10 relative h-full md:max-h-[225px] md:min-h-[212px] rounded-xl p-4 pt-3 flex flex-col w-full h-full`}
							>
								<span className="flex justify-between w-full mb-3">
									{/* <p className="prize-card__title text-white text-sm">{name}</p> */}
									<p className="prize-card__title text-white text-sm">test</p>
									<div className="prize-card__links flex gap-4">
										<Icon
											iconSrc="assets/images/prize-tap/twitter-logo.svg"
											onClick={() => window.open(data.twitter ? data.twitter : '', '_blank')}
											width="20px"
											height="16px"
											hoverable
										/>
										<Icon
											iconSrc="assets/images/prize-tap/discord-logo.svg"
											onClick={() => window.open(data.discord ? data.discord : '', '_blank')}
											width="20px"
											height="16px"
											hoverable
										/>
									</div>
								</span>
								<span className="flex justify-between w-full mb-4">
									<p className="prize-card__source text-xs text-gray90">
										{!data.isNft ? (
											<span className="hover:cursor-pointer">
												{/* by {creator} */}
												by BEIGI
											</span>
										) : (
											<span className="hover:cursor-pointer">
												{/* from {creator} Collection by UNITAP.APP */}
												by BEIGI
											</span>
										)}
									</p>
								</span>
								<p className="prize-card__description text-gray100 text-xs leading-5 mb-6 grow shrink-0 basis-auto text-justify">
									{data.description}
								</p>
								<Action className={'w-full sm:w-auto items-center sm:items-end '}>
									<span className="flex flex-col md:flex-row items-center justify-between w-full gap-4 ">
										<div className="flex flex-col sm:flex-row gap-4 justify-between items-baseline w-full items-center bg-gray40 px-5 py-1 rounded-xl">
											<div className="flex flex-col gap-1">
												<p className="text-[10px] text-white">Winner in:</p>
												<p className="text-[10px] text-gray100">
													{/* {remainingPeople} people remains */}
													20 people remains
												</p>
											</div>
											{/* <RaffleCardTimer startTime={createdAt} FinishTime={deadline} /> */}
										</div>
										<button>Enroll</button>
										{/* <ClaimAndEnrollButton height="48px" fontSize="14px" className="min-w-[552px] md:!w-[352px] !w-full">
										{' '}
										<div className="relative w-full">
											<p> Enroll</p>{' '}
											<Icon
												className="absolute right-0 top-[-2px]"
												iconSrc="assets/images/prize-tap/header-prize-logo.svg"
												width="27px"
												height="24px"
											/>
										</div>
									</ClaimAndEnrollButton> */}
									</span>
								</Action>
							</div>
						</div>
					</div>
				</div>
				<div className="grid gap-5 text-gray100 text-[12px] grid-cols-[1fr] md:grid-cols-[1fr_1fr]">
					{data.email && (
						<div className=" overflow-hidden h-[44px] flex gap-2 items-center rounded-[8px] bg-gray40 border border-gray50">
							<div className="bg-gray30 h-[100%] w-[54px] flex items-center justify-center">
								<Icon iconSrc="assets/images/provider-dashboard/email.svg" />
							</div>
							{data.email}
						</div>
					)}
					{data.telegram && (
						<div className=" overflow-hidden h-[44px] flex gap-2 items-center rounded-[8px] bg-gray40 border border-gray50">
							<div className="bg-gray30 h-[100%] w-[54px] flex items-center justify-center">
								<Icon iconSrc="assets/images/provider-dashboard/telegram.svg" />
							</div>
							{data.telegram}
						</div>
					)}

					{data.twitter && (
						<div className=" overflow-hidden h-[44px] flex gap-2 items-center rounded-[8px] bg-gray40 border border-gray50">
							<div className="bg-gray30 h-[100%] w-[54px] flex items-center justify-center">
								<Icon iconSrc="assets/images/provider-dashboard/twitter.svg" />
							</div>
							{data.twitter}
						</div>
					)}
					{data.discord && (
						<div className=" overflow-hidden h-[44px] flex gap-2 items-center rounded-[8px] bg-gray40 border border-gray50">
							<div className="bg-gray30 h-[100%] w-[54px] flex items-center justify-center">
								<Icon iconSrc="assets/images/provider-dashboard/discord.svg" />
							</div>
							{data.discord}
						</div>
					)}
				</div>
				<div className=" bg-gray40 text-gray100 text-[12px] p-2 px-4 rounded-xl text-justify">
					Lorem ipsum dolor sit amet consectetur. Turpis urna iaculis est aliquet ullamcorper. Velit urna pellentesque
					mi nisi sem. Non nisl elementum sed eget eget parturient. Bibendum enim fames urna at posuere eros tempor
					tempus aliquam. Cum vel aliquet in semper sit. Tincidunt duis facilisi facilisis um posuere viverra egestas.
					Mi sit quam diam mi in molestie amet. Sem non ipsum dolor enim est. Tristique sit tortor mauris in leo
					facilisis nulla ac.
				</div>
			</div>
		);
	}

	const getRequirementModalBody = () => {
		return renderInitialBody();
	};

	return <div className="claim-modal-wrapper flex flex-col pt-5 p-2 min-h-[250px]">{getRequirementModalBody()}</div>;
};

const ShowPreviewModal = () => {
	const { closeShowPreviewModal, isModalOpen } = usePrizeOfferFormContext();
	const isOpen = useMemo(() => {
		return isModalOpen;
	}, [isModalOpen]);

	return (
		<>
			<Modal title="Form you Filled" size="large" closeModalHandler={closeShowPreviewModal} isOpen={isOpen}>
				<ShowPreviewModalBody />
			</Modal>
		</>
	);
};

export default ShowPreviewModal;
