import { ProviderDashboardFormDataProp } from 'types';
import RenderSocialMedia from '../RenderSocialMedia';
import FormYouFilled from '../FormYouFilled';

interface Prop {
	data: ProviderDashboardFormDataProp;
}

const RenderInitialBody = ({ data }: Prop) => {
	return (
		<div className="flex flex-col gap-10">
			<FormYouFilled data={data} />
			<RenderSocialMedia data={data} />
			<div className=" bg-gray40 text-gray100 text-[12px] p-2 px-4 rounded-xl text-justify">
				Lorem ipsum dolor sit amet consectetur. Turpis urna iaculis est aliquet ullamcorper. Velit urna pellentesque mi
				nisi sem. Non nisl elementum sed eget eget parturient. Bibendum enim fames urna at posuere eros tempor tempus
				aliquam. Cum vel aliquet in semper sit. Tincidunt duis facilisi facilisis um posuere viverra egestas. Mi sit
				quam diam mi in molestie amet. Sem non ipsum dolor enim est. Tristique sit tortor mauris in leo facilisis nulla
				ac.
			</div>
		</div>
	);
};

export default RenderInitialBody;
