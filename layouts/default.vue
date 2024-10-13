<template>
    <div class="grid grid-rows-[auto,1fr] w-screen h-full grid-cols-1">
        <header class="sticky top-0 z-50 p-4  backdrop-blur-xl">
            <slot name="header" />
        </header>
        <main class="" name="main">
            <slot />
        </main>
        <footer class=" mt-20 ">
            <slot name="footer" />
        </footer>
    </div>
</template>