<template>
    <div class="w-full m-auto relative">
        <div v-for="(color, index) in sliders" :key="color">
            <transition name="fade">
                <div
                    v-if="currentSlide == index"
                    class="absolute w-full h-96"
                    :class="color"
                ></div>
            </transition>
        </div>
        <div class="absolute w-full h-96 flex justify-center">
            <div class="absolute bottom-0 mb-4 space-x-3">
                <button
                    v-for="(slider, index) in sliders"
                    :key="slider"
                    @click="makeActive(index)"
                    :class="
                        currentSlide == index ? 'bg-gray-800' : 'bg-gray-200'
                    "
                    class="w-4 h-4 rounded-full"
                ></button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentSlide: 0,
            sliders: ["bg-red-400", "bg-blue-400", "bg-yellow-400"],
            intervalSlide: "",
            isShowingSlide: true,
        };
    },

    methods: {
        makeActive(index) {
            this.currentSlide = index;
        },
    },

    mounted() {
        this.intervalSlide = setInterval(() => {
            // this.currentSlide = this.currentSlide === 2 ? 0 : this.currentSlide + 1;
            if (this.currentSlide === 2) {
                this.currentSlide = 0;
            } else {
                this.currentSlide++;
            }
        }, 3000);
    },

    beforeUnmount() {
        clearInterval(this.intervalSlide);
    },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: all 1s ease;
}

.fade-enter-from {
    opacity: 0;
    transform: translateX(-100%);
}
.fade-leave-to {
    opacity: 0;
    transform: translateX(100%);
}
</style>