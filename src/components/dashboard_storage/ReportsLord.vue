<template>
    <v-container>
        <h1 class="text-black">Reports</h1>
        <v-row justify="center">
            <!-- Start of Owned Properties  -->
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

         <v-row>
            <v-col cols="12">
                 <h1 class="ml-5 mb-5">Sold Properties on a Month of July 2020</h1>
                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Date</th>
                                <th>Property Name</th>
                                <th>Property Type</th>
                                <th>City</th>
                                <th>Buyer</th>
                                <th>Quantity</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="sold in soldPropertiesLd" :key="sold.id">
                                <td>#</td>
                                <td>{{sold.date_acquired}}</td>
                                <td>{{sold.name}}</td>
                                <td>{{sold.property_type}}</td>
                                <td>{{sold.city}}</td>
                                <td>{{sold.buyer}}</td>
                                <td>{{sold.quantity}}</td>
                                <td>{{sold.total_price}}</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-col>
        </v-row>

         <v-row>
            <v-col cols="12">
                 <h1 class="ml-5 mb-5">Rented Properties on a Month of July 2020</h1>
                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Date</th>
                                <th>Property Name</th>
                                <th>Property Type</th>
                                <th>City</th>
                                <th>Renter</th>
                                <th>Quantity</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="rent in rentedPropertiesLd" :key="rent.id">
                                <td>#</td>
                                <td>{{rent.date_acquired}}</td>
                                <td>{{rent.name}}</td>
                                <td>{{rent.property_type}}</td>
                                <td>{{rent.city}}</td>
                                <td>{{rent.buyer}}</td>
                                <td>{{rent.quantity}}</td>
                                <td>{{rent.total_price}}</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-col>
        </v-row>


        <v-row>
            <v-col cols="12">
                 <h1 class="ml-5 mb-5">Top 10 Rental Properties In Caloocan, 2020</h1>
                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Property</th>
                                <th>Property Type</th>
                                <th>Total Quantity</th>
                                <th>Total Sale</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="topRented in topRentedProperties" :key="topRented.id">
                                <td></td>
                                <td>{{topRented.name}}</td>
                                <td>{{topRented.property_type}}</td>
                                <td>{{topRented.total_quantity}}</td>
                                <td>{{topRented.total_sale}}</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-col>
        </v-row>
           <v-row>
            <v-col cols="12">
                 <h1 class="ml-5 mb-5">Top 10 Sold Properties In Caloocan, 2020</h1>
                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Property</th>
                                <th>Property Type</th>
                                <th>Total Quantity</th>
                                <th>Total Sale</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="topSold in topSoldProperties" :key="topSold.id">
                                <td></td>
                                <td>{{topSold.name}}</td>
                                <td>{{topSold.property_type}}</td>
                                <td>{{topSold.total_quantity}}</td>
                                <td>{{topSold.total_sale}}</td>
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
            topRentedProperties:[],
            topSoldProperties:[],
            soldPropertiesLd:[],
            rentedPropertiesLd:[],
            ownedPropertiesLd:[]
        }
    },
    mounted(){
        this.getUserReportsPropertiesOwned()
        this.topRented()
        this.topSold()
        this.ownedPropertiesLandlord()
        this.soldPropertiesLandlord()
        this.rentedPropertiesLandlord()
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
        topRented(){
            axios.get('api/landlord/top_10_highest_rented_properties_by_city_in_a_year/Caloocan/2020').then(response =>{
                this.topRentedProperties = response.data
            })
        },
        topSold(){
            axios.get('api/landlord/top_10_highest_sold_properties_by_city_in_a_year/Caloocan/2020').then(response =>{
                this.topSoldProperties = response.data
            })
        },
        ownedPropertiesLandlord(){
            axios.get(`api/landlord/list_of_properties_owned/1`).then(response =>{
                this.ownedPropertiesLd = response.data
                // console.log(response.data)
            })
        },
        soldPropertiesLandlord(){
            axios.get('api/landlord/sold_properties_in_a_month/1/2020/5').then(response =>{
                this.soldPropertiesLd = response.data
                // console.log(response.data)
            })
        },
        rentedPropertiesLandlord(){
            axios.get('api/landlord/rented_properties_in_a_month/1/2020/5').then(response =>{
                this.rentedPropertiesLd = response.data
                // console.log(response.data)
            })
        }
    }
}
</script>