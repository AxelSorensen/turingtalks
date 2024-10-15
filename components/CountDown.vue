<template>
    <div class="p-8">
        <h1 class="text-2xl  pb-4 text-center">Next Episode Drops In</h1>
        <div v-if="!countdown" class="text-center animate-pulse font-bold text-4xl">
            Loading...
        </div>
        <div v-else class="text-center font-bold text-4xl"> {{ countdown }}</div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped></style>