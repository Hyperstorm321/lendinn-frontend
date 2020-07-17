import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from './App.vue'
import vuetify from './plugins/vuetify'
//Views
import Index from './components/Index.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Home from './components/Home.vue'
import AccountSetting from './components/dashboard_storage/AccountSetting.vue'
import ManageProperties from './components/dashboard_storage/ManageProperties.vue'
import Reports from './components/dashboard_storage/Reports.vue'
import ReportsLord from './components/dashboard_storage/ReportsLord.vue'



Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(VueRouter)

const store = new Vuex.Store(
    {
        state: {
          authenticated:false,
        },
        mutations: {
          setAuthentication(state,status) {
            state.authenticated = status
          }
        }
    }
);

const router = new VueRouter(
    {
      mode: 'history',
      routes:[
        {
          path: '/',
          redirect:{
            name: 'index'
          }
        },
        {
          path: '/',
          name: 'index',
          component: Index
        },
        {
          path: '/login',
          name: 'login',
          component: Login
        },
        {
          path: '/register',
          name: 'register',
          component: Register
        },
        {
          path: '/home',
          name: 'home',
          component: Home,
          beforeEnter: (to, from, next) =>{
            if(store.state.authenticated == false){
              next('/login')
            }else{
              next()
            }
          }  
        },
        {
          path: '/accountsetting',
          name: 'accountsetting',
          component: AccountSetting
        },
        {
          path: '/manageproperties',
          name: 'manageproperties',
          component: ManageProperties
        },
        {
          path: '/reports',
          name: 'reports',
          component: Reports
        },
        {
          path: '/reportslord',
          name: 'reportslord',
          component: ReportsLord
        },
      ]
    }
);


new Vue({
  render: h => h(App),
  store: store,
  vuetify,
  router: router
}).$mount('#app')
