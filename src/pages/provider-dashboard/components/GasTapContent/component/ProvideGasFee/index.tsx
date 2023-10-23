import { useWeb3React } from '@web3-react/core';
import { ClaimButton, ProviderDashboardButtonSubmit } from 'components/basic/Button/button';
import Icon from 'components/basic/Icon/Icon';
import Modal from 'components/common/Modal/modal';
import { parseEther } from 'ethers/lib/utils';
import { ClaimContext } from 'hooks/useChainList';
import { useGasTapProviderContext } from 'hooks/usePrizeOfferFormContext';
import useSelectChain from 'hooks/useSelectChain';
import useWalletActivation from 'hooks/useWalletActivation';
import FundTransactionModal from 'pages/fund/components/FundTransactionModal/FundTransactionModal';
import SelectChainModal from 'pages/fund/components/SelectChainModal/selectChainModal';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Chain } from 'types';
import { getChainIcon } from 'utils';
import { fromWei } from 'utils/numbers';
import { calculateGasMargin, USER_DENIED_REQUEST_ERROR_CODE } from 'utils/web3';

const ProvideGasFee = () => {
	const { chainList } = useContext(ClaimContext);
	const { chainId, provider, account } = useWeb3React();
	const active = !!account;
	const { tryActivation } = useWalletActivation();

	const [selectedChain, setSelectedChain] = useState<Chain | null>(null);
	const [balance, setBalance] = useState<string | number>('');

	const location = useLocation();

	useEffect(() => {
		if (chainList.length > 0 && !selectedChain) {
			const urlParam = new URLSearchParams(location.search).get('chain');

			if (urlParam) {
				const chain = chainList.find((chain) => chain.pk === Number(urlParam));
				if (chain) {
					setSelectedChain(chain);
				}
			} else {
				setSelectedChain(chainList[0]);
			}
		}
	}, [chainList, selectedChain, location.search]);

	const addAndSwitchToChain = useSelectChain();

	const [fundAmount, setFundAmount] = useState<string>('');

	const [modalState, setModalState] = useState(false);
	const [fundTransactionError, setFundTransactionError] = useState('');
	const [txHash, setTxHash] = useState('');
	const isRightChain = useMemo(() => {
		if (!active || !chainId || !selectedChain) return false;
		return chainId === Number(selectedChain.chainId);
	}, [selectedChain, active, chainId]);

	const handleTransactionError = useCallback((error: any) => {
		if (error?.code === USER_DENIED_REQUEST_ERROR_CODE) return;
		const message = error?.data?.message || error?.error?.message;
		if (message) {
			if (message.includes('insufficient funds')) {
				setFundTransactionError('Error: Insufficient Funds');
			} else {
				setFundTransactionError(message);
			}
		} else {
			setFundTransactionError('Unexpected error. Could not estimate gas for this transaction.');
		}
	}, []);

	const [submittingFundTransaction, setSubmittingFundTransaction] = useState(false);

	const loading = useMemo(() => {
		if (submittingFundTransaction) return true;
		if (!active) return false;
		return !chainId || !selectedChain || !account;
	}, [account, active, chainId, selectedChain, submittingFundTransaction]);

	const handleSendFunds = useCallback(async () => {
		if (!active) {
			await tryActivation();
			return;
		}
		if (!chainId || !selectedChain || !account || loading) return;
		if (!isRightChain) {
			await addAndSwitchToChain(selectedChain);
			return;
		}
		if (!Number(fundAmount)) {
			alert('Enter fund amount');
			return;
		}
		if (!provider) return;
		let tx = {
			from: account,
			to: selectedChain.fundManagerAddress,
			value: parseEther(fundAmount),
		};

		setSubmittingFundTransaction(true);

		const estimatedGas = await provider.estimateGas(tx).catch((err: any) => {
			return err;
		});

		if ('error' in estimatedGas || 'code' in estimatedGas) {
			handleTransactionError(estimatedGas);
			setSubmittingFundTransaction(false);
			return;
		}

		provider
			.getSigner()
			.sendTransaction({
				...tx,
				...(estimatedGas ? { gasLimit: calculateGasMargin(estimatedGas) } : {}),
				// gasPrice /// TODO add gasPrice based on EIP 1559
			})
			.then((tx) => {
				setTxHash(tx.hash);
			})
			.catch((err) => {
				handleTransactionError(err);
			})
			.finally(() => {
				setSubmittingFundTransaction(false);
			});
	}, [
		active,
		chainId,
		selectedChain,
		account,
		loading,
		isRightChain,
		fundAmount,
		provider,
		tryActivation,
		addAndSwitchToChain,
		handleTransactionError,
	]);

	const closeModalHandler = () => {
		setFundTransactionError('');
		setTxHash('');
		setModalState(false);
	};

	const fundActionButtonLabel = useMemo(() => {
		if (!active) {
			return 'Connect Wallet';
		}
		if (loading) {
			return 'Loading...';
		}
		return !isRightChain ? 'Switch Network' : 'Submit Contribution';
	}, [active, isRightChain, loading]);

	useEffect(() => {
		if (!isRightChain || !account) {
			setBalance('');
			return;
		}

		provider?.getBalance(account).then((res) => {
			setBalance(fromWei(res.toString()).slice(0, 6));
		});
	}, [isRightChain, account, provider]);

	return (
		<div className="bg-gray20 rounded-xl p-12 relative h-[10hv] overflow-hidden text-white flex flex-col items-center text-center">
			<div className="absolute top-[-10.5em] left-[-24.5em] z-0">
				<Icon iconSrc="./assets/images/fund/provide-gas-fee-planet.svg" />
			</div>
			<div className="z-10">
				<Icon iconSrc="./assets/images/provider-dashboard/gasTap/battery.png" />
			</div>
			<div className="w-full max-w-[452px]">
				<div className="z-10 mt-5">
					<p className="text-[14px] font-semibold mb-2">Provide Gas Fee</p>
					<p className="text-gray100 text-[12px] font-medium mb-1">99% of fund amount goes for Claim Gas Fees.</p>
					<p className="text-gray100 text-[12px] font-medium">1% of fund amount goes for Unitap development.</p>
				</div>

				<div className="select-box w-full mt-4">
					<div
						className="select-box__token flex justify-between px-4 py-2 items-center h-[44px] rounded-[12px] w-full cursor-pointer bg-gray40 border border-gray50 hover:bg-gray60 mb-4"
						onClick={() => setModalState(true)}
					>
						{selectedChain ? (
							<div className="flex items-center gap-3">
								<Icon iconSrc={getChainIcon(selectedChain)} width="24px" height="24px" />
								<p className="select-box__info__coin-symbol text-white text-xs font-semibold">
									{selectedChain?.symbol}
								</p>
							</div>
						) : (
							<span className="w-8 h-8 rounded-full bg-gray50"></span>
						)}
						<Icon iconSrc="assets/images/fund/arrow-down.png" width="14px" height="auto" />
					</div>
					<div className="select-box__info w-full flex flex-col justify-between px-4 py-2 rounded-xl bg-gray40">
						<div className="select-box__info__top w-full flex items-center justify-between mb-2">
							<p className="select-box__info__coin-symbol text-white text-xs font-semibold">{selectedChain?.symbol}</p>
							{!!balance && (
								<p
									onClick={() => setFundAmount(balance.toString())}
									className="select-box__info__coin-balance text-gray100 text-xs cursor-pointer hover:text-primary-light font-semibold"
								>
									Balance: {balance + ' ' + selectedChain?.symbol}{' '}
								</p>
							)}
						</div>
						<div className="select-box__info__amount w-full flex">
							<input
								className="fund-input w-full text-xl bg-transparent text-white"
								type="number"
								step="0.001"
								min="0"
								autoFocus={true}
								placeholder="Enter Amount"
								value={fundAmount}
								onChange={(e) => setFundAmount(e.target.value)}
							/>
							<div
								onClick={() => setFundAmount(balance.toString())}
								className="bg-gray20 border border-gray100 text-gray100 text-[12px] flex items-center w-[52px] h-[28px] rounded-xl justify-center cursor-pointer"
							>
								Max
							</div>
						</div>
					</div>
				</div>

				<Modal titleLeft="Select Chain" isOpen={modalState} size="medium" closeModalHandler={closeModalHandler}>
					<SelectChainModal
						closeModalHandler={closeModalHandler}
						selectedChain={selectedChain}
						setSelectedChain={setSelectedChain}
					></SelectChainModal>
				</Modal>

				<ClaimButton
					height="3.5rem"
					className="!w-full mt-5"
					fontSize="20px"
					onClick={handleSendFunds}
					disabled={!Number(fundAmount) && isRightChain && active}
					data-testid="fund-action"
				>
					{fundActionButtonLabel}
				</ClaimButton>

				<Modal
					title="Provide Gas Fee"
					isOpen={!!fundTransactionError || !!txHash}
					closeModalHandler={closeModalHandler}
				>
					<FundTransactionModal
						fundAmount={fundAmount}
						closeModalHandler={closeModalHandler}
						provideGasFeeError={fundTransactionError}
						txHash={txHash}
						selectedChain={selectedChain}
					/>
				</Modal>
			</div>
		</div>
	);
};

export default ProvideGasFee;
