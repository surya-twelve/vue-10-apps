<template>
    <div class="flex flex-col w-full my-4">
        <div class="m-auto">
            <div class="my-3">
                <div class="flex justify-between">
                    <button
                        @click="openModal "
                        class="px-2 py-1 my-2 bg-blue-500 text-white rounded"
                    >Add user</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th class="px-4 py-2 border text-center">ID</th>
                            <th class="px-4 py-2 border text-center">Name</th>
                            <th class="px-4 py-2 border text-center">Username</th>
                            <th class="px-4 py-2 border text-center">Email</th>
                            <th class="px-4 py-2 border text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in state.users" :key="user.id">
                            <td class="px-4 py-2 border text-center">{{ user.id }}</td>
                            <td class="px-4 py-2 border text-center">{{ user.name }}</td>
                            <td class="px-4 py-2 border text-center">{{ user.username }}</td>
                            <td class="px-4 py-2 border text-center">{{ user.email }}</td>
                            <td class="px-4 py-2 border text-center">
                                <button @click="destroy(user.id)">
                                    <svg
                                        class="w-5 h-5 text-red-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        />
                                    </svg>
                                </button>
                                <button class="ml-2" @click="edit(user.id)">
                                    <svg
                                        class="w-5 h-5 text-blue-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                        />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="flex justify-between">
                    <!-- <button
                        @click="prev"
                        :disabled="state.users.page == 1"
                        class="px-4 py-1 bg-blue-300 text-gray-800 rounded focus:outline-none"
                        :class="
                            state.users.page == 1
                                ? 'bg-blue-500'
                                : 'hover:bg-blue-400'
                        "
                    >
                        Prev
                    </button>
                    <button
                        @click="next"
                        :disabled="state.users.page == state.users.total_pages"
                        class="px-4 py-1 bg-blue-300 text-gray-800 rounded hover:bg-blue-400 focus:outline-none"
                        :class="
                            state.users.page == state.users.total_pages
                                ? 'bg-blue-500'
                                : 'hover:bg-blue-400'
                        "
                    >
                        Next
                    </button>-->
                </div>
            </div>
        </div>
    </div>
    <teleport to="#crudModal">
        <Modal v-if="isModalOpen" @close-modal="isModalOpen = false">
            <template #title>Add new user</template>
            <template #body>
                <form class="mt-5" @submit.prevent="create">
                    <div class="p-2">
                        <label class="text-gray-700">Name</label>
                        <input
                            class="my-1 w-full bg-gray-100 p-2 shadow rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                            type="text"
                            placeholder="Name"
                            v-model="state.form.name"
                        />
                    </div>
                    <div class="p-2">
                        <label class="text-gray-700">Username</label>
                        <input
                            class="my-1 w-full bg-gray-100 p-2 shadow rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                            type="text"
                            placeholder="Username"
                            v-model="state.form.username"
                        />
                    </div>
                    <div class="p-2">
                        <label class="text-gray-700">Email</label>
                        <input
                            class="my-1 w-full bg-gray-100 p-2 shadow rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                            type="email"
                            placeholder="Email address"
                            v-model="state.form.email"
                        />
                    </div>

                    <div class="p-2">
                        <button
                            class="px-2 py-1 my-2 bg-blue-500 text-white rounded shadow"
                            type="submit"
                        >Create</button>
                    </div>
                </form>
            </template>
        </Modal>
        <Modal v-if="isModalOpenEdit" @close-modal="isModalOpenEdit = false">
            <template #title>Edit user</template>
            <template #body>
                <form class="mt-5" @submit.prevent="update(state.form.id)">
                    <div class="p-2">
                        <label class="text-gray-700">Name</label>
                        <input
                            class="my-1 w-full bg-gray-100 p-2 shadow rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                            type="text"
                            placeholder="Name"
                            v-model="state.form.name"
                        />
                    </div>
                    <div class="p-2">
                        <label class="text-gray-700">Email</label>
                        <input
                            class="my-1 w-full bg-gray-100 p-2 shadow rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                            type="email"
                            placeholder="Email address"
                            v-model="state.form.email"
                        />
                    </div>
                    <div class="p-2">
                        <label class="text-gray-700">Username</label>
                        <input
                            class="my-1 w-full bg-gray-100 p-2 shadow rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                            type="text"
                            placeholder="Avatar url"
                            v-model="state.form.username"
                        />
                    </div>
                    <div class="p-2">
                        <button
                            class="px-2 py-1 my-2 bg-blue-500 text-white rounded shadow"
                            type="submit"
                        >Update</button>
                    </div>
                </form>
            </template>
        </Modal>
    </teleport>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import axios from "../plugins/axios";
import Modal from "../components/Modal";
export default {
    components: { Modal },
    setup() {
        const isModalOpen = ref(false);
        const isModalOpenEdit = ref(false);
        const state = reactive({
            users: {},
            form: {
                name: "",
                username: "",
                email: ""
            }
        });
        onMounted(async () => {
            try {
                const { data } = await axios.get("/users");
                state.users = data;
            } catch (e) {
                console.log(e);
            }
        });

        function openModal() {
            isModalOpen.value = true;
            if (state.form.name !== "") {
                state.form.name = "";
                state.form.username = "";
                state.form.email = "";
            }
        }

        const create = async () => {
            try {
                const { data } = await axios.post("/users", state.form);
                state.users.push(data);
                state.form.name = "";
                state.form.username = "";
                state.form.email = "";
                isModalOpen.value = false;
            } catch (e) {
                console.log(e);
            }
        };

        const destroy = async id => {
            state.users = state.users.filter(user => user.id !== id);
            // await axios.delete("users/" + id);
        };

        const edit = async id => {
            const { data } = await axios.get("users/" + id);
            state.form.name = data.name;
            state.form.username = data.username;
            state.form.email = data.email;
            isModalOpenEdit.value = true;
            if (isModalOpenEdit.value === false) {
                state.form.name = "";
                state.form.username = "";
                state.form.email = "";
            }
        };

        function update(id) {
            try {
                axios.put(`users/${id}`, state.form);
                state.form.name = "";
                state.form.username = "";
                state.form.email = "";
                isModalOpenEdit.value = false;
            } catch (e) {
                console.log(e);
            }
        }

        // const next = async () => {
        //     const { data } = await axios.get(`/users?page=2`);
        //     state.users = data;
        // };

        // const prev = async () => {
        //     const { data } = await axios.get(`/users?page=1`);
        //     state.users = data;
        // };

        return {
            state,
            // next,
            // prev,
            isModalOpen,
            create,
            destroy,
            edit,
            isModalOpenEdit,
            openModal,
            update
        };
    }
};
</script>