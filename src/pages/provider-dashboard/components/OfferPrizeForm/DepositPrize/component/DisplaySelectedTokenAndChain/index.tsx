import Icon from 'components/basic/Icon/Icon';
import { ProviderDashboardFormDataProp } from 'types';

interface Prop {
	data: ProviderDashboardFormDataProp;
}

const DisplaySelectedTokenAndChain = ({ data }: Prop) => {
	return (
		<div className="flex w-full gap-5 text-white h-[48px] text-[14px] mt-[-12px] ">
			<div className="cursor-pointer gap-2 w-full flex items-center justify-center bg-gray50 rounded-xl">
				<Icon iconSrc={data.selectedChain ? data.selectedChain?.logoUrl : ''} height="24px" width="24px" />
				<p>{data.selectedChain ? data.selectedChain?.chainName : ''}</p>
			</div>
			<div className="cursor-pointer gap-2 w-full flex items-center justify-center bg-gray50 rounded-xl">
				<Icon iconSrc="assets/images/provider-dashboard/kolahGhermezi.svg" />
				<p>Kolah Qermezi</p>
			</div>
		</div>
	);
};

export default DisplaySelectedTokenAndChain;
