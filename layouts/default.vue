<template>
    <div class="grid grid-rows-[auto,auto,1fr] w-screen h-full grid-cols-1">

        <header class="fixed w-full top-0 z-10">
            <slot name="header" />
        </header>
        <main class="mt-16">
            <slot name="main" />
        </main>
        <footer class="mt-4">
            <slot name="footer" />
        </footer>
    </div>
</template>