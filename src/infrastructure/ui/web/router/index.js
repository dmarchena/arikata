import VueRouter from 'vue-router';
import VKataList from '../components/VKataList.vue';
import VKataAdmin from '../components/VKataAdmin.vue';
import VSignInForm from '../components/VSignInForm.vue';

const routes = [
  { path: '/login', name: 'login', component: VSignInForm },
  { path: '/admin/katas/new', component: VKataAdmin },
  {
    path: '/admin/katas/:id',
    name: 'editKata',
    component: VKataAdmin,
    props: true,
  },
  { path: '/admin/katas/', component: VKataList },
  {
    path: '/katas/',
    name: 'katas',
    component: VKataList,
    props: (route) => ({ tag: route.query.tag }),
  },
  { path: '/', redirect: '/katas/' },
];

export default new VueRouter({
  mode: 'history',
  routes,
});
