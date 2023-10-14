import { ProviderDashboardFormDataProp } from 'types';
import RenderSocialMedia from '../RenderSocialMedia';
import FormYouFilled from '../FormYouFilled';
import { ProviderDashboardButtonSubmit } from 'components/basic/Button/button';

interface Prop {
	data: ProviderDashboardFormDataProp;
}

const RenderInitialBody = ({ data }: Prop) => {
	return (
		<div className="flex flex-col">
			<div className="text-gray100 text-[14px] ">
				This is how your card will appear. If you are sure of the accuracy of the form you filled out, please submit
				your contribution.
			</div>
			<FormYouFilled data={data} />
			<ProviderDashboardButtonSubmit width="208px" className="text-[14px] md:text-[12px] lg:text-[14px] mt-10">
				<p>Submit Contribution</p>
			</ProviderDashboardButtonSubmit>
		</div>
	);
};

export default RenderInitialBody;
