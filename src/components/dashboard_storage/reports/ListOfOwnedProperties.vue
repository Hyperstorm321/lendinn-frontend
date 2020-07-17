<template>
    <v-container>
        
        <v-row justify="center">
            <!-- Start of Owned Properties  -->
            <v-col cols="12">
                <v-btn color="primary" v-on:click="printSection">
                    <v-icon>mdi-printer</v-icon> Print
                </v-btn>
            </v-col>

            <v-col cols="12" id="printSection">

                <section class="ml-5 mb-10 text-center">
                    <h1>List of Owned Properties</h1>
                    <p class="text-bold">{{ fullNameLNF}}</p>
                </section>

                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Property</th>
                                <th>Type</th>
                                <th class="text-right">Quantities</th>
                                <th>City</th>
                                <th>Detailed Address</th>
                                <th>Date Added</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(property, index) in properties" :key="property.key">
                                <td class="font-weight-bold">
                                    {{index+1}}
                                </td>
                                <td>{{property.name}}</td>
                                <td>{{property.property_type}}</td>
                                <td class="text-right">
                                    <pre>{{breakLines(property.quantities)}}</pre>
                                </td>
                                <td>{{property.city}}</td>
                                <td>{{property.detailed_address}}</td>
                                <td>{{formatDate(property.date_added)}}</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>

            </v-col>
            <!-- End of Owned Properties -->
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
        this.getListOfOwnedProperties()
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
        getListOfOwnedProperties(){
            axios.get("api/landlord/list_of_owned_properties/1").then(response =>{
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
        },
        breakLines(text) {
            return text.split(', ').join('\n');
        }
    }
}
</script>