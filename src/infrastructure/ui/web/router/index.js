import VueRouter from 'vue-router';
import Home from '../pages/Home.vue';
const KataList = () =>
  import(/* webpackChunkName: "kata-list" */ '../pages/KataList.vue');
const KataAdmin = () =>
  import(/* webpackChunkName: "kata-admin" */ '../pages/KataAdmin.vue');
const SigningPage = () =>
  import(/* webpackChunkName: "signing-page" */ '../pages/SigningPage.vue');
const Training = () =>
  import(/* webpackChunkName: "training" */ '../pages/Training.vue');

const routes = [
  {
    path: '/signin',
    name: 'signin',
    component: SigningPage,
    props: (route) => ({
      signedOut: route.query.from === 'signout',
      newUser: false,
    }),
  },
  {
    path: '/signup',
    name: 'signup',
    component: SigningPage,
    props: { newUser: true },
  },
  {
    path: '/katas/',
    name: 'katas',
    component: KataList,
    props: (route) => ({ tag: route.query.tag, filterByUser: false }),
  },
  {
    path: '/trainings/',
    name: 'trainings',
    component: KataList,
    props: { filterByUser: true },
  },
  {
    path: '/training/:id?',
    name: 'training',
    component: Training,
    props: (route) => ({ id: route.params.id, kataId: route.query.kataId }),
  },
  { path: '/admin/katas/new', name: 'newKata', component: KataAdmin },
  {
    path: '/admin/katas/:id',
    name: 'editKata',
    component: KataAdmin,
    props: true,
  },
  { path: '/admin/katas/', component: KataList },
  { path: '/', component: Home },
];

export default new VueRouter({
  mode: 'history',
  routes,
});
