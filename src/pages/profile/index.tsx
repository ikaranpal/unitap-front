import Footer from 'components/common/Footer/footer';

const Profile = () => {
	return (
		<div>
			<div className="content-wrapper">
				<div className="rounded-lg p-5 bg-soft-primary border-2 border-gray30">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4">
							<img src="/assets/images/landing/profile-img.svg" alt="profile-unitap" width={79.8} height={89.6} />

							<div>
								<h5>@CNA</h5>

								<div className="mt-5 text-gray80">??? XP</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<Footer />
		</div>
	);
};

export default Profile;
