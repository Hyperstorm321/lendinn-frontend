<template>
    <v-container>
        <v-row justify="center" class="mt-12">
            <v-form>
                <span class="welcome mr-3">Welcome to</span> <span class="welcome teal--text" >LendInn</span> <br>
                <v-text-field v-model="register_data.first_name" :counter="20" label="First Name" required></v-text-field>
                <v-text-field v-model="register_data.last_name" :counter="20" label="Last Name" required></v-text-field>
                <v-text-field v-model="register_data.email" :rules="emailRules" :counter="30" label="Email" required></v-text-field>
                <v-text-field v-model="register_data.password" class="mb-2" :rules="[rules.required, rules.min]" counter hint="At least 8 characters" label="Password" :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'" :type="show_password ? 'text' : 'password'" @click:append="show_password = !show_password" required></v-text-field>
                <v-btn v-on:click="register_user" class="primary mb-5"> Create an Account</v-btn> <br>
                <span>Already have a  </span> <span class="teal--text">LendInn </span><span>acoount?  </span>
                <router-link to='/register'> Sign in </router-link>
            </v-form>
        </v-row>
    </v-container>
</template>

<style scoped>
.welcome{
    font-size: 40px;
    font-weight: bolder;
}
</style>

<script>

import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8000'

export default {
    name: 'Register',
    data(){
        return{
            register_data:{
                first_name:'',
                last_name:'',
                email:'',
                password:''
            },
            emailRules:[
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            rules: {
                required: value => !!value || 'Required.',
                min: v => v.length >= 8 || 'Min 8 characters',
            },
            show_password: false,
        }
    },
    methods:{
        register_user(){
            axios.get('/sanctum/csrf-cookie').then(response =>{
                axios.post('/register',{
                    first_name: this.register_data.first_name,
                    last_name: this.register_data.last_name,
                    email: this.register_data.email,
                    password: this.register_data.password,
                    password_confirmation:this.register_data.password
                })
                .then(response =>{
                    this.$store.commit('setAuthentication', true)
                    this.$router.push({ name: 'dashboard' })
                })
                .catch(error => {
                    console.log("ERRRR:: ",error.response.data);
                });
            })
        }
    }
    
}
</script>