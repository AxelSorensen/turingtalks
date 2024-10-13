<template>
    <div class="grid grid-rows-[auto,1fr] w-screen h-screen grid-cols-1">
        <header class="sticky top-0 z-50 p-4  backdrop-blur-xl">
            <slot name="header" />
        </header>
        <main class="" name="main">
            <slot />
        </main>
        <footer class="bg-[#F8F7F2]">
            <slot name="footer" />
        </footer>
    </div>
</template>