<template>
    <nav
        class="w-full flex bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-3 space-x-4 shadow-lg"
    >
        <router-link v-for="item in list" :key="item" :to="item.to">{{
            item.title
        }}</router-link>
        <button v-if="isLoggedIn == false" class="focus:outline-none" @click="openLoginModal">
            Login
        </button>
        <button v-else class="focus:outline-none" @click="logout">Logout</button>
    </nav>
</template>

<script>
import firebase from "../utilities/firebase";
export default {
    data() {
        return {
            list: [
                { title: "Hero", to: "/heros" },
                { title: "Calendar", to: "/calendar" },
                { title: "Markdown", to: "/markdown" },
                { title: "Slider", to: "/slider" },
                { title: "Calculator", to: "/calculator" },
                { title: "Modal", to: "/reusable-modal" },
                { title: "Chat", to: "/realtime-chat" },
                { title: "Crud", to: "/crud-app" },
                { title: "Tensorflow", to: "/tensorflow" },
            ],
        };
    },

    computed: {
        isLoggedIn() {
            return this.$store.state.isLoggedIn
        }
    },

    methods: {
        logout() {
            firebase
                .auth()
                .signOut()
                .then((res) => {
                    console.log(res);
                })
                .catch((e) => {
                    console.log(e);
                });
        },

        openLoginModal() {
            this.$store.commit('setLoginModal', true)
        }
    },
};
</script>