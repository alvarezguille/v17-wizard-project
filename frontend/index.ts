import { Flow } from '@vaadin/flow-frontend/Flow';
import { Router } from '@vaadin/router';

import './global-styles';

const { serverSideRoutes } = new Flow({
  imports: () => import('../target/frontend/generated-flow-imports'),
});

const routes = [
  // for client-side, place routes below (more info https://vaadin.com/docs/v15/flow/typescript/creating-routes.html)
  {
	path: '',
	component: 'main-view', 
	action: async () => { await import ('./views/main/main-view'); },
	children: [
		{
			path: '',
			component: 'hello-world-view', 
			action: async () => { await import ('./views/helloworld/hello-world-view'); }
		},
		{
			path: 'hello',
			component: 'hello-world-view', 
			action: async () => { await import ('./views/helloworld/hello-world-view'); }
		},
		{
			path: 'about',
			component: 'about-view', 
			action: async () => { await import ('./views/about/about-view'); }
		},
		{
			path: 'dashboard',
			component: 'dashboard-view', 
			action: async () => { await import ('./views/dashboard/dashboard-view'); }
		},
		{
			path: 'card-list',
			component: 'card-list-view', 
			action: async () => { await import ('./views/cardlist/card-list-view'); }
		},
		{
			path: 'master-detail',
			component: 'master-detail-view', 
			action: async () => { await import ('./views/masterdetail/master-detail-view'); }
		},
		{
			path: 'form',
			component: 'form-view', 
			action: async () => { await import ('./views/form/form-view'); }
		},
 		// for server-side, the next magic line sends all unmatched routes:
		...serverSideRoutes // IMPORTANT: this must be the last entry in the array
	]
},
];

export const router = new Router(document.querySelector('#outlet'));
router.setRoutes(routes);
