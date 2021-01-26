<template>
    <div class="w-full m-auto mb-3">
        <h1 class="text-center text-2xl">Vue Markdown</h1>
    </div>
    <div class="flex w-full">
        <section class="flex w-10/12 m-auto h-96 shadow-lg">
            <article
                class="w-1/2 border rounded-xl rounded-r-none bg-transparent"
            >
                <textarea
                    class="rounded-xl p-4 text-gray-500 rounded-r-none w-full h-full focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent"
                    ref="markdownRef"
                    :value="text"
                    @input="update"
                ></textarea>
            </article>
            <article
                class="w-1/2 border p-4 text-gray-500 bg-white rounded-xl rounded-l-none"
                v-html="markedText"
            ></article>
        </section>
    </div>
</template>

<script>
import marked from "marked";
import useDebounce from "../utilities/composition/useDebounce";
export default {
    data() {
        return {
            text: "",
            debounce: "",
        };
    },

    computed: {
        markedText() {
            return marked(this.text);
        },
    },

    methods: {
        update(e) {
            const task = () => (this.text = e.target.value);
            this.debounce(task, 500);
        },
    },

    mounted() {
        const { debounce } = useDebounce();
        this.debounce = debounce;
        this.$refs.markdownRef.focus();
    },
};
</script>

<style></style>
