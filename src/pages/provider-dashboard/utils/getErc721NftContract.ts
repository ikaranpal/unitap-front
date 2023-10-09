import { ProviderDashboardFormDataProp } from "types";
import { Web3Provider } from '@ethersproject/providers';
import Erc721_ABI from '../../../abis/Erc721.json';
import { getContract } from "utils";


export const getErc721NftContract = async (data: ProviderDashboardFormDataProp, account: string, provider: Web3Provider, setCheckContractInfo: any, setIsContractAddressValid: any, setData: any, setIsOwnerOfNft: any, setIsNftApproved:any) => {
	if (provider && account && data.nftTokenId && data.nftContractAddress) {
		const erc721Contract = getContract(data.nftContractAddress, Erc721_ABI, provider);
		try {
			const ownerOf = await erc721Contract.ownerOf(data.nftTokenId);
			if (ownerOf.toLocaleLowerCase() !== account.toLocaleLowerCase()) {
				setIsOwnerOfNft(false);
				setCheckContractInfo(false);
				return;
			}
		} catch (e: any) {
			if (!e.message.includes('ERC721: invalid token ID')) {
				setIsOwnerOfNft(false);
				setCheckContractInfo(false);
				setIsContractAddressValid(false);
			} else {
				setIsOwnerOfNft(false);
				setCheckContractInfo(false);
			}
			return;
		}
		setIsOwnerOfNft(true);
		if (erc721Contract) {
			Promise.all([
				erc721Contract.name(),
				erc721Contract.symbol(),
				erc721Contract.balanceOf(account),
				erc721Contract.tokenURI(data.nftTokenId),
				erc721Contract.getApproved(data.nftTokenId),
			]).then(([r1, r2, r3, r4, r5]) => {
				setIsNftApproved(r5.toLocaleLowerCase() == data.selectedChain.erc721PrizetapAddr.toLocaleLowerCase());
				setData((prevData: any) => ({
					...prevData,
					nftName: r1,
					nftSymbol: r2,
					userNftBalance: r3?.toString(),
					nftTokenUri: r4,
				}));
				setCheckContractInfo(false);
			});
		}
	}
};