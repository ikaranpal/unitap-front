import {
	ProviderDashboardButtonNext,
	ProviderDashboardButtonPrevious,
	ProviderDashboardButtonSubmit,
} from 'components/basic/Button/button';

interface PagInationProp {
	handleChangeFormPagePrev: () => void;
	handleNextPage: () => void;
	page: number;
	func?: string | null;
}

const Pagination = ({ handleChangeFormPagePrev, handleNextPage, page, func }: PagInationProp) => {
	return (
		<section className="flex flex-col lg:flex-row w-full max-w-[452px] mt-5 items-center ">
			<div className="flex flex-col sm:flex-row w-full gap-5">
				<ProviderDashboardButtonPrevious disabled={!page} className="w-full" onClick={handleChangeFormPagePrev}>
					Previous
				</ProviderDashboardButtonPrevious>
				{func === 'submit' ? (
					<ProviderDashboardButtonSubmit
						onClick={handleNextPage}
						className="text-[14px] md:text-[12px] lg:text-[14px] "
					>
						<p>Submit Contribution</p>
					</ProviderDashboardButtonSubmit>
				) : (
					<ProviderDashboardButtonNext onClick={handleNextPage}>NEXT</ProviderDashboardButtonNext>
				)}
			</div>
		</section>
	);
};

export default Pagination;
