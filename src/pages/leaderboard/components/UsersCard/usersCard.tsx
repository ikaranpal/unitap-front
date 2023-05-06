import React from 'react';
import { UsersCardProps } from 'types';
import Icon from 'components/basic/Icon/Icon';

const UsersCard = ({ user }: UsersCardProps) => {
  const { pk, image, userName, level, walletAddress, totalGas, twitterLink, instagramLink } = user;
  return (
    <div className="pt-4">
      <div className="user-card__wrap bg-gray30 justify-between rounded-2xl flex flex-col md:flex-row xl:flex-row">
        <div className="flex flex-col md:flex-row xl:flex-row rounded-2xl overflow-hidden">
          <div className="text-[12px] text-white font-bold flex items-center justify-center px-2 bg-gray50 user-card__id w-full md:w-[40px] h-[40px] md:h-[auto]">
            <div>#{pk}</div>
          </div>
          <Icon iconSrc={image} width="46px" height="52px" className="p-2 px-4" />
          <div className="flex flex-col gap-3 p-2 mr-10 text-[12px] items-center  mr-0">
            <div className="text-white font-bold user-card__name">{userName}</div>
            <div className="text-gray100">Level {level}</div>
          </div>
          <div className="flex flex-col gap-3 p-2 mr-10 text-[12px] items-center mr-0">
            <div className="text-gray80">Wallet Address</div>
            <div className="text-white flex gap-2 xl:justify-between">
              <div>{walletAddress}</div>
              <div>
                <Icon iconSrc="assets/images/leaderboard/ic_copy.svg" width="12px" height="14px" hoverable />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 p-2 mr-8 items-center mr-0">
            <div className="text-gray80 text-[12px]">Total Gas Provided</div>
            <div className="text-white text-[14px]">${totalGas}</div>
          </div>
          <div className="flex flex-col gap-2 p-2 items-center mr-0">
            <div className="text-gray80 text-[12px]">Interacted Chains</div>
            <div className="flex xl:justify-between items-center gap-3">
              <Icon iconSrc="assets/images/leaderboard/ic_arbitrum.svg" width="24px" height="24px" hoverable />
              <Icon iconSrc="assets/images/leaderboard/chain1.svg" width="24px" height="24px" hoverable />
              <Icon iconSrc="assets/images/leaderboard/telos.svg" width="24px" height="24px" hoverable />
            </div>
          </div>
        </div>
        <div className="flex xl:justify-between items-center gap-6 m-4 z-index-master justify-center ">
          {instagramLink && (
            <Icon
              iconSrc="assets/images/social/instagram.svg"
              width="16px"
              height="20px"
              onClick={() => window.open(instagramLink, '_blank')}
              hoverable
            />
          )}
          {twitterLink && (
            <Icon
              iconSrc="assets/images/social/twitter.svg"
              width="16px"
              height="20px"
              onClick={() => window.open(twitterLink, '_blank')}
              hoverable
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersCard;
