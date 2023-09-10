import { ClaimAndEnrollButton } from 'components/basic/Button/button';
import Icon from 'components/basic/Icon/Icon';
import { DV } from 'components/basic/designVariables';
import styled from 'styled-components';
import { ProviderDashboardFormDataProp } from 'types';

const Action = styled.div`
	display: flex;

	// @media only screen and (max-width: ${DV.breakpoints.smallDesktop}) {
		flex-direction: column;
	}
`;

interface Prop {
	data: ProviderDashboardFormDataProp;
}
const FormYouFilled = ({ data }: Prop) => {
	return (
		<div className={data.isNft ? 'prize-card-bg-1' : 'prize-card-bg-2'}>
			<div className="flex flex-col lg:flex-row items-center justify-center gap-4 p-5 lg:p-0 rounded-xl bg-gray30 lg:bg-inherit">
				<div className="prize-card__image relative mb-3 lg:mb-0">
					<div>
						<div
							className={`prize-card__container h-[212px] w-[212px] flex justify-center items-center p-5 rounded-xl`}
						></div>
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
								{data.twitter && (
									<Icon
										iconSrc="assets/images/prize-tap/twitter-logo.svg"
										onClick={() => window.open(data.twitter ? data.twitter : '', '_blank')}
										width="20px"
										height="16px"
										hoverable
									/>
								)}
								{data.discord && (
									<Icon
										iconSrc="assets/images/prize-tap/discord-logo.svg"
										onClick={() => window.open(data.discord ? data.discord : '', '_blank')}
										width="20px"
										height="16px"
										hoverable
									/>
								)}
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
										<p className="text-[10px] text-gray100">20 people remains</p>
									</div>
								</div>
								<ClaimAndEnrollButton height="38px" fontSize="14px">
									Enroll
								</ClaimAndEnrollButton>
							</span>
						</Action>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FormYouFilled;
