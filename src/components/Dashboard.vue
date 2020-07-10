<template>
   <v-container>
       <v-card>
            {{ first_name }} {{ last_name}} {{email}}
       </v-card>
   </v-container>
</template>

<script>

import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8000'

export default {
    name: 'Dashboard',
    data(){
        return{
            first_name: '',
            last_name: '',
            email: ''
        }
    },
    mounted(){
        axios.get('/api/user').then(response =>{
            this.first_name = response.data.first_name,
            this.last_name = response.data.last_name,
            this.email = response.data.email
        })
          .catch(error => {
                    console.log("ERRRR:: ",error.response.data);
                });
        
        
    },
    methods:{
       
    }
    
}
</script>