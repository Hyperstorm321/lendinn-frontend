<template>
    <v-container>
        <h1>My Properties</h1> 
        <!-- Start of Create dialog -->
            <!-- <v-dialog v-model="dialog" width="600">
                <template v-slot:activator="{ on,attrs}">
                    <v-btn color="primary" v-bind="attrs" v-on="on">Create</v-btn>
                </template>
                    <v-card>
                        <v-card-title class="headline teal white--text"> Create an Property | LendInn</v-card-title>
                        <v-card-text>
                            <v-row>
                                <v-col cols="4">
                                    <v-text-field label="Name of Agency"></v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field label="Property Name"></v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field label="Location"></v-text-field>
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col cols="4">
                                    <v-text-field label="Property Type"></v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field label="Land Size"></v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field label="Living Size"></v-text-field>
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col cols="4">
                                    <v-text-field label="Bedroom"></v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field label="Bathroom"></v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field label="Sale/Rent"></v-text-field>
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col cols="12">
                                    <v-text-field label="Home Features/Amenities"></v-text-field>
                                    <v-text-field label="Details"></v-text-field>
                                    <v-text-field label="Pet Allowed"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary"> Create </v-btn>
                        </v-card-actions>
                    </v-card>
            </v-dialog> -->
        <!-- End of Create Dialog --> 
              <v-row justify="center" class="mt-10">
                   <v-card v-for="prop in myProperties" :key="prop.property_id" class="ml-5 mb-5">
                       <img :src="require(`../../assets/properties/${prop.main_photo_src}`)" width="300px" height="250px">
                       <div class="text-center mt-5 mb-5">
                           {{prop.name}} <br>
                           {{prop.detailed_address}}<br> <br>
                           <v-btn class="primary mr-5">Details</v-btn>
                           <v-btn class="error">Remove</v-btn> <br> <br>
                           <v-btn class="primary">View Offers</v-btn>
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
      Name: 'ManageProperties',
      data(){
          return{
            userId:'',
            myProperties:[]
          }
      },
      mounted(){
          this.getMyProperties()
      },
      methods:{
          getMyProperties(){
              let id;
              axios.get('/api/user').then(response =>{
                    id = response.data.user_id
                    axios.get(`api/myproperties/${id}`).then(response =>{
                        this.myProperties = response.data
                    })
              })
              .catch(error => {
                  console.log(error)
              })
          }
      }
}
</script>