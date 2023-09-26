import {
	ProviderDashboardButtonNext,
	ProviderDashboardButtonPrevious,
	ProviderDashboardButtonSubmit,
} from 'components/basic/Button/button';
import usePrizeOfferFormContext from 'hooks/usePrizeOfferFormContext';

interface PagInationProp {
	handleChangeFormPagePrev: () => void;
	handleNextPage: () => void;
	page: number;
	func?: string | null | boolean;
}

const Pagination = ({ handleNextPage, func }: PagInationProp) => {
	const { checkContractInfo } = usePrizeOfferFormContext();
	return (
		<section className="flex flex-col lg:flex-row w-full max-w-[452px] items-center ">
			<div className="flex flex-col flex-col-reverse sm:flex-row w-full gap-5">
				{/* {page >= 1 && (
					<ProviderDashboardButtonPrevious disabled={!page} className="w-full" onClick={handleChangeFormPagePrev}>
						Previous
					</ProviderDashboardButtonPrevious>
				)} */}
				{func === 'submit' ? (
					<ProviderDashboardButtonSubmit
						onClick={handleNextPage}
						className="text-[14px] md:text-[12px] lg:text-[14px] "
					>
						<p>Submit Contribution</p>
					</ProviderDashboardButtonSubmit>
				) : (
					<ProviderDashboardButtonNext disabled={checkContractInfo} onClick={handleNextPage}>
						NEXT
					</ProviderDashboardButtonNext>
				)}
			</div>
		</section>
	);
};

export default Pagination;
