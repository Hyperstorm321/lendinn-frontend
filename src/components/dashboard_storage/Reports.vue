<template>
    <v-container>
        <h1 class="text-black">Reports</h1>

        <v-container>

            <v-row>
                <v-list >
                    <v-list-item v-on:click="listOfRentedAndBoughtProperties">
                        <v-list-item-action>
                            <v-icon color="teal">mdi-cash-multiple</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>List of Rented and Bought Properties</v-list-item-title> 
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item v-on:click="top10HighestRentedProperties">
                        <v-list-item-action>
                            <v-icon color="teal">mdi-domain</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Top 5 Highest Rented Properties in Caloocan, 2020</v-list-item-title> 
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item v-on:click="top10HighestSoldProperties">
                        <v-list-item-action>
                            <v-icon color="teal">mdi-home-analytics</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Top 5 Highest Sold Properties in Caloocan, 2020</v-list-item-title> 
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item v-on:click="listOfOwnedProperties" v-show="is_landlord">
                        <v-list-item-action>
                            <v-icon color="teal">mdi-home-city-outline</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>List of Owned Properties</v-list-item-title> 
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item v-on:click="rentedPropertiesInAMonth" v-show="is_landlord">
                        <v-list-item-action>
                            <v-icon color="teal">mdi-office-building</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Rented Properties in May 2020</v-list-item-title> 
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item v-on:click="soldPropertiesInAMonth" v-show="is_landlord">
                        <v-list-item-action>
                            <v-icon color="teal">mdi-home</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Sold Properties in May 2020</v-list-item-title> 
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-row>

        </v-container>

    </v-container>
</template>

<script>
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8000'

export default {
    name: 'reports',
    data(){
        return{
            reports:[
                {link: 'listOfRentedAndBoughtProperties', icon: 'mdi-cash-multiple', title: 'List of Rented and Bought Properties'},
                {link: 'top10HighestRentedProperties', icon: 'mdi-cash-multiple', title: 'Top 10 Highest Rented Properties'},
            ],
            is_landlord: false
        }
    },
    mounted(){
        this.getIsLandlord()
    },
    methods:{
        getIsLandlord() {
            axios.get('/api/user').then(response =>{
                this.is_landlord = (response.data.is_landlord == 1) ? true : false;
            })
        },
        listOfRentedAndBoughtProperties(){
            this.$store.commit('setAuthentication', true)
            this.$router.push({ name: 'ListOfRentedAndBoughtProperties' })
        },
        top10HighestRentedProperties(){
            this.$store.commit('setAuthentication', true)
            this.$router.push({ name: 'Top5HighestRentedProperties' })
        },
        top10HighestSoldProperties(){
            this.$store.commit('setAuthentication', true)
            this.$router.push({ name: 'Top5HighestSoldProperties' })
        },
        listOfOwnedProperties(){
            this.$store.commit('setAuthentication', true)
            this.$router.push({ name: 'ListOfOwnedProperties' })
        },
        rentedPropertiesInAMonth(){
            this.$store.commit('setAuthentication', true)
            this.$router.push({ name: 'RentedPropertiesInAMonth' })
        },
        soldPropertiesInAMonth(){
            this.$store.commit('setAuthentication', true)
            this.$router.push({ name: 'SoldPropertiesInAMonth' })
        }
    }
}
</script>