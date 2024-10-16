<template>
    <div class="">
        <h1 class="text-xl text-center">New Episode Drops In</h1>
        <div v-if="!countdown" class="text-center animate-pulse font-bold text-4xl">
            Loading...
        </div>
        <div v-else class="text-center font-bold text-4xl"> {{ countdown }}</div>
    </div>
</template>

<script setup>
const countdown = ref(null)

onMounted(() => {
    let now = new Date();
    now.setHours(now.getHours() + 1);
    setInterval(() => {

        countdown.value = timeUntil(now);
    }, 1000)
})


</script>

<style lang="scss" scoped></style>