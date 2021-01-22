<template>
    <div class="m-auto">
        <h1 class="text-2xl text-center mb-3">Vue Calendar</h1>
        <section class="flex my-2 justify-between items-center">
            <h2 class="text-gray-600">
                {{ currentMonthName }}, {{ currentYear }}
            </h2>
            <div class="space-x-2">
                <button
                    class="rounded-r-none rounded-md bg-gray-200 px-2 text-gray-600"
                    @click="prev"
                >
                    Prev
                </button>
                <button
                    @click="next"
                    class="rounded-l-none rounded-md bg-gray-200 px-2 text-gray-600"
                >
                    Next
                </button>
            </div>
        </section>
        <section class="flex my-2 bg-red-300 rounded-xl text-white">
            <p
                class="text-center font-semibold"
                style="width: 14.28%"
                v-for="day in days"
                :key="day"
            >
                {{ day }}
            </p>
        </section>
        <section class="flex flex-wrap">
            <p
                class="text-center"
                style="width: 14.28%"
                v-for="num in startDay()"
                :key="num"
            ></p>
            <p
                class="text-center"
                style="width: 14.28%"
                v-for="num in daysInMont()"
                :key="num"
                :class="currentDateClass(num)"
            >
                {{ num }}
            </p>
        </section>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentDate: new Date().getUTCDate(), // ambil tanggal saat ini
            currentMonth: new Date().getMonth(), // bulan saat ini
            currentYear: new Date().getFullYear(), // tahun saat ini
            days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        };
    },

    methods: {
        daysInMont() {
            return new Date(
                this.currentYear,
                this.currentMonth + 1,
                0
            ).getDate();
        },

        startDay() {
            return new Date(this.currentYear, this.currentMonth, 1).getDay();
        },

        next() {
            if (this.currentMonth === 11) {
                this.currentMonth = 0;
                this.currentYear++;
            } else {
                this.currentMonth++;
            }
        },

        prev() {
            if (this.currentMonth === 0) {
                this.currentMonth = 11;
                this.currentYear--;
            } else {
                this.currentMonth--;
            }
        },

        currentDateClass(num) {
            const calendarFullDate = new Date(
                this.currentYear,
                this.currentMonth,
                num
            ).toDateString();
            const currentFullDate = new Date().toDateString();
            return calendarFullDate === currentFullDate
                ? "bg-blue-500 rounded-full text-white"
                : "";
        },
    },

    computed: {
        currentMonthName() {
            return new Date(this.currentYear, this.currentMonth).toLocaleString(
                "default",
                {
                    month: "long",
                }
            );
        },
    },
};
</script>