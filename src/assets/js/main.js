import Vue from 'vue'

import comp_frame from './comp-frame';
import comp_list from './comp-list-contents';
import data from '../data.json';



const initVue = function(){

    //Vue.component('comp-frame', comp_frame)

    new Vue({
        el: '#app',
        components: { comp_frame,
            comp_list },

        template: `
                <div class="wrapper">
                    <comp_frame ></comp_frame>
                    <comp_list :contents-data='this.contentsData'></comp_list>
                </div>
        `,

        data() {
            return {
                lists: []
            }
        },
        created() {
            this.contentsData = data;
        }
        // render: h => h(App)
    })


}

window.initVue = initVue;

