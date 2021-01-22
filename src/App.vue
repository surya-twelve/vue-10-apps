<template>
    <Navbar @open-login-modal="isLoginModal = true" :propIsLogin="isLoggedIn" />
    <div class="flex flex-col w-full">
        <router-view></router-view>
    </div>
    <teleport to="#LoginModal">
        <LoginModal v-if="isLoginModal" @close-modal="isLoginModal = false" />
    </teleport>
</template>

<script>
import firebase from "./utilities/firebase";

import Navbar from "./components/Navbar";
import LoginModal from "./components/LoginModal";
export default {
    data() {
        return {
            isLoginModal: false,
            isLoggedIn: false,
            userAuth: {},
        };
    },
    mounted() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.isLoggedIn = true;
                this.userAuth = user;
            } else {
                this.isLoggedIn = false;
                this.userAuth = {};
            }
        });
    },
    components: {
        Navbar,
        LoginModal,
    },
};
</script>