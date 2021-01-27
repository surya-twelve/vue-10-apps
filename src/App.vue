<template>
    <Navbar />
    <div class="flex flex-col w-full">
        <router-view></router-view>
    </div>
    <teleport to="#LoginModal">
        <LoginModal />
    </teleport>
</template>

<script>
import firebase from "./utilities/firebase";
import Navbar from "./components/Navbar";
import LoginModal from "./components/LoginModal";
export default {
    mounted() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.$store.commit("setIsLoggedIn", true);
                this.$store.commit("setAuthUser", user);
            } else {
                this.isLoggedIn = false;
                this.userAuth = {};
                this.$store.commit("setIsLoggedIn", false);
                this.$store.commit("setAuthUser", {});
            }
        });
    },
    components: {
        Navbar,
        LoginModal,
    },
};
</script>