<template>
    <section
        @click="closeModal"
        class="z-20 h-screen w-screen bg-black opacity-50 fixed top-0 left-0"
    ></section>
    <div class="absolute inset-0">
        <div class="flex h-full">
            <div class="z-30 m-auto bg-white rounded-md shadow-lg p-5 w-1/3">
                <div class="flex flex-col">
                    <h1 class="text-2xl">
                        <slot name="title"></slot>
                    </h1>
                    <main>
                        <slot name="body"></slot>
                    </main>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    setup(_, {emit}) {
        const closeModal = () => {
            emit("close-modal");
        };

        return {closeModal}
    },
};
</script>

<style>
</style>