<template>
  <div>
    <div v-show="show_login_modal" class="bg-black flex justify-center bg-opacity-20 z-[200] fixed h-dvh w-full">
      <LoginModal ref="modal" />
    </div>

    <div v-if="show_subscribe_modal" class="bg-black flex justify-center bg-opacity-20 z-[200] fixed h-dvh w-full">
      <SubscribeModal ref="subscribe_modal" />
    </div>
    <div v-if="show_unsubscribe_modal" class="bg-black flex justify-center bg-opacity-20 z-[200] fixed h-dvh w-full">
      <UnsubscribeModal ref="unsubscribe_modal" />
    </div>
    <div v-if="show_delete_user_modal" class="bg-black flex justify-center bg-opacity-20 z-[200] fixed h-dvh w-full">
      <DeleteUserModal ref="delete_user_modal" />
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

import { onAuthStateChanged, getAuth } from 'firebase/auth';
const show_login_modal = useState('show_login_modal', () => false)
const show_subscribe_modal = useState('show_subscribe_modal', () => false)
const show_unsubscribe_modal = useState('show_unsubscribe_modal', () => false)
const show_delete_user_modal = useState('show_delete_user_modal', () => false)
const modal = ref(null)
const subscribe_modal = ref(null)
const unsubscribe_modal = ref(null)
const delete_user_modal = ref(null)
const user = useCookie('user')
onClickOutside(modal, event => show_login_modal.value = false);
onClickOutside(subscribe_modal, event => show_subscribe_modal.value = false);
onClickOutside(unsubscribe_modal, event => show_unsubscribe_modal.value = false);
onClickOutside(delete_user_modal, event => show_delete_user_modal.value = false);
const auth = getAuth()
const { refresh } = useMySuggestions('my_suggestions')
onAuthStateChanged(auth, (user) => {
  refresh()
  refreshNuxtData('favorites')
})
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
