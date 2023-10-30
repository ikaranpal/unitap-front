import ScrollToTop from 'components/basic/ScrollToTop/scrollToTop';
import { Component, FC, PropsWithChildren, useEffect } from 'react';
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

const DocumentTitle: FC<MetaData> = ({ description, title }) => {
	useEffect(() => {
		if (title) {
			document.title = title;
		} else {
			document.title = 'Unitap';
		}

		const metaDescriptionTag = document.querySelector('meta[name="description"]');
		if (metaDescriptionTag && description) {
			metaDescriptionTag.setAttribute('content', description);
		} else if (description) {
			const newMetaTag = document.createElement('meta');
			newMetaTag.name = 'description';
			newMetaTag.content = description;
			document.head.appendChild(newMetaTag);
		}

		return () => {
			document.title = 'Unitap';
			const metaDescriptionTag = document.querySelector('meta[name="description"]');
			if (metaDescriptionTag) {
				metaDescriptionTag.remove();
			}
		};
	}, [description, title]);

	return null;
};

const Router: FC<PropsWithChildren> = ({ children }) => {
	return (
		<BrowserRouter>
			<ScrollToTop />
			{children}
			<Routes>
				{routes.map(({ path, component: Component, metadata }, key) => (
					<Route
						key={key}
						path={path}
						element={
							<>
								<DocumentTitle description={metadata?.description} title={metadata?.title} />
								<Component />
							</>
						}
					/>
				))}
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
