<template>
    <section
        @click="closeModal"
        class="z-20 h-screen w-screen bg-black opacity-50 fixed top-0"
    ></section>
    <div class="absolute inset-0">
        <div class="flex h-full">
            <div class="z-30 m-auto bg-white rounded-md shadow-lg p-10 w-1/3">
                <h1 class="text-xl font-semibold text-center text-gray-600">
                    Login modal
                </h1>
                <div class="flex justify-center mt-10">
                    <form
                        class="flex flex-col space-y-5 w-full"
                        @submit.prevent="submitLogin"
                    >
                        <input
                            v-model="form.email"
                            type="email"
                            ref="emailRef"
                            class="bg-gray-100 p-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 shadow-md"
                            placeholder="E-Mail"
                        />
                        <input
                            v-model="form.password"
                            type="password"
                            class="bg-gray-100 p-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 shadow-md"
                            placeholder="Password"
                        />
                        <button
                            class="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg shadow-md hover:bg-blue-500 transition transition-color focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-offset-1"
                            :class="!isLoading ? 'focus:ring-opacity-0' : ''"
                        >
                            <span v-if="!isLoading"> Login </span>
                            <span v-else>
                                <svg
                                    class="w-6 h-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink"
                                    style="
                                        margin: auto;
                                        background: none;
                                        display: block;
                                        shape-rendering: auto;
                                    "
                                    width="200px"
                                    height="200px"
                                    viewBox="0 0 100 100"
                                    preserveAspectRatio="xMidYMid"
                                >
                                    <circle
                                        cx="50"
                                        cy="50"
                                        fill="none"
                                        stroke="#93dbe9"
                                        stroke-width="10"
                                        r="35"
                                        stroke-dasharray="164.93361431346415 56.97787143782138"
                                    >
                                        <animateTransform
                                            attributeName="transform"
                                            type="rotate"
                                            repeatCount="indefinite"
                                            dur="1s"
                                            values="0 50 50;360 50 50"
                                            keyTimes="0;1"
                                        ></animateTransform>
                                    </circle>
                                </svg>
                            </span>
                        </button>
                    </form>
                </div>
                <GoogleLogin @close-modal-from-google="closeModal" />
            </div>
        </div>
    </div>
</template>

<script>
import firebase from "../utilities/firebase";
import GoogleLogin from "../components/Login/GoogleLogin";
export default {
    components: {GoogleLogin},
    data() {
        return {
            form: {
                email: "rido@vilacode.com",
                password: "password",
            },
            isLoading: false,
        };
    },
    mounted() {
        this.$refs.emailRef.focus();
    },
    methods: {
        submitLogin() {
            this.isLoading = true;
            firebase
                .auth()
                .signInWithEmailAndPassword(this.form.email, this.form.password)
                .then(() => {
                    this.form.email = "";
                    this.form.password = "";
                    this.isLoading = false;
                    this.closeModal();
                })
                .catch((e) => {
                    console.log(e);
                    this.isLoading = false;
                });
        },

        closeModal() {
            this.$emit("close-modal");
        },
    },
};
</script>

<style></style>
