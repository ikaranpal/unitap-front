import Icon from 'components/basic/Icon/Icon';
import usePrizeOfferFormContext from 'hooks/usePrizeOfferFormContext';

const ContactInformation = () => {
	const { handleChange, data } = usePrizeOfferFormContext();
	return (
		<div className="text-gray100 text-[12px] font-medium flex flex-col gap-5 w-full  max-w-[452px] min-w-[300px]">
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
					value={data.email}
				/>
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
			<div className="flex gap-5 overflow-hidden text-gray80 text-[12px] bg-gray40 border border-gray50 rounded-[12px] h-[44px] items-center justify-between w-full max-w-[452px]">
				<div className="w-[54px] bg-gray30 h-full flex items-center justify-center">
					<Icon iconSrc="assets/images/provider-dashboard/telegram.svg" />
				</div>
				<input
					type="text"
					placeholder="@yourTelegramUsername"
					className="provider-dashboard-input"
					name="telegram"
					onChange={handleChange}
					value={data.telegram}
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
		</div>
	);
};

export default ContactInformation;
