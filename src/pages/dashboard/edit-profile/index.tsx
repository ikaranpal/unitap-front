import Icon from 'components/basic/Icon/Icon';
import Footer from 'components/common/Footer/footer';
import { useUserProfile } from 'hooks/useUserProfile';
import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

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
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							className="border border-gray70 border-solid w-64 px-4 py-3 rounded-xl bg-gray50"
						/>
						<button className="absolute right-5 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#4BF2A2] via-[#A89FE7] to-[#E1C3F4] rounded-xl px-3 py-1">
							Save
						</button>
					</div>
				</div>

				<div className="mt-5 bg-gray20 rounded-xl p-5">
					<span>Wallets</span>
				</div>
			</div>

			<Footer />
		</div>
	);
};

export default EditProfile;
