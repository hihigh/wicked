import Vue from 'vue';
import Router from 'vue-router';

import About from './About';
import Main from './Main';

import comp_list from './comp-list-contents';
import comp_content from './comp-content';

Vue.use(Router);

export default new Router({
    mode: 'history',
    // base: process.env.BASE_URL,
    routes: [
        { path: '/', name:'main', component: Main},
        /*{ path: '/',
            component: Main,

            // 중첩된 라우트는 children 속성으로 하위 라우트를 정의할 수 있다.
            children: [
                { path: '/', component: comp_list },
                { path: ':id', component: comp_content }
            ]
        }

        ,

        { path: '/about', name:'about', component: About},
        { path: '*', name:'404', component: { template: '<div>Not Found</div>'} },*/




    ],
});

