import { ProviderDashboardButtonSubmit } from 'components/basic/Button/button';
import Icon from 'components/basic/Icon/Icon';
import { DV } from 'components/basic/designVariables';
import usePrizeOfferFormContext from 'hooks/usePrizeOfferFormContext';
import { RaffleCardTimerSubmitContribution } from 'pages/prize-tap/components/RafflesList/RafflesList';
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
	const { requirementList } = usePrizeOfferFormContext();
	const prizeName = data.isNft
		? data.nftName
		: data.isNativeToken
		? data.tokenAmount + ' ' + data.selectedChain.symbol
		: data.tokenAmount + ' ' + data.tokenSymbol;
	return (
		<div className="flex flex-col lg:flex-row gap-2 mt-5 w-full">
			<div className="bg-gray30 border border-gray40 rounded-[6px] min-w-[208px] min-h-[208px] max-h-[208px] relative flex justify-center">
				<div className="providePrize__amount_modal flex flex-col justify-center items-center" data-amount={prizeName}>
					<Icon iconSrc={data.selectedChain.logoUrl} width="25px" height="25px" className="mb-2" />
					<p className="mb-8">{prizeName}</p>
				</div>
				<div className="flex items-center bg-gray50 justify-center gap-1 absolute bottom-[-12px] left-7 border border-gray70 rounded-[3px] p-1 min-w-[150px] min-h-[25px]">
					<Icon iconSrc={data.selectedChain ? data.selectedChain.logoUrl : ''} width="16px" height="16px" />
					<p className="text-gray100 text-[10px] font-semibold">
						on {data.selectedChain?.chainName ? data.selectedChain.chainName : ''}
					</p>
				</div>
			</div>
			<div className="bg-gray30 border border-gray40 rounded-[6px] w-full min-h-[100px] text-[14px] text-white p-4">
				<div>{prizeName}</div>
				<div className="text-gray80 text-[16px] mt-1 mb-2">by BEGI</div>
				<div className="text-[14px] text-gray100 text-xs leading-5 mb-6 grow shrink-0 basis-auto text-justify ">
					{data.description}
				</div>
				<div className="flex gap-2 mb-2 ">
					{requirementList.length > 0
						? requirementList.map((item, index) => {
								return (
									<div className="text-gray100 border border-gray70 bg-gray50 p-1 px-2 text-[10px] rounded" key={index}>
										{item.name}
									</div>
								);
						  })
						: null}
				</div>
				<Action className={'w-full sm:w-auto items-center sm:items-end '}>
					<span className="flex flex-col lg:flex-row items-center justify-between w-full gap-4 ">
						<div className="flex flex-col md:flex-row gap-4 justify-between w-full lg:min-w-[450px] items-center bg-gray40 px-5 h-full  py-1 rounded-xl">
							<p className="text-[12px] text-gray100">0 people enrolled</p>
							<RaffleCardTimerSubmitContribution
								startTime={new Date(data.startTimeStamp * 1000).toString()}
								FinishTime={new Date(data.endTimeStamp * 1000).toString()}
							/>
						</div>
						<ProviderDashboardButtonSubmit fontSize="14px" width="100%" height="38px">
							<p>Enroll</p>
							<div className="absolute right-3">
								<Icon width="20px" height="20px" iconSrc="assets/images/prize-tap/header-prize-logo.svg" />
							</div>
						</ProviderDashboardButtonSubmit>
					</span>
				</Action>
			</div>
		</div>
	);
};

export default FormYouFilled;
