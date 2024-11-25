<template>
    <div class="">

        <h1 class="text-xl text-center">New Episode Drops In</h1>
        <div v-if="!countdown" class="text-center mt-4 mb-4 animate-pulse font-bold text-4xl">
            Loading...
        </div>
        <div v-else-if="countdown == '00:00:00:00'">
            <div class="text-2xl text-center my-4 font-bold">To Be Announced</div>
        </div>

        <div v-else class="text-center m-4 mb-4 font-bold text-4xl">

            <div class="flex justify-center gap-10">
                <div class="flex flex-col" v-for="(num, id) in countdown">
                    <div class="">{{ num }}</div>
                    <div class="text-sm text-stone-500">{{ label[id] }}</div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>

const countdown = ref(null)
const label = ['Days', 'Hours', 'Minutes', 'Seconds']

onMounted(async () => {

    const episode_date = await useCountdown('next-episode');

    countdown.value = timeUntil(episode_date.seconds * 1000);

    // Store the interval ID in a variable
    const intervalId = setInterval(() => {
        countdown.value = timeUntil(episode_date.seconds * 1000);
    }, 1000);

    // Clear interval when component is unmounted
    onUnmounted(() => {
        clearInterval(intervalId);
    });
});


</script>

<style lang="scss" scoped></style>