import ScrollToTop from 'components/basic/ScrollToTop/scrollToTop';
import { Component, FC, PropsWithChildren } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MetaData } from 'types';

const pages = import.meta.glob<{ default?: FC; metadata?: MetaData }>('/src/pages/**/*.tsx', { eager: true });

const routes = Object.entries(pages)
	.filter(([path, component]) => !path.includes('components') && !!component.default)
	.map(([path, component]) => {
		const route = path
			.replace(/\/src\/pages|index|\.tsx$/g, '')
			.replace(/\[\.{3}.+\]/, '*')
			.replace(/\[(.+)\]/, ':$1');

		return { path: route, component: component.default as FC, metadata: component.metadata };
	});

const RouteComponentWrapper: FC<PropsWithChildren & { metadata: MetaData }> = () => {
	return <Route />;
};

const Router: FC<PropsWithChildren> = ({ children }) => {
	return (
		<BrowserRouter>
			<ScrollToTop />
			{children}
			<Routes>
				{routes.map(({ path, component: Component }, key) => (
					<Route key={key} path={path} element={<Component />} />
				))}
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
