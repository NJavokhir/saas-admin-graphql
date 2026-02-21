import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/users',
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/DashboardView.vue')
  },
  {
    path: '/users',
    name: 'users',
    component: () => import('../views/UsersView.vue')
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('../views/ProjectsView.vue')
  },
  {
    path: '/tasks',
    name: 'tasks',
    component: () => import('../views/TasksView.vue')
  },
  {
    path: '/comments',
    name: 'comments',
    component: () => import('../views/CommentsView.vue')
  },
  {
    path: '/users/:id',
    name: 'user-details',
    component: () => import('../views/UserDetailsView.vue')
  },
  { path: '/:pathMatch(.*)*', redirect: '/dashboard' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
