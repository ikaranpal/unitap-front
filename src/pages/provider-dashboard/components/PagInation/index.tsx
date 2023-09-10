import { ProviderDashboardButtonNext, ProviderDashboardButtonPrevious } from 'components/basic/Button/button';

interface PagInationProp {
	handleChangeFormPagePrev: () => void;
	handleNextPage: () => void;
	page: number;
}

const Pagination = ({ handleChangeFormPagePrev, handleNextPage, page }: PagInationProp) => {
	return (
		<section className="flex flex-col lg:flex-row w-full max-w-[452px] mt-5 items-center ">
			<div className="flex flex-col sm:flex-row w-full gap-5">
				<ProviderDashboardButtonPrevious disabled={!page} className="w-full" onClick={handleChangeFormPagePrev}>
					Previous
				</ProviderDashboardButtonPrevious>
				<ProviderDashboardButtonNext onClick={handleNextPage}>NEXT</ProviderDashboardButtonNext>
			</div>
		</section>
	);
};

export default Pagination;
