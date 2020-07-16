<template>
   <v-container>
               <v-row justify="center">
                     <v-card v-for="prop in allProperties" :key="prop.property_id" class="ml-5 mb-5">
                        <img :src="require(`../assets/properties/${prop.main_photo_src}`)" width="300px" height="250px">
                            <div class="text-center mb-5 mt-5">
                                {{ prop.name }} <br>
                                {{ prop.detailed_address }} <br> <br>
                                <v-btn class="primary">View</v-btn>
                            </div>
                    </v-card>
               </v-row>
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
            userInfo:{
                userid:''
            },
           allProperties:[]
        }
    },
    mounted(){
        this.getUserInfo()
        this.getAllProperties()
    },
    methods:{
       getUserInfo(){
            axios.get('api/user').then(response =>{
                this.userInfo.userid = response.data.user_id
            })
            .catch(error => {
                console.log("ERRRR:: ",error.response.data);
            })
       },
       getAllProperties(){
           axios.get('api/usersproperties').then(response =>{
               this.allProperties = response.data
           })
           .catch(error =>{
               console.log('eroro')
           })
       }
    }
    
}
</script>