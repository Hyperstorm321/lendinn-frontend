<template>
    <v-container>
        <h1 class="text-black">Reports</h1>
        <v-row justify="center">
            <!-- Start of Owned Properties  -->
            <v-col cols="12">
                <h1 class="ml-5 mb-5">List of Properties Rented/Bought</h1>
                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Property</th>
                                <th>Type</th>
                                <th>Buy/Rent</th>
                                <th>Quantity</th>
                                <th>Total Price</th>
                                <th>City</th>
                                <th>Detailed Address</th>
                                <th>Date Acquired</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="ownedProp in ownedProperties" :key="ownedProp.key">
                                <td>{{ownedProp.key}}</td>
                                <td>{{ownedProp.name}}</td>
                                <td>{{ownedProp.property_type}}</td>
                                <td>{{ownedProp.selling_type}}</td>
                                <td>{{ownedProp.quantity}}</td>
                                <td>{{ownedProp.total_price}}</td>
                                <td>{{ownedProp.city}}</td>
                                <td>{{ownedProp.detailed_address}}</td>
                                <td>{{ownedProp.date_acquired}}</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-col>
            <!-- End of Owned Properties -->
        </v-row>

        <v-row justify="center">
            <v-col cols="12">
                <h1 class="ml-5 mb-5">List of Properties Owned (Renter/Buyer)</h1>
                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Property</th>
                                <th>Type</th>
                                <th>Buy/Rent</th>
                                <th>Quantity</th>
                                <th>Total Price</th>
                                <th>City</th>
                                <th>Detailed Address</th>
                                <th>Date Acquired</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="prop in landlordProperties" :key="prop.key">
                                <td>{{}}</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-col>
        </v-row>
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
            ownedProperties:[],
            landlordProperties:[]
        }
    },
    mounted(){
        this.getUserReportsPropertiesOwned()
        this.landlordPropertiesOwned()
    },
    methods:{
        getUserReportsPropertiesOwned(){
            var user_id
            axios.get('/api/user').then(response =>{
                user_id = response.data.user_id
                axios.get(`api/list_of_properties_owned/${user_id}`).then(response =>{
                    this.ownedProperties = response.data
                    // console.log(response.data)
                })  
            })
        },
        landlordPropertiesOwned(){
            var landlord_id
            axios.get('/api/user').then(response =>{
                landlord_id = response.data.user_id
                axios.get(`api/landlord/list_of_properties_owned/${landlord_id}`).then(response =>{
                    this.landlordProperties = response.data
                    console.log(response.data)
                })
            })
        }
    }
}
</script>