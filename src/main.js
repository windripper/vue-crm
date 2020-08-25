import Vue from 'vue';
import Vuelidate from 'vuelidate';
import App from './App.vue';
import router from './router';
import store from './store';
import dateFilter from '@/filters/date.filter';
import currencyFilter from '@/filters/currency.filter';
import tooltipDirective from '@/directives/tooltip.directive.js';
import messagePlugin from '@/utils/message.plugin';
import Loader from '@/components/app/Loader';
import { auth } from './firebase';
import './registerServiceWorker';
import 'materialize-css/dist/js/materialize.min';

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(messagePlugin);

Vue.filter('date', dateFilter);
Vue.filter('currency', currencyFilter);

Vue.directive('tooltip', tooltipDirective);

Vue.component('Loader', Loader);

let app;

auth.onAuthStateChanged(() => {
    if (!app) {
        app = new Vue({
            router,
            store,
            render: h => h(App)
        }).$mount('#app');
    }
});
