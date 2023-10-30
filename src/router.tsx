import ScrollToTop from 'components/basic/ScrollToTop/scrollToTop';
import { Component, FC, Fragment, PropsWithChildren } from 'react';
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

const loadingRoutes: { [key: string]: { component: FC; path: string } } = {};

const providers: { [key: string]: { component: FC } } = {};

routes.forEach((route) => {
	if (route.path.endsWith('/providers')) {
		const index = route.path.indexOf('providers');

		providers[route.path.slice(0, index)] = route;
	} else if (route.path.endsWith('/loading')) {
		const index = route.path.indexOf('loading');

		loadingRoutes[route.path.slice(0, index)] = route;
	}
});

const Router: FC<PropsWithChildren> = ({ children }) => {
	return (
		<BrowserRouter>
			<ScrollToTop />
			{children}
			<Routes>
				{routes
					.filter((route) => !route.path.endsWith('/loading'))
					.map(({ path, component: Component }, key) => {
						let Wrapper: FC<PropsWithChildren> = Fragment;

						if (providers[path]) Wrapper = providers[path].component;

						return (
							<Route
								key={key}
								path={path}
								element={
									<Wrapper>
										<Component />
									</Wrapper>
								}
							/>
						);
					})}
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
