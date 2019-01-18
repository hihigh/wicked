import Vue from 'vue';
import router from './router';

import App from './App.vue';
import content_data from '../data.json';

// common css
import '../css/style.scss';

const initVue = function(){



    new Vue({
        el: '#app',
        router,

        components :{App},
        template: '<App :contents-data="this.contentsData"/>',

        created() {
            this.contentsData = content_data;
        }
        // render: h => h(App)
    })


}

window.initVue = initVue;

