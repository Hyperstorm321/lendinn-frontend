<template>
    <v-container>
        
        <v-row justify="center">
            
            <v-col cols="12">
                <v-btn color="primary" v-on:click="printSection">
                    <v-icon>mdi-printer</v-icon> Print
                </v-btn>
            </v-col>

            <v-col cols="12" id="printSection">

                <section class="ml-5 mb-10 text-center">
                    <h1>Rented Properties in July 2020</h1>
                    <p class="text-bold">{{ fullNameLNF}}</p>
                </section>

                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Date Rented</th>
                                <th>Property</th>
                                <th>Type</th>
                                <th>City</th>
                                <th>Buyer</th>
                                <th>Rent/Rent-to-Own</th>
                                <th class="text-right">Quantity</th>
                                <th class="text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(property, index) in properties" :key="property.key">
                                <td class="font-weight-bold">
                                    {{index+1}}
                                </td>
                                <td>{{formatDate(property.date_acquired)}}</td>
                                <td>{{property.name}}</td>
                                <td>{{property.property_type}}</td>
                                <td>{{property.city}}</td>
                                <td>{{property.buyer}}</td>
                                <td>{{property.selling_type}}</td>
                                <td class="text-right">
                                    {{property.quantity}}
                                </td>
                                <td class="text-right">
                                    {{property.total_price | currency('Php ')}}
                                </td>
                            </tr>
                        </tbody>
                        
                        <tfoot>
                            <tr>
                                <td colspan="8" class="text-right">
                                    Total Sale
                                </td>
                                <th class="text-right">
                                    {{48000 | currency("Php ")}}
                                </th>
                            </tr>
                        </tfoot>
                    </template>
                </v-simple-table>

            </v-col>
            
        </v-row>

    </v-container>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import Vue from 'vue'
import Vue2Filters from 'vue2-filters'
import VueHtmlToPaper from "vue-html-to-paper"

// Filters
Vue.use(Vue2Filters)

// Printing
const options = {
	name: "_blank",
	specs: ["fullscreen=yes", "titlebar=yes", "scrollbars=yes"],
	styles: [
		"https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",
		"https://unpkg.com/kidlat-css/css/kidlat.css"
	]
};
  
Vue.use(VueHtmlToPaper, options);

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8000'

export default {
    name: 'reports',
    data(){
        return{
            properties:[],
            fullNameLNF: 'LastName, FirstName MI'
        }
    },
    mounted(){
        this.getRentedPropertiesInAMonth()
        this.getFullNameLNF()
    },
    methods:{
        getFullNameLNF() {
            axios.get('/api/user').then(response =>{
                this.fullNameLNF =    response.data.last_name 
                                    + ', '
                                    + response.data.first_name
                                    + ' '
                                    + ((response.data.middle_name == null) ? 
                                        '' 
                                        : response.data.middle_name.substring(0, 1))
            })
        },
        getRentedPropertiesInAMonth(){
            axios.get("api/landlord/rented_properties_in_a_month/1/2020/5").then(response =>{
                this.properties = response.data
            }) 
        },
        formatDate(date) {
            if (date) {
                return moment(String(date)).format('MMM D, YYYY hh:mm a')
            }
        },
        printSection() {
            this.$htmlToPaper("printSection");
        }
    }
}
</script>