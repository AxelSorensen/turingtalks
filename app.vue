<template>
  <div>
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


</script>

<style></style>
