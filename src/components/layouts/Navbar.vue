<template>
        <div>
            <v-app-bar app>
                <v-app-bar-nav-icon @click="drawer = !drawer" class="ml-5">
                    <v-icon large color="teal">mdi-home-city</v-icon>
                </v-app-bar-nav-icon>
                    <v-toolbar-title>
                        <span>Lend</span>
                        <span class="teal--text">Inn</span></v-toolbar-title>
            </v-app-bar>

            <v-navigation-drawer app v-model="drawer">
                <v-list>
                    <v-list-item link>
                        <v-list-item-action>
                            <v-icon color="teal">mdi-home</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Home</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>      
      </div>
</template>

<script>
export default {
     name: 'Navbar',
     data: () => ({
         drawer: false
  }),
    
}
</script>