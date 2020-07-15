<template>
        <div>
            <v-app-bar app>
                <v-app-bar-nav-icon @click="drawer = !drawer" class="ml-5">
                    <v-icon large color="teal">mdi-home-city</v-icon>
                </v-app-bar-nav-icon>
                    <v-toolbar-title>
                        <router-link to='/'>
                            <span>Lend</span>
                            <span class="teal--text">Inn</span>
                        </router-link>
                    </v-toolbar-title>
            </v-app-bar>

            <v-navigation-drawer app v-model="drawer">
                <v-list>
                    <v-list-item v-on:click="home">
                        <v-list-item-action>
                            <v-icon color="teal">mdi-home-outline</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Home</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>

                <v-list>
                    <v-list-item v-on:click="manageProperties">
                        <v-list-item-action>
                            <v-icon color="teal">mdi-home-city-outline</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Manage Properties</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
                
                <v-list>
                    <v-list-item v-on:click="reports">
                        <v-list-item-action>
                            <v-icon color="teal">mdi-clipboard-file-outline</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Reports</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>

                <v-list>
                    <v-list-item v-on:click="accountSettings">
                        <v-list-item-action>
                            <v-icon color="teal">mdi-account-cog-outline</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Account Settings</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>

                <v-list>
                    <v-list-item v-on:click="logout">
                        <v-list-item-action>
                            <v-icon color="teal">mdi-logout</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Logout</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>

            </v-navigation-drawer>      
      </div>
</template>

<style>
a {
    text-decoration: none;
}
</style>

<script>

import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8000'

export default {
     name: 'Navbar',
    data(){
        return{
            drawer: false,
            first_name:'',
            last_name:'',
            email: '',
            userid: '',
        }
    },
    mounted(){
        axios.get('/api/user').then(response =>{
            this.first_name = response.data.first_name,
            this.last_name = response.data.last_name,
            this.email = response.data.email,
            this.userid = response.data.user_id
        })
        .catch(error => {
            console.log("ERRRR:: ",error.response.data);
        });
    },

    methods:{
        accountSettings(){
            this.$store.commit('setAuthentication', true)
            this.$router.push({ name: 'accountsetting' })
        },
        home(){
            this.$store.commit('setAuthentication', true)
            this.$router.push({ name: 'home' })
        },
        manageProperties(){
            this.$store.commit('setAuthentication', true)
            this.$router.push({ name: 'manageproperties' })
        },
        reports(){
            this.$store.commit('setAuthentication', true)
            this.$router.push({ name: 'reports' })
        },
        logout(){
            axios.post('/logout').then(response => {
                this.$router.push({ name: 'index' })
                this.$store.commit('setAuthentication', false)
            })
        }
    }
    
}
</script>