<template>
    <div class="grid grid-rows-[auto,1fr,auto] w-screen h-screen   grid-cols-1">

        <header class="fixed w-full top-0 z-10">
            <slot name="header" />
        </header>
        <main class="mt-16">
            <slot name="main" />
        </main>
        <footer v-if="route.path != '/signup'" class="mt-4 ">
            <slot name="footer" />
        </footer>
    </div>
</template>
<script setup>
const route = useRoute()
</script>