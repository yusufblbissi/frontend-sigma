import { createRouter, createWebHistory } from 'vue-router';
import LoanForm from './components/LoanForm.vue';
import LoanList from './components/LoanList.vue';
import LoanDetails from './components/LoanDetails.vue';

const routes = [
  { path: '/', component: LoanList },
  { path: '/loan-form', component: LoanForm },
  { path: '/loan-details/:loanId', name: 'loan-details', component: LoanDetails },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
