<template>
    <div class="m-auto">
        <h1 class="text-center text-2xl">Marvel Heroes {{ heroCount }}</h1>
        <ul class="my-5">
            <li
                class="flex justify-between py-2 px-4 bg-white mb-2 rounded-md shadow text-gray-700"
                v-for="(hero, index) in marvelHero"
                :key="hero.name"
            >
                <div>
                    {{ hero.name }}
                </div>
                <button
                    @click="removeHero(index)"
                    class="focus:outline-none focus:border-transparent"
                >
                    <svg
                        class="w-4 h-4 text-red-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                    </svg>
                </button>
            </li>
        </ul>
        <form @submit.prevent="addHero()" class="space-x-2">
            <input
                class="bg-white rounded-md shadow-md text-gray-800 p-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                v-model="newHero"
                ref="heroRef"
                placeholder="Type name hero here"
            />
            <button
                type="submit"
                class="bg-blue-600 text-white rounded-md p-2 shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 focus:ring-offset-2"
            >
                Add Hero
            </button>
        </form>
    </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
export default {
    setup() {
        const heroRef = ref("");
        const newHero = ref("");
        const marvelHero = ref([
            { name: "Captain America" },
            { name: "Iron Man" },
            { name: "Hulk" },
            { name: "Black Widow" },
        ]);

        onMounted(() => {
            heroRef.value.focus();
        });

        const heroCount = computed({
            get: () => marvelHero.value.length,
        });

        function addHero() {
            if (newHero.value !== "") { // check if the input text is not empty
                marvelHero.value.unshift({ name: newHero.value }); // push to marvekHero object with first order use unshift function 
                newHero.value = ""; // clear the input text after submit
            }
        }

        function removeHero(index) {
            marvelHero.value = marvelHero.value.filter((hero, i) => i != index);
        }

        return {
            newHero,
            marvelHero,
            heroRef,
            heroCount,
            addHero,
            removeHero,
        };
    },
};
</script>