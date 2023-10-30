import { GasClaimContext } from 'hooks/useChainList';
import { useContext } from 'react';

const Test = () => {
	const { chainList } = useContext(GasClaimContext);
	console.log(chainList);
	return <div>salam</div>;
};

export default Test;
