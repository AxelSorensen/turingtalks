<template>
    <div class="grid grid-rows-[auto,auto,1fr] w-screen h-full grid-cols-1">
        <header class="sticky top-0 z-10">
            <slot name="header" />
        </header>
        <main class="">
            <slot name="main" />
        </main>
        <footer class="mt-20 ">
            <slot name="footer" />
        </footer>
    </div>
</template>