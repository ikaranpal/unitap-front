import { ClaimButton } from 'components/basic/Button/button';
import useWalletActivation from 'hooks/useWalletActivation';
import { FC, useRef, useEffect } from 'react';
import { DropIconWrapper } from '../claimModal.style';

// @ts-ignore
import ModelViewer from '@metamask/logo';

const WalletNotConnectedBody: FC<{ chainPk: number }> = ({ chainPk }) => {
	const metamaskLogo = useRef<HTMLDivElement>(null);

	const { tryActivation } = useWalletActivation();

	useEffect(() => {
		if (!metamaskLogo.current) return;

		const viewer = ModelViewer({
			pxNotRatio: true,
			width: 200,
			height: 200,
			followMouse: true,
			slowDrift: false,
		});

		metamaskLogo.current.innerHTML = '';

		metamaskLogo.current.appendChild(viewer.container);

		return () => {
			viewer.stopAnimation();
		};
	}, [metamaskLogo]);

	return (
		<>
			<DropIconWrapper className="text-center flex items-center" data-testid={`chain-claim-wallet-not-connected`}>
				<div className="flex items-center justify-center" ref={metamaskLogo}></div>
			</DropIconWrapper>

			<p className="text-gray100 font-semibold text-left text-sm mb-2 mt-5 w-full">Don’t have a metamask wallet?</p>

			<p className="text-gray90 text-sm mb-5">
				Go to{' '}
				<a href="https://metamask.io" rel="noreferrer" className="text-orange" target="_blank">
					Metamask.io
				</a>{' '}
				and create your first wallet and come back to start with web3
			</p>

			<ClaimButton
				onClick={tryActivation}
				width="100%"
				fontSize="16px"
				className="!w-full"
				data-testid={`chain-claim-action-${chainPk}`}
			>
				<p>Connect Wallet</p>
			</ClaimButton>
		</>
	);
};

export default WalletNotConnectedBody;
