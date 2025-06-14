import Game from '@/components/pages/Game'

export const routes = [
  {
    id: 'game',
    label: 'Game',
    path: '/',
    component: Game
  }
];

export const routeArray = Object.values(routes);
export default routes;