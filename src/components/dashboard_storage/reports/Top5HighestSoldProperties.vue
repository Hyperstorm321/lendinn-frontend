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
                    <h1>Top 5 Highest Sold Properties</h1>
                    <h2 class="font-weight-light">In Caloocan City, 2020</h2>
                </section>

                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th colspan="2">Property</th>
                                <th>Property Type</th>
                                <th class="text-right">Total Quantity</th>
                                <th class="text-right">Total Sale</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(property, index) in properties" :key="property.key">
                                <td class="font-weight-bold">
                                    {{index+1}}
                                </td>
                                <td>
                                    <img :src="require(`../../../assets/properties/${property.main_photo_src}`)" width="50px" height="50px"> 
                                </td>
                                <td>
                                    {{property.name}}
                                </td>
                                <td>{{property.property_type}}</td>
                                <td class="text-right">
                                    {{property.total_quantity}}
                                </td>
                                <td class="text-right">
                                    {{property.total_sale | currency('Php ')}}
                                </td>
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
            properties:[]
        }
    },
    mounted(){
        this.top10HighestSoldProperties()
    },
    methods:{
        top10HighestSoldProperties(){
            axios.get('api/top_5_highest_sold_properties_by_city_in_a_year/Caloocan/2020').then(response =>{
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