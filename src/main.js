import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from './App.vue'
import vuetify from './plugins/vuetify'
//Views
import Index from './components/Index.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Dashboard from './components/Dashboard.vue'


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
          path: '/dashboard',
          name: 'dashboard',
          component: Dashboard,
          beforeEnter: (to, from, next) =>{
            if(store.state.authenticated == false){
              next('/login') //next('/login') if any route
            }else{
              next()
            }
          }  
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
