import { FC, useContext, useMemo, useRef, useState } from 'react';
import {
	BrightConnectedButton,
	BrightPrimaryButton,
	GradientOutlinedButton,
	LightOutlinedButton,
} from 'components/basic/Button/button';
import { UserProfileContext } from 'hooks/useUserProfile';
import { shortenAddress } from 'utils';
import { DesktopNav, MobileNav } from './navbar.style';
import { Link } from 'react-router-dom';
import RoutePath from 'routes';
import useWalletActivation from 'hooks/useWalletActivation';
import Icon from 'components/basic/Icon/Icon';
import NavbarDropdown from './navbarDropdown';
// import { useUnitapPass } from '../../../hooks/pass/useUnitapPass';
import { GlobalContext } from 'hooks/useGlobalContext';
import { useWalletAccount, useWalletConnect, useWalletDisconnect, useWalletNetwork } from 'utils/hook/wallet';
import { useOutsideClick } from 'hooks/dom';

const WalletsImage: { [key: string]: string } = {
	metaMask: '/assets/images/modal/metamask-icon.svg',
	walletConnect: '/assets/images/navbar/walletconnect.svg',
	coinbaseWallet: '/assets/images/navbar/coinbase.svg',
};

const Navbar = () => {
	const { tryActivation } = useWalletActivation();

	const { openBrightIdModal } = useContext(GlobalContext);
	const { address, isConnected } = useWalletAccount();
	const { chain } = useWalletNetwork();

	const isUserConnected = !!isConnected;
	const { userProfile } = useContext(UserProfileContext);

	const connectBrightButtonLabel = useMemo(() => {
		if (isConnected) {
			if (userProfile) {
				return userProfile.isMeetVerified ? 'Connected' : 'Login with BrightID';
			}
			return 'Login with BrightID';
		}
		return 'Login with BrightID';
	}, [isConnected, userProfile]);

	return (
		<div className="navbar w-full sticky flex items-center top-0 z-100 bg-gray10 py-3 px-8">
			<Link to={RoutePath.LANDING}>
				<Icon alt="unitap" iconSrc="assets/images/navbar/logo.svg" width="auto" height="40px" />
			</Link>

			{process.env.REACT_APP_IS_CYPRESS === 'true' && <span data-testid="chain-id">{chain?.id}</span>}

			<DesktopNav>
				{/* <RenderUnipassCount /> */}
				<RenderNavbarConnectionStatus />
				<RenderNavbarDropdown />
			</DesktopNav>

			<MobileNav>
				<input className="checkbox" type="checkbox" name="" id="" />
				<div className="hamburger-lines">
					<span className="line line1"></span>
					<span className="line line2"></span>
					<span className="line line3"></span>
				</div>
				<div className="menu-items">
					{userProfile?.isMeetVerified ? (
						<BrightConnectedButton
							iconLeft="assets/images/navbar/navbar_bright_logo_v1.3.svg"
							fontSize="12px"
							fontWeight="500"
							iconLeftWidth={16}
							iconLeftHeight={16}
							mb={2}
						>
							{connectBrightButtonLabel}
						</BrightConnectedButton>
					) : (
						<BrightPrimaryButton
							mb={2}
							fontSize="12px"
							fontWeight="800"
							minWidth="150px"
							onClick={() => openBrightIdModal()}
						>
							{connectBrightButtonLabel}
						</BrightPrimaryButton>
					)}
					{isUserConnected ? (
						<LightOutlinedButton>{shortenAddress(address)}</LightOutlinedButton>
					) : (
						<GradientOutlinedButton onClick={tryActivation}>Connect Wallet</GradientOutlinedButton>
					)}
				</div>
			</MobileNav>
		</div>
	);
};

// const RenderUnipassCount = () => {
// 	const { balance: unitapPassBalance } = useUnitapPass();
// 	const { isConnected } = useWalletAccount();

// 	return (
// 		<div className="up-count flex p-2 pr-3 mr-3 h-8 bg-gray40 items-center rounded-lg">
// 			{isConnected ? (
// 				<>
// 					<Icon
// 						alt="unitap-pass"
// 						className="mr-5"
// 						iconSrc="assets/images/navbar/up-icon.svg"
// 						width="auto"
// 						height="23px"
// 					/>
// 					<p className="text-white text-xs font-bold">
// 						{unitapPassBalance?.toNumber() || 0} PASS
// 						{unitapPassBalance?.toNumber() ? (unitapPassBalance?.toNumber() > 1 ? 'ES' : '') : ''}
// 					</p>
// 				</>
// 			) : (
// 				<>
// 					<Icon
// 						className="mr-5"
// 						alt="unitap-pass-disabled"
// 						iconSrc="assets/images/navbar/up-icon-disable.svg"
// 						width="auto"
// 						height="23px"
// 					/>
// 					<p className="text-gray100 text-xs font-bold pl-2">-</p>
// 				</>
// 			)}
// 		</div>
// 	);
// };

const RenderNavbarDropdown = () => {
	const [isDropdownVisible, setIsDropdownVisible] = useState(false);

	return (
		<span className="ml-auto cursor-pointer" onClick={() => setIsDropdownVisible(!isDropdownVisible)}>
			<Icon iconSrc="/assets/images/navbar/navbar-dropdown-icon.svg" width="31px" height="31px" />
			{isDropdownVisible && <NavbarDropdown className="navbar__dropdown__component" />}
		</span>
	);
};

const RenderNavbarConnectionStatus = () => {
	const { isConnected } = useWalletAccount();

	const { userProfile } = useContext(UserProfileContext);
	const isBrightIdConnected = !!userProfile;

	const [dropDownActive, setDropDownActive] = useState(false);

	const EVMWallet = userProfile?.wallets.find((wallet) => wallet.walletType === 'EVM');

	const divRef = useRef<HTMLDivElement>(null);

	useOutsideClick(divRef, () => setDropDownActive(false));

	return (
		<div ref={divRef} className="relative">
			<div
				onClick={setDropDownActive.bind(null, !dropDownActive)}
				className="cursor-pointer ml-5 flex rounded-lg h-9 items-center justify-between bg-gray40 pr-0.5 mr-3"
			>
				<div className="text-xs font-normal flex items-center text-white p-3">
					<span className="ml-2 text-sm">@{userProfile?.username}</span>

					<span className="text-gray90 ml-8">level: -</span>
				</div>

				{!isBrightIdConnected ? (
					<RenderNavbarLoginBrightIdButton />
				) : !isConnected ? (
					!EVMWallet ? (
						<RenderNavbarConnectWalletButton />
					) : (
						<RenderNavbarWalletAddress active={false} />
					)
				) : (
					<RenderNavbarWalletAddress active={true} />
				)}
			</div>
			{dropDownActive && <ProfileDropdown />}
		</div>
	);
};

const WalletItem = ({ wallet, isActive }: { wallet: string; isActive?: boolean }) => {
	const onDisconnect = useWalletDisconnect();

	return (
		<div className={'flex hover:text-white text-sm my-5 items-center ' + (isActive ? 'text-white' : 'text-gray90')}>
			<span className={(isActive ? 'bg-white' : 'bg-gray90') + ' w-2 h-2 rounded-full'}></span>
			<span className="ml-3">{shortenAddress(wallet)}</span>
			<img src="/assets/images/navbar/copy.svg" className="ml-3" alt="copy" />
			<img src="/assets/images/navbar/link.svg" className="ml-4" alt="link" />

			{isActive && (
				<button onClick={() => onDisconnect.disconnect()} className="ml-auto bg-gray50 rounded-lg px-5 py-1">
					Disconnect
				</button>
			)}
		</div>
	);
};

const ProfileDropdown: FC = () => {
	const { userProfile } = useContext(UserProfileContext);

	const { address } = useWalletAccount();
	const { connect, connectors } = useWalletConnect();

	const onLogout = () => {
		localStorage.setItem('userToken', '');

		window.location.reload();
	};

	return (
		<div className="absolute left-5 rounded-lg bg-cover text-white bg-gray30 z-10 top-full mt-2">
			<div className="bg-[url('/assets/images/navbar/dropdown-bg.svg')] h-[260px] w-[385px]">
				<div className="p-3 rounded-t-xl flex items-center justify-between bg-[url('/assets/images/navbar/gradient-unitap.svg')] font-normal text-sm">
					<button className="relative text-left px-2 h-8 flex items-center w-40 z-10 text-white">
						<img className="absolute inset-0 -z-10" src="/assets/images/navbar/logout-button.svg" alt="" />
						<p className="mb-1 font-semibold">@ {userProfile?.username}</p>
						<img src="/assets/images/navbar/arrow-right.svg" className="ml-auto mr-6 mb-1" alt="arrow-right" />
					</button>

					<button onClick={onLogout} className="rounded-lg relative text-xs z-10 px-5 py-2">
						<div className="absolute rounded-lg -z-10 inset-0 bg-gray20 opacity-50" />
						Log Out
					</button>
				</div>
				<div className="px-4 overflow-y-auto h-[194px]">
					{userProfile?.wallets.map((wallet, key) => (
						<WalletItem wallet={wallet.address} isActive={address === wallet.address} key={key} />
					))}

					<div className="mt-10 text-right text-xs flex items-center gap-5 flex-wrap justify-between">
						{connectors.map((item, key) => (
							<button
								disabled={!item.ready}
								className="text-center cursor-pointer"
								onClick={() => connect({ connector: item })}
								key={key}
							>
								<img
									src={WalletsImage[item.id] ?? '/assets/images/modal/claim_spaceman.svg'}
									className="w-10 h-10 object-contain mx-auto"
									alt=""
								/>
								<p className="m-1">{item.id}</p>
							</button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

const RenderNavbarLoginBrightIdButton = () => {
	const { openBrightIdModal } = useContext(GlobalContext);
	const { userProfileLoading } = useContext(UserProfileContext);

	return (
		<>
			<button
				className="btn btn--sm btn--bright !w-36 h-[28px] !py-0 align-baseline"
				data-testid="brightid-show-modal"
				onClick={() => !userProfileLoading && openBrightIdModal()}
			>
				{userProfileLoading ? 'Connecting...' : 'Connect BrightID'}
			</button>
		</>
	);
};

const RenderNavbarConnectWalletButton = () => {
	const { tryActivation } = useWalletActivation();

	return (
		<>
			<button
				data-testid="wallet-connect"
				className="btn btn--sm btn--primary !w-36 h-[28px] !py-0 align-baseline"
				onClick={(e) => {
					e.stopPropagation();
					// tryActivation();
				}}
			>
				Connect Wallet
			</button>
		</>
	);
};

const RenderNavbarWalletAddress = ({ active }: { active: boolean }) => {
	const { connect, connectors } = useWalletConnect();
	const { userProfile } = useContext(UserProfileContext);
	const EVMWallet = userProfile?.wallets.find((wallet) => wallet.walletType === 'EVM');

	const { address: account, isConnected, connector } = useWalletAccount();

	let address = isConnected ? account : EVMWallet?.address;

	if (!address) return null;

	return (
		<>
			<button
				data-testid="wallet-address"
				className={`btn btn--sm btn--address ${active && 'btn--address--active'} !w-36 h-[28px] !py-0 align-baseline`}
				onClick={() => connect({ connector: connectors[0] })}
			>
				{shortenAddress(address)}
			</button>
		</>
	);
};

export default Navbar;
