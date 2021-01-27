<template>
    <div class="flex flex-col w-full my-4">
        <div class="m-auto">
            <h1 class="text-2xl text-center my-2">Realtime Chat vue</h1>
            <div class="border rounded bg-white w-96">
                <div class="h-96 p-4 flex flex-col space-y-4 overflow-y-scroll">
                    <div
                        v-for="chat in state.chats"
                        :key="chat.message"
                        class="w-full"
                        :class="chat.userId === userId ? 'text-right' : ''"
                    >
                        <span
                            class="p-2 rounded-lg text-white shadow"
                            :class="
                                chat.userId === userId
                                    ? 'bg-green-500'
                                    : 'bg-blue-500'
                            "
                            >{{ chat.message }}</span
                        >
                    </div>
                </div>
                <div class="h-8 p-2">
                    <input
                        class="w-full p-2 border rounded-lg shadow focus:outline-none focus:ring focus:ring-blue-400 focus:ring-offset-2"
                        placeholder="Type message..."
                        ref="focusRef"
                        v-model="state.message"
                        @keydown.enter="addMessage"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, onMounted, reactive, ref } from "vue";
import firebase from "../utilities/firebase";
import { useStore } from "vuex";
export default {
    setup() {
        const focusRef = ref("");
        const state = reactive({
            chats: {},
            message: "",
        });

        // get user data id from store (vuex)
        const store = useStore();
        const userId = computed(() => store.state.authUser.uid);

        onMounted(async () => {
            // focus input text
            focusRef.value.focus();

            // for get data chat from realtime database
            const response = await firebase
                .database()
                .ref("chats")
                .once("value");
            state.chats = response.val();

            // whatcing for changes realtime database
            await firebase
                .database()
                .ref("chats")
                .on("value", (snapshot) => {
                    state.chats = snapshot.val();
                });
        });

        // function for push/add message to firebase realtime database
        const addMessage = async () => {
            const newChat = await firebase.database().ref("chats");
            newChat.push().set({
                userId: userId.value,
                message: state.message,
            });
            // clear text field after done push message
            state.message = "";
        };

        return { state, addMessage, focusRef, userId };
    },
};
</script>

<style>
</style>