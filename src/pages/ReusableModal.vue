<template>
    <section class="flex w-full">
        <div class="m-auto text-center">
            <h1 class="text-2xl my-4">Re-usable Modal</h1>

            <Modal v-if="isModal1Open" @closeModal="isModal1Open = false">
              <template #title>
                  Modal 1
              </template>
              <template #body>
                  this is slot modal body 1
              </template>
            </Modal>
            <button
                @click="isModal1Open = true"
                class="mx-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg shadow-md hover:bg-blue-500 transition transition-color focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-offset-1"
            >
                Modal 1
            </button>

            <!-- v-slot bisa di singkat menjadi #nameSlot -->

            <Modal v-if="isModal2Open" @closeModal="isModal2Open = false">
              <template v-slot:title>
                  Modal 2
              </template>
              <template v-slot:body>
                  this is slot modal body 2
              </template>
            </Modal>
            <button
                @click="isModal2Open = true"
                class="mx-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg shadow-md hover:bg-blue-500 transition transition-color focus:outline-none focus:ring focus:ring-pink-300 focus:ring-offset-1"
            >
                Modal 2
            </button>
        </div>
    </section>
</template>

<script>
import { ref } from "vue";
import Modal from "../components/Modal";
export default {
    components: { Modal },
    setup() {
        const isModal1Open = ref(false);
        const isModal2Open = ref(false);

        return { isModal1Open, isModal2Open };
    },
};
</script>

<style>
</style>