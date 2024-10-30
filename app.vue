<template>
  <div>
    <div v-show="show_modal" class="bg-black flex justify-center bg-opacity-20 z-[200] fixed h-dvh w-full">
      <LoginModal ref="modal" />
    </div>
    <div class="p-3  z-[20] fixed  w-full">
      <Transition name="toast">
        <Toast />
      </Transition>
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

<style>
.toast-move,
.toast-enter-active,
.toast-leave-active {
  transition: all .3s ease;

}


/* Define enter and leave animations */
.toast-enter-from {
  opacity: 0;
  transform: translateY(-60px)
}

.toast-enter-to {
  opacity: 1;
  transform: translateY(0)
}

.toast-leave-from {
  opacity: 1;
  transform: translateY(0)
}

.toast-leave-to {
  opacity: 0;
  transform: translateY(-60px)
}

/* Fix the leaving item's layout during animation */
</style>
