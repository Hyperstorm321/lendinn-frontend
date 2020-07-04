<template>
    <v-container> 
        <v-row justify="center" class="mt-12">
            <v-col cols="3">
                <v-img src="../assets/house.jpg"></v-img>
            </v-col>
        
            <v-col cols="3">
                <h1>Welcome</h1>
                <span>Sign in to Lend</span><span class="teal--text">Inn</span>
                    
                <v-form>
                    <v-text-field v-model="login_input.email" :rules="emailRules" :counter="30" label="Email" required></v-text-field>
                    <v-text-field v-model="login_input.password" hint="Forgot password?" persistent-hint label="Password" :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'" :type="show_password ? 'text' : 'password'" @click:append="show_password = !show_password" required class="mb-5"></v-text-field>
                    <v-btn class="mb-10">Login</v-btn> <br>
                    <span>Don't have an account?</span>
                    <router-link to='/register'> Sign Up </router-link>
                </v-form>
            </v-col>
        </v-row>
            
    </v-container>
</template>

<style scoped>
    a {
        text-decoration: none;
    }
</style>

<script>

import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8000'

export default {
    name: 'Login',
    data(){
        return{
            login_input:{
                email:'',
                password:'',
            },
            emailRules:[
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            show_password: false,
        }
    },
    methods:{
        login(){
           axios.get('/sanctum/csrf-cookie').then(response =>{
               axios.post('/login',{
                   email: this.login_input.email,
                   password: this.login_input.password,
               })
               .then(response =>{
                   this.$store.commit('setAuthentication', true)
                    this.$router.push({ name: 'dashboard' })
               })
           })
        }
    }
}
</script>