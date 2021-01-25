<template>
    <section class="flex w-full mt-4">
        <div class="m-auto">
            <h1 class="text-2xl text-center">Vue Calculator</h1>
            <p
                class="text-3xl text-right mt-10 w-44 h-12 overflow-x-scroll"
                style="direction: rtl"
            >
                {{ currentNum }}
            </p>
            <div class="h-5">
                <small v-if="selectedOperation"
                    >{{ prevNum }} {{ selectedOperation }} {{ currentNum }}
                </small>
            </div>
            <div class="mt-2 grid grid-cols-4 gap-1">
                <button
                    @click="pressed('1')"
                    class="p-2 w-10 h-10 shadow rounded"
                >
                    1
                </button>
                <button
                    @click="pressed('2')"
                    class="p-2 w-10 h-10 shadow rounded"
                >
                    2
                </button>
                <button
                    @click="pressed('3')"
                    class="p-2 w-10 h-10 shadow rounded"
                >
                    3
                </button>
                <button
                    @click="pressed('+')"
                    class="p-2 w-10 h-10 shadow rounded bg-yellow-600 text-white"
                >
                    +
                </button>
                <button
                    @click="pressed('4')"
                    class="p-2 w-10 h-10 shadow rounded"
                >
                    4
                </button>
                <button
                    @click="pressed('5')"
                    class="p-2 w-10 h-10 shadow rounded"
                >
                    5
                </button>
                <button
                    @click="pressed('6')"
                    class="p-2 w-10 h-10 shadow rounded"
                >
                    6
                </button>
                <button
                    @click="pressed('-')"
                    class="p-2 w-10 h-10 shadow rounded bg-yellow-600 text-white"
                >
                    -
                </button>
                <button
                    @click="pressed('7')"
                    class="p-2 w-10 h-10 shadow rounded"
                >
                    7
                </button>
                <button
                    @click="pressed('8')"
                    class="p-2 w-10 h-10 shadow rounded"
                >
                    8
                </button>
                <button
                    @click="pressed('9')"
                    class="p-2 w-10 h-10 shadow rounded"
                >
                    9
                </button>
                <button
                    @click="pressed('*')"
                    class="p-2 w-10 h-10 shadow rounded bg-yellow-600 text-white"
                >
                    *
                </button>
                <button @click="pressed('c')" class="p-2 h-10 shadow rounded">
                    C
                </button>
                <button @click="pressed('0')" class="p-2 h-10 shadow rounded">
                    0
                </button>
                <button
                    @click="pressed('=')"
                    class="p-2 w-10 h-10 shadow rounded bg-gray-600 text-white"
                >
                    =
                </button>
                <button
                    @click="pressed('/')"
                    class="p-2 w-10 h-10 shadow rounded bg-yellow-600 text-white"
                >
                    /
                </button>
            </div>
        </div>
    </section>
</template>

<script>
import { onMounted, onUnmounted, ref } from "vue";
export default {
    setup() {
        const operations = ["+", "-", "*", "/"];
        const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
        const currentNum = ref("");
        const prevNum = ref("");
        const selectedOperation = ref("");

        const pressed = (value) => {
            if (value === "=" || value === "Enter") calculate();
            else if (value === "c") clear();
            else if (operations.includes(value)) applyOperation(value);
            else if (numbers.includes(value)) appendNumber(value);
        };

        const appendNumber = (value) => {
            currentNum.value = currentNum.value + value;
        };

        const applyOperation = (value) => {
            calculate();
            prevNum.value = currentNum.value;
            currentNum.value = "";
            selectedOperation.value = value;
        };

        const calculate = () => {
            if (selectedOperation.value === "*") {
                currentNum.value = prevNum.value * currentNum.value;
            } else if (selectedOperation.value === "+") {
                currentNum.value = +prevNum.value + +currentNum.value;
            } else if (selectedOperation.value === "-") {
                currentNum.value = prevNum.value - currentNum.value;
            } else if (selectedOperation.value === "/") {
                currentNum.value = prevNum.value / currentNum.value;
            }

            prevNum.value = "";
            selectedOperation.value = "";
        };

        const clear = () => {
            currentNum.value = "";
            prevNum.value = "";
            selectedOperation.value = "";
        };

        const handleKeyEvent = (e) => pressed(e.key);
        onMounted(() => window.addEventListener("keydown", handleKeyEvent));
        onUnmounted(() =>
            window.removeEventListener("keydown", handleKeyEvent)
        );

        return { currentNum, pressed, prevNum, selectedOperation };
    },
};
</script>