import Icon from 'components/basic/Icon/Icon';
import usePrizeOfferFormContext from 'hooks/usePrizeOfferFormContext';
import { useState } from 'react';
import { ProviderFormPaginationProp, ProviderDashboardFormDataProp } from 'types';
import Pagination from '../../PagInation';

interface ContactField {
	name: keyof ProviderDashboardFormDataProp;
	placeholder: string;
	icon: string;
	require: boolean;
}

export const socialMediaDescription = {
	id: 3,
	prevIcon: 'assets/images/provider-dashboard/step-3-green.png',
	activeIcon: 'assets/images/provider-dashboard/step-3-active.png',
	nextIcon: 'assets/images/provider-dashboard/step-3-off.png',
	title: 'Social Media  & Contact Info',
	description: 'Add your contact info & Social Media ',
};

const contactFields: ContactField[] = [
	{
		name: 'email',
		placeholder: 'example@email.com',
		icon: 'assets/images/provider-dashboard/email.svg',
		require: true,
	},
	{
		name: 'telegram',
		placeholder: '@yourTelegramHandle',
		icon: 'assets/images/provider-dashboard/telegram.svg',
		require: true,
	},
	{
		name: 'twitter',
		placeholder: '@providerUsername',
		icon: 'assets/images/provider-dashboard/twitter.svg',
		require: false,
	},
	{
		name: 'discord',
		placeholder: '@providerUsername',
		icon: 'assets/images/provider-dashboard/discord.svg',
		require: false,
	},
];

const ContactInformation = ({ handleChangeFormPagePrev, handleChangeFormPageNext }: ProviderFormPaginationProp) => {
	const { handleChange, data, page, canGoStepFive } = usePrizeOfferFormContext();
	const [showErrors, setShowErrors] = useState<boolean>(false);

	const handleNextPage = () => {
		const res = canGoStepFive();
		setShowErrors(!res);
		res && handleChangeFormPageNext();
	};

	return (
		<div className="flex flex-col w-full items-center justify-center">
			<div className="text-gray100 text-[12px] min-h-[340px] font-medium flex flex-col gap-4 w-full max-w-[452px]">
				{contactFields.map((field, index) => (
					<section className="relative" key={index}>
						<div className="flex gap-5 overflow-hidden text-gray80 text-[12px] bg-gray40 border border-gray50 rounded-[12px] h-[44px] items-center justify-between w-full max-w-[452px]">
							<div className="w-[54px] bg-gray30 h-full flex items-center justify-center">
								<Icon iconSrc={field.icon} />
							</div>
							<input
								type="text"
								placeholder={field.placeholder}
								className="provider-dashboard-input"
								name={field.name}
								onChange={handleChange}
								value={data[field.name] ? data[field.name] : ''}
							/>
						</div>
						{field.require && showErrors && !data[field.name] && (
							<p className="text-error text-[8px] m-0 p-0 absolute left-1">Required</p>
						)}
					</section>
				))}

				<section className="flex gap-2 text-gray80 text-[12px] bg-gray40 border border-gray50 rounded-[12px] h-[64px] items-center justify-between px-4 w-full max-w-[452px]">
					<input
						type="text"
						placeholder="Please provide any necessary information"
						className="provider-dashboard-input"
						name="necessaryInfo"
						onChange={handleChange}
						value={data.necessaryInfo}
					/>
					<p>{data.necessaryInfo?.length}/100</p>
				</section>
			</div>
			<Pagination handleChangeFormPagePrev={handleChangeFormPagePrev} handleNextPage={handleNextPage} page={page} />
		</div>
	);
};

export default ContactInformation;
