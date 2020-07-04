<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="4" class="mt-10">
                <span class="lendinn">LendInn</span> <br>
                <span class="lendinn-desc">
                    Need an apartment to rent? <br>
                    or a house to live? <br>
                    Worry no more, <br>
                    LendInn is here! <br>
                </span>
                <br>
                <v-btn class="primary mr-5" large v-on:click="RouteTo"> Get Started </v-btn>
                <v-btn color="primary" outlined large> Search </v-btn>
            </v-col> 

            <v-col cols="4">
                <v-img src="../assets/house.jpg"></v-img>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    Name:'Index',
    methods:{
        RouteTo(){
            this.$router.push({ name: 'login' })
        }
    }
    
}
</script>

<style scoped>
.lendinn{
    font-size: 50px;
    font-weight: bolder;
    color: teal;
}

.lendinn-desc{
    font-size: 40px;
    
}

</style>
