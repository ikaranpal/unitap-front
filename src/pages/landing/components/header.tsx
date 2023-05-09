import React, {useContext} from "react";
import {UserProfileContext} from "../../../hooks/useUserProfile";

const Header = () => {
	const {userProfile} = useContext(UserProfileContext);

	return (
		<section
			id="home-header"
			className={
				'uni-card flex flex-col md:flex-row gap-4 after:rounded-2xl after:bg-home-header-texture h-52 text-white justify-center text-center md:text-left md:p-4 md:pl-6 overflow-hidden'
			}
		>
			{userProfile && <span className="home-header__left flex-1 flex flex-row gap-5">
				<img src="/assets/images/landing/profile-avatar.svg" className="w-14 h-16" alt='avatar'/>
				<span className='flex flex-col'>
					<p className='username font-bold mb-5'>@{userProfile.token}</p>
					<p className='level text-xs text-gray90'>Level: [Coming soon]</p>
				</span>
			</span>}
			<span className="home-header__right flex-1 text-right">
				<img src='/assets/images/landing/uni-logo.svg' className={'w-40 ml-auto mb-3 mr-5'} alt={'logo'}/>
				<h4 className='text-text-secondary font-bold'>
					The gateway to web3.
				</h4>
			</span>
		</section>
	)
}

export default Header;