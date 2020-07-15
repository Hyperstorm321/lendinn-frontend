<template>
    <v-container>
        <v-row justify="center">
            <v-col>
                <h1 class="text-center">Change User Information</h1>
            </v-col>
        </v-row>

        <v-row justify="center">
            <v-col cols="2">
                <v-text-field v-model='changeUserinfo.first_name' label="First Name" :counter='20' required></v-text-field>
            </v-col>
            
            <v-col cols="2" class="ml-2">
                <v-text-field v-model='changeUserinfo.middle_name' label="Middle Name" :counter='20'></v-text-field>
            </v-col>

            <v-col cols="2" class="ml-2">
                <v-text-field v-model='changeUserinfo.last_name' label="Last Name" :counter='20' required></v-text-field>
            </v-col>

            <v-col cols="2" class="ml-2">
                <v-text-field v-model='changeUserinfo.extension_name' label="Extention Name" :counter='20' required></v-text-field>
            </v-col>
        </v-row>

        <v-row justify="center">
            <v-col cols="4">
                <v-text-field v-model='changeUserinfo.address' label="Address" :counter="50"></v-text-field>
            </v-col>
            
            <v-col cols="2" class="ml-2">
                <v-text-field v-model='changeUserinfo.barangay' label="Barangay" :counter="10"></v-text-field>
            </v-col>

            <v-col cols="2" class="ml-2">
                <v-text-field v-model='changeUserinfo.postal_code' label="Postal Code" :counter="10"></v-text-field>
            </v-col>
        </v-row>

         <v-row justify="center">
            <v-col cols="4">
                <v-text-field v-model='changeUserinfo.city' label="City" :counter="50"></v-text-field>
            </v-col>

            <v-col cols="2" class="ml-2">
                <v-text-field v-model='changeUserinfo.region' label="Region" :counter="10"></v-text-field>
            </v-col>

            <v-col cols="2" class="ml-2">
                <v-text-field v-model='changeUserinfo.province' label="Province" :counter="10"></v-text-field>
            </v-col>
         </v-row>

        <v-row justify="center">
            <v-col cols="8">
                <v-btn class="primary">Save Changes</v-btn>
            </v-col>
        </v-row>

        <br>
        <br>

         <v-row justify="center">
            <v-col>
                <h1 class="text-center">Change Password</h1>
            </v-col>
        </v-row>

         <v-row justify="center">
            <v-col cols="3">
                <v-text-field v-model="changePassword.oldPassword" class="mb-2" :rules="[rules.required, rules.min]" counter hint="At least 8 characters" label="Old Password" :append-icon="oldshow_password ? 'mdi-eye' : 'mdi-eye-off'" :type="oldshow_password ? 'text' : 'password'" @click:append="oldshow_password = !oldshow_password" required></v-text-field>
            </v-col>
            <v-col cols="2" class="ml-2">
                <v-text-field v-model="changePassword.newPassword" class="mb-2" :rules="[rules.required, rules.min]" counter hint="At least 8 characters" label="New Password" :append-icon="newshow_password ? 'mdi-eye' : 'mdi-eye-off'" :type="newshow_password ? 'text' : 'password'" @click:append="newshow_password = !newshow_password" required></v-text-field>
            </v-col>
            <v-col cols="3" class="ml-2">
                <v-text-field v-model="changePassword.confirmPassword" class="mb-2" :rules="[rules.required, rules.min]" counter hint="At least 8 characters" label="Confirm Password" :append-icon="confirmshow_password ? 'mdi-eye' : 'mdi-eye-off'" :type="confirmshow_password ? 'text' : 'password'" @click:append="confirmshow_password = !confirmshow_password" required></v-text-field>
            </v-col>
         </v-row>

        <v-row justify="center">
            <v-col cols="8">
                <v-btn class="primary">Change Password</v-btn>
            </v-col>
        </v-row>

    </v-container>
</template>

<style>
h1{
    color: teal;
}
</style>

<script>
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8000'

export default {
    Name: 'AccountSetting',
    data(){
        return{
            userId:'',
            changeUserinfo:{
                userid:'',
                first_name:'',
                last_name:'',
                middle_name:'',
                extension_name:'',
                address:'',
                barangay:'',
                postal_code:'',
                city:'',
                region:'',
                province:'',
            },
            changePassword:{
                oldPassword:'',
                newPassword:'',
                confirmPassword:''
            },
            rules: {
                required: value => !!value || 'Required.',
                min: v => v.length >= 8 || 'Min 8 characters',
            },
            oldshow_password:false,
            newshow_password:false,
            confirmshow_password:false
        }
    },

   mounted(){
         axios.get('/api/user').then(response => {
                this.userId = response.data.user_id
            })
            .catch(error => {
                console.log(error)
            })
    },

    methods:{
        getInfo(){
            axios.get('api/useraccounts').then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.log("ERRRR:: " , error.message);
            })
        }
        
    }
}

</script>