import React, {PropsWithChildren, useState} from 'react';
import {APIError, APIErrorsSource} from "../types";


const ErrorsMessagesContext = React.createContext<{
	errors: APIError[],
	addError: (error: APIError) => void,
	getError: (source: APIErrorsSource) => APIError | null,
	deleteError: (source: APIErrorsSource) => void,
	messages: APIError[],
	addMessage: (message: APIError) => void
	getMessage: (source: APIErrorsSource) => APIError | null,
	deleteMessage: (source: APIErrorsSource) => void
}>({
	errors: [],
	addError: (error: APIError) => {
	},
	getError: (source: APIErrorsSource) => null,
	deleteError: (source: APIErrorsSource) => {
	},
	messages: [],
	addMessage: (message: APIError) => {
	},
	getMessage: (source: APIErrorsSource) => null,
	deleteMessage: (source: APIErrorsSource) => {
	}
});

const ErrorsMessagesProvider = ({children}: PropsWithChildren<{}>) => {
	const [errors, setErrors] = useState<APIError[]>([]);
	const [messages, setMessages] = useState<APIError[]>([]);

	const addMessage = (message: APIError) => {
		setMessages([...messages, message]);
	}

	const deleteMessage = (source: APIErrorsSource) => {
		setMessages(messages.filter((message) => message.source !== source));
	}

	const getMessage = (source: APIErrorsSource) => {
		return messages.find((message) => message.source === source) || null;
	}

	const addError = (error: APIError) => {
		setErrors([...errors, error]);
	}

	const getError = (source: APIErrorsSource) => {
		return errors.find((error) => error.source === source) || null;
	}

	const deleteError = (source: APIErrorsSource) => {
		setErrors(errors.filter((error) => error.source !== source));
	}

	return (
		<ErrorsMessagesContext.Provider value={{
			errors,
			addError,
			getError,
			deleteError,
			messages,
			addMessage,
			getMessage,
			deleteMessage
		}}>{children}</ErrorsMessagesContext.Provider>
	);
};

export {ErrorsMessagesContext, ErrorsMessagesProvider};