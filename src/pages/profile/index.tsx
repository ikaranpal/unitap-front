import Icon from 'components/basic/Icon/Icon';
import Footer from 'components/common/Footer/footer';
import { FC } from 'react';

const Profile = () => {
	return (
		<div>
			<div className="content-wrapper">
				<div className="rounded-lg bg-soft-primary border-2 border-gray30">
					<div className="flex p-5 items-center justify-between">
						<div className="flex items-center gap-4">
							<img src="/assets/images/landing/profile-img.svg" alt="profile-unitap" width={79.8} height={89.6} />

							<div>
								<h5>@CNA</h5>

								<div className="mt-5 text-gray80">??? XP</div>
							</div>
						</div>

						<div className="rounded-lg bg-gray10 p-1 flex items-center">
							<Icon iconSrc="/assets/images/up-profile/twitter.svg" className="mx-2 cursor-pointer" />
							<Icon iconSrc="/assets/images/up-profile/discord.svg" className="mx-2 cursor-pointer" />
							<Icon iconSrc="/assets/images/up-profile/brightid.svg" className="mx-2 mr-3 cursor-pointer" />
							<div className="px-10 cursor-pointer rounded-lg text-center bg-gray50 text-sm font-medium py-3">
								Edit Profile
							</div>
						</div>
					</div>

					<div className="my-10 py-10 relative">
						<div className="flex flex-wrap justify-between overflow-hidden opacity-20 gap-10">
							<SeasonMission className="opacity-20" title="Gnosis Explorer" xp={30} />
							<SeasonMission title="Gnosis Explorer" xp={30} />
							<SeasonMission title="Gnosis Explorer" xp={30} />
							<SeasonMission title="Gnosis Explorer" xp={30} />
							<SeasonMission title="Gnosis Explorer" xp={30} />
							<SeasonMission className="opacity-20" title="Gnosis Explorer" xp={30} />
						</div>

						<div className="absolute top-1/2 -mt-5 -translate-y-1/2 left-1/2 bg-[url('/assets/images/up-profile/big-bang.svg')] h-48 bg-contain bg-no-repeat bg-center flex flex-col items-center justify-center -translate-x-1/2">
							<h2 className="bg-gradient-to-br text-transparent font-bold bg-clip-text from-[#e863ff] via-[#e4b0fb] to-[#DFFF83]">
								"Big Bang"
							</h2>
							<p className="mt-3 font-normal text-[#ABAB9D]">The first season will come soon...</p>
						</div>
					</div>

					<div className="bg-gray20 p-10 flex items-center flex-wrap"></div>
				</div>
			</div>

			<Footer />
		</div>
	);
};

export const SeasonMission: FC<{ title: string; xp: number; className?: string }> = ({ title, xp, className }) => {
	return (
		<div className={`text-center ${className}`}>
			<Icon width="60px" iconSrc="/assets/images/up-profile/lock.svg" />
			<p className="mt-4">{title}</p>
			<div className="text-xs mt-2 font-semibold">+ {xp} XP</div>
		</div>
	);
};

export default Profile;
