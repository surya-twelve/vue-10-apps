<template>
    <div class="flex flex-col w-full my-4">
        <div class="m-auto">
            <div class="my-3">
                <h2 class="text-2xl text-center my-4 text-gray-800">Tensorflow Object Detection</h2>
                <div class="flex flex-col justify-center">
                    <div class="text-center">
                        <div class="flex space-x-2">
                            <button
                                v-if="!isStreaming"
                                @click="openCamera"
                                class="w-full mb-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg shadow-md hover:bg-blue-500 transition transition-color focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-offset-1"
                            >Open Camera</button>

                            <button
                                v-else
                                @click="stopStreaming"
                                class="w-full mb-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg shadow-md hover:bg-blue-500 transition transition-color focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-offset-1"
                            >Stop Streaming</button>

                            <button
                                @click="snapshot"
                                class="w-full mb-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg shadow-md hover:bg-blue-500 transition transition-color focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-offset-1"
                            >Take foto</button>
                        </div>
                    </div>

                    <div class="flex justify-center w-full space-x-1 h-52">
                        <video ref="videoRef" autoplay="true" width="300" />
                        <img
                            class="text-center"
                            ref="imgRef"
                            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
                            width="300"
                            crossorigin="anonymous"
                        />
                    </div>
                    <div class="mt-3">
                        <button
                            @click="detect"
                            class="w-full mb-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg shadow-md hover:bg-blue-500 transition transition-color focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-offset-1"
                            :class="
                                    !isLoading ? 'focus:ring-opacity-0' : ''
                                "
                        >
                            <span v-if="!isLoading">Detect</span>
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
                                        />
                                    </circle>
                                </svg>
                            </span>
                        </button>
                    </div>

                    <div v-if="result.length > 0">
                        <h3
                            class="text-center my-3 text-xl font-semibold p-2 text-green-500 uppercase"
                        >{{ result[0].class }}</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from "vue";
require("@tensorflow/tfjs-backend-cpu");
require("@tensorflow/tfjs-backend-webgl");
const cocoSsd = require("@tensorflow-models/coco-ssd");
export default {
    setup() {
        const imgRef = ref("");
        const videoRef = ref("");
        const result = ref([]);
        const isLoading = ref(false);
        const isStreaming = ref(false);

        async function detect() {
            isLoading.value = true;
            const img = imgRef.value;
            const model = await cocoSsd.load();
            const predictions = await model.detect(img);
            if (predictions[0].class === "person") {
                predictions[0].class = "rido jancuk wkwk";
                // result.value = "rido jancuk wkwk";
            }
            result.value = predictions;
            if (result.value !== []) {
                isLoading.value = false;
            }
            console.log("Predictions: ");
            console.log(predictions);
        }

        async function openCamera() {
            if (navigator.mediaDevices.getUserMedia) {
                const devices = await navigator.mediaDevices.enumerateDevices();
                const cams = devices.filter(
                    device => device.kind === "videoinput"
                );
                const camId = cams[0].deviceId;
                navigator.mediaDevices
                    .getUserMedia({ video: { deviceId: { exact: camId } } })
                    .then(stream => {
                        isStreaming.value = true;
                        videoRef.value.srcObject = stream;
                    });
            }
        }

        function stopStreaming() {
            const stream = videoRef.value.srcObject;
            const tracks = stream.getTracks();
            tracks.map(track => track.stop());
            isStreaming.value = false;
        }

        function snapshot() {
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            context.drawImage(videoRef.value, 0, 0, 270, 150);
            const data = canvas.toDataURL("image/png");
            imgRef.value.setAttribute("src", data);
        }

        return {
            imgRef,
            result,
            isLoading,
            detect,
            openCamera,
            videoRef,
            isStreaming,
            stopStreaming,
            snapshot
        };
    }
};
</script>

<style>
</style>