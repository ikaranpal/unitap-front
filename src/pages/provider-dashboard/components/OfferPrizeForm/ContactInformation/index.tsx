import Icon from 'components/basic/Icon/Icon';
import usePrizeOfferFormContext from 'hooks/usePrizeOfferFormContext';
import { ProviderDashboardButtonNext, ProviderDashboardButtonPrevious } from 'components/basic/Button/button';
import { useState } from 'react';

interface PrizeInfoProp {
	handleChangeFormPagePrev: (page: number) => void;
	handleChangeFormPageNext: (page: number) => void;
}
const ContactInformation = ({ handleChangeFormPagePrev, handleChangeFormPageNext }: PrizeInfoProp) => {
	const { handleChange, data, page, canGoStepFive } = usePrizeOfferFormContext();
	const [showErrors, setShowErrors] = useState<boolean>(false);
	const handleNextPage = () => {
		const res = canGoStepFive();
		if (res != null && res) {
			setShowErrors(false);
			handleChangeFormPageNext(page);
		} else {
			setShowErrors(true);
		}
	};
	return (
		<div className="text-gray100 text-[12px] font-medium flex flex-col gap-5 w-full  max-w-[452px] min-w-[300px]">
			<div className="relative">
				<div className="flex overflow-hidden text-gray80 gap-5 text-[12px] bg-gray40 border border-gray50 rounded-[12px] h-[44px] items-center justify-between w-full max-w-[452px]">
					<div className="w-[54px] bg-gray30 h-full flex items-center justify-center">
						<Icon iconSrc="assets/images/provider-dashboard/email.svg" />
					</div>
					<input
						type="text"
						placeholder="example@email.com"
						className="provider-dashboard-input"
						name="email"
						onChange={handleChange}
						value={data.email ? data.email : ''}
					/>
				</div>
				{showErrors && !data.email && <p className="text-error text-[8px] m-0 p-0 absolute left-1">Require</p>}
			</div>

			<div className="relative">
				<div className="flex gap-5 overflow-hidden text-gray80 text-[12px] bg-gray40 border border-gray50 rounded-[12px] h-[44px] items-center justify-between w-full max-w-[452px]">
					<div className="w-[54px] bg-gray30 h-full flex items-center justify-center">
						<Icon iconSrc="assets/images/provider-dashboard/telegram.svg" />
					</div>
					<input
						type="text"
						placeholder="@yourTelegramHandle"
						className="provider-dashboard-input"
						name="telegram"
						onChange={handleChange}
						value={data.telegram ? data.telegram : ''}
					/>
				</div>
				{showErrors && !data.telegram && <p className="text-error text-[8px] m-0 p-0 absolute left-1">Require</p>}
			</div>

			<div className="flex gap-5 overflow-hidden text-gray80 text-[12px] bg-gray40 border border-gray50 rounded-[12px] h-[44px] items-center justify-between w-full max-w-[452px]">
				<div className="w-[54px] bg-gray30 h-full flex items-center justify-center">
					<Icon iconSrc="assets/images/provider-dashboard/twitter.svg" />
				</div>
				<input
					type="text"
					placeholder="@providerUsername"
					className="provider-dashboard-input"
					name="twitter"
					onChange={handleChange}
					value={data.twitter}
				/>
			</div>
			<div className="flex gap-5 overflow-hidden text-gray80 text-[12px] bg-gray40 border border-gray50 rounded-[12px] h-[44px] items-center justify-between w-full max-w-[452px]">
				<div className="w-[54px] bg-gray30 h-full flex items-center justify-center">
					<Icon iconSrc="assets/images/provider-dashboard/discord.svg" />
				</div>
				<input
					type="text"
					placeholder="@providerUsername"
					className="provider-dashboard-input"
					name="discord"
					onChange={handleChange}
					value={data.discord}
				/>
			</div>

			<div className="flex gap-2 text-gray80 text-[12px] bg-gray40 border border-gray50 rounded-[12px] h-[64px] items-center justify-between px-4 w-full max-w-[452px]">
				<input
					type="text"
					placeholder="Please provide any necessary information"
					className="provider-dashboard-input"
					name="necessaryInfo"
					onChange={handleChange}
					value={data.necessaryInfo}
				/>
				<p>0/100</p>
			</div>
			<div className="flex flex-col lg:flex-row w-full max-w-[452px] mt-5 items-center ">
				{/* {page == 5 ? (
					<ProviderDashboardGoToDashBoard className="opacity-[.3]">Go To Dashboard</ProviderDashboardGoToDashBoard>
				) : ( */}
				<div className="flex flex-col sm:flex-row w-full gap-5">
					<ProviderDashboardButtonPrevious
						disabled={page == 0 ? true : false}
						className="w-full"
						onClick={() => handleChangeFormPagePrev(page)}
					>
						Previous
					</ProviderDashboardButtonPrevious>
					<ProviderDashboardButtonNext onClick={handleNextPage}>NEXT</ProviderDashboardButtonNext>
					{/* {page == 4 ? (
							<ProviderDashboardButtonSubmit className="text-[14px] md:text-[12px] lg:text-[14px] ">
								<p>Submit Contribution</p> */}
					{/* </ProviderDashboardButtonSubmit> */}
					{/* ) : ( */}

					{/* )} */}
				</div>
				{/* )} */}
			</div>
		</div>
	);
};

export default ContactInformation;
