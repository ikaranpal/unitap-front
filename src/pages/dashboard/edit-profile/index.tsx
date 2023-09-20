import Icon from 'components/basic/Icon/Icon';
import Footer from 'components/common/Footer/footer';
import { useUserProfile } from 'hooks/useUserProfile';
import { FC, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

export const Wallet: FC<{ address: string; isActive: boolean }> = ({ address, isActive }) => {
	return (
		<div className="p-4 flex bg-gray40 border-2 border-gray50 rounded-lg">
			<span>
				<img src="/assets/images/up-profile/dot.svg" alt="dot" />
			</span>
		</div>
	);
};

const EditProfile = () => {
	const { userProfile } = useUserProfile();

	const [username, setUsername] = useState('');

	useEffect(() => {
		if (userProfile?.username) {
			setUsername(username);
		}
	}, [userProfile?.username]);

	return (
		<div>
			<div className="content-wrapper">
				<div className="bg-gray20 mt-10 rounded-xl p-5 flex items-center">
					<Link to="/dashboard/up-profile" className="mr-auto">
						<Icon iconSrc="/assets/images/up-profile/back.svg" />
					</Link>
					<h4 className="mr-auto">Edit Profile</h4>
				</div>

				<div className="mt-5 p-5 flex bg-cover rounded-xl items-center bg-[url('/assets/images/up-profile/profile-landing.svg')] gap-10">
					<img src="/assets/images/landing/profile-img.svg" alt="profile-unitap" width={79.8} height={89.6} />

					<div className="relative">
						<input
							type="text"
							placeholder="username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							className="border border-gray70 border-solid w-64 px-4 py-3 rounded-xl bg-gray50"
						/>
						<button className="absolute right-5 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#4bf2a229] via-[#e1c3f44f] to-[#dd40cd4f] rounded-lg px-3 py-1">
							Save
						</button>
					</div>
				</div>

				<div className="mt-5 bg-gray20 rounded-xl p-5">
					<p>
						Wallets <small className="text-gray90">(0/10)</small>
					</p>

					<div className="mt-10">
						<div className="grid grid-cols-2 gap-4"></div>

						<button className="w-72 px-5 mt-5 py-4 flex items-center rounded-xl border-2 border-gray70" type="button">
							<span className="ml-auto text-sm">Add Wallet</span>
							<span className="ml-auto">
								<img src="/assets/images/up-profile/plus.svg" alt="plus" className="w-[16px] h-[16px]" />
							</span>
						</button>
					</div>
				</div>
			</div>

			<Footer />
		</div>
	);
};

export default EditProfile;
