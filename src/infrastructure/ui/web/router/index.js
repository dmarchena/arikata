import VueRouter from 'vue-router';
import KataList from '../pages/KataList.vue';
import KataAdmin from '../pages/KataAdmin.vue';
import SignIn from '../pages/SignIn.vue';
import SignUp from '../pages/SignUp.vue';
import Training from '../pages/Training.vue';

const routes = [
  { path: '/signin', name: 'signin', component: SignIn },
  { path: '/signup', name: 'signup', component: SignUp },
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
  { path: '/admin/katas/new', component: KataAdmin },
  {
    path: '/admin/katas/:id',
    name: 'editKata',
    component: KataAdmin,
    props: true,
  },
  { path: '/admin/katas/', component: KataList },
  { path: '/', redirect: '/katas/' },
];

export default new VueRouter({
  mode: 'history',
  routes,
});
