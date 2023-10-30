import React, { useEffect, useState } from 'react';

import Input from 'components/عه/Input/input';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGasClaimContext } from 'hooks';

type SearchInputProps = {
	className?: string;
};

const SearchInput = ({ className = '' }: SearchInputProps) => {
	const [searchPhraseInput, setSearchPhraseInput] = useState<string>('');
	const { changeSearchPhrase } = useGasClaimContext();

	const location = useLocation();
	const navigate = useNavigate();

	const searchPhraseChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		const phrase: string = event.target.value;
		setSearchPhraseInput(phrase);
		changeSearchPhrase!(phrase);
		updateURLQuery(phrase);
	};

	const updateURLQuery = (phrase: string) => {
		const urlParams = new URLSearchParams();

		if (phrase) {
			urlParams.set('q', phrase);
		} else {
			urlParams.delete('q');
		}

		const newURL = `${location.pathname}?${urlParams.toString()}`;

		if (newURL === location.pathname) return;

		navigate(newURL);
	};

	useEffect(() => {
		const urlParams = new URLSearchParams(location.search);
		const queryParam = urlParams.get('query') ?? urlParams.get('q');
		if (queryParam) {
			setSearchPhraseInput(queryParam);
			changeSearchPhrase!(queryParam);
		}
	}, [location.search, changeSearchPhrase]);

	return (
		<div className={`search-input relative border-gray30 border-2 bg-gray40 rounded-xl ${className}`}>
			<Input
				data-testid="search-box"
				icon="search.png"
				width="100%"
				fontSize="12px"
				iconWidth="20px"
				iconHeight="20px"
				value={searchPhraseInput}
				onChange={searchPhraseChangeHandler}
				placeholder="Chain name, Currency, ID"
				pl={7}
				p={1.5}
				mb={0}
				backgroundColor="black1"
			></Input>
		</div>
	);
};

export default SearchInput;
