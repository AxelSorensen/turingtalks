<template>
  <div>
    <div v-show="show_modal"
      class="bg-black flex justify-center items-center bg-opacity-20 z-[200] fixed h-screen w-full">
      <LoginModal ref="modal" />

    </div>
    <NuxtLayout>

      <template #header>
        <Header />
      </template>
      <template #main>

        <NuxtLoadingIndicator color="black" />
        <NuxtPage />
      </template>
      <template #footer>
        <Footer />
      </template>


    </NuxtLayout>
  </div>

</template>
<script setup>
import { onClickOutside } from '@vueuse/core';
const show_modal = useState('show_modal', () => false)
const modal = ref(null)
onClickOutside(modal, event => show_modal.value = false);


</script>

<style></style>
