<template>
    <v-app>
      <v-data-table
            :headers="headers"
            :items="desserts"
            :search="search"
            sort-by="calories"
            class="elevation-1"
    >
        <template v-slot:top>
            <v-toolbar flat color="white">
                <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                                color="primary"
                                dark
                                class="mb-2"
                                v-bind="attrs"
                                v-on="on"
                        >New Item</v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.first_name" label="First Name"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.last_name" label="Last Name"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                                label=" Password"
                                                :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
                                                @click:append="() => (value = !value)"
                                                :type="value ? 'password' : 'text'"
                                                v-model="editedItem.password"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                                label="Confirm Password"
                                                :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
                                                @click:append="() => (value = !value)"
                                                :type="value ? 'password' : 'text'"
                                                v-model="editedItem.confirm_password"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.mobile" label="Mobile"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                            <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
            <v-icon
                    small
                    class="mr-2"
                    @click="editItem(item)"
            >
                mdi-pencil
            </v-icon>
            <v-icon
                    small
                    @click="deleteItem(item)"
            >
                mdi-delete
            </v-icon>
        </template>
        <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
    </v-data-table>
    </v-app>
</template>

<script>
    export default {
        data: () => ({
            dialog: false,
            headers: [
                {
                    text: 'first_name',
                    align: 'start',
                    sortable: false,
                    value: 'first_name',
                },
                { text: 'last_name', value: 'last_name' },
                { text: 'email', value: 'email' },
                { text: 'mobile', value: 'mobile' },
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            search: '',
            value:false,
            desserts: [],
            editedIndex: -1,
            editedItem: {
                first_name: '',
                last_name: '',
                email: '',
                mobile: '',
                password: '',
                confirm_password: '',
            },
            defaultItem: {
                first_name: '',
                last_name: '',
                email: '',
                mobile: '',
                password: '',
                confirm_password: '',
            },
        }),

        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
            },
        },

        watch: {
            dialog (val) {
                val || this.close()
            },
        },

        created () {
            this.initialize()
        },

        methods: {
            initialize () {
                this.$store
                    .dispatch("getAllUser", {
                        token:this.$store.state.token
                    })
                    .then(res => {
                       this.desserts = res.data.users;
                    })
                    .catch(err => {
                        console.log(err.message);
                    });

            },

            editItem (item) {
                this.editedIndex = this.desserts.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

            deleteItem (item) {
                const index = this.desserts.indexOf(item)
                confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
            },

            close () {
                this.dialog = false
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                })
            },

            save () {
                if (this.editedIndex > -1) {
                    Object.assign(this.desserts[this.editedIndex], this.editedItem)
                } else {
                    //addUser
                    this.$store
                        .dispatch("addUser", {
                            user:this.editedItem,
                            token:this.$store.state.token
                        })
                        .then(res => {
                            this.desserts = res.data.users;
                        })
                        .catch(err => {
                            console.log(err.message);
                        });
                    this.desserts.push(this.editedItem)
                }
                this.close()
            },
        },
    }
</script>