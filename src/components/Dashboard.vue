<template>
   
    <button v-on:click="route">{{ email }}</button>

</template>

<script>

import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8000'

export default {
    name: 'Dashboard',
    data(){
        return{
            email: ''
        }
    },
    mounted(){
        axios.get('/api/user').then(response =>{
            this.email = response.data.email
        })
        
    },
    methods:{
        route(){
            this.$router.push({ name: 'helloworld' })
            this.$store.commit('setAuthentication', true)
        }
    }
    
}
</script>