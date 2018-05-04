import Vue from 'vue'
import { dateFormat } from '../utils/dateFormat'
Vue.filter('dateformat', (val, format) => {
    return dateFormat(val, format);
});
