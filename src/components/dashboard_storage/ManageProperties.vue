<template>
    <v-container>
        <h1>My Properties</h1>
        <v-row>
            <v-col cols="12"> 
                <v-row>
                    <v-card v-for="(item,i) in items" :key="i" class="ml-5 mb-5">
                        <img :src="item.src" width="500px"> <br>
                        <div class="text-center mb-5 mt-5">
                            <!-- Modal -->
                                <v-dialog v-model="dialog" width="600" >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn color="primary" v-bind="attrs" v-on="on"> Details </v-btn>
                                    </template>
                                        <v-card>
                                            <v-card-title class="headline teal white--text"> Property Details | LendInn </v-card-title>
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
                                            <v-btn color="primary"> I Accept</v-btn>
                                            </v-card-actions>
                                        </v-card>
                                 </v-dialog>
                            <v-btn class="error ml-5">Delete</v-btn>
                        </div>
                    </v-card>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

export default {
      Name: 'ManageProperties',
      data(){
          return{
               items: [
                {
                src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
                desc: 'heha'
                },
                {
                src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
                desc: 'hehi'
                },
                {
                src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
                desc: 'hehe'
                },
                {
                src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
                desc: 'heho'
                },
                {
                src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
                desc: 'hehu'
                },
                {
                src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
                desc: 'heho'
                },
                
            ],
          }
      },
      methods:{

      }
}
</script>