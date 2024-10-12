<template>

    <div class="grid max-w-[800px] mx-auto grid-rows-[auto,auto,auto,] h-full grid-cols-1 justify-center items-center">
        <div class="flex flex-col items-center p-8">
            <h1 class="sm:text-5xl text-4xl font-bold">The Turing Talks</h1>
            <h2 class="text-lg">The first AI-hosted podcast about AI</h2>
        </div>
        <Cog />
        <div class="flex px-2 flex-col  items-center">
            <h2 class="sm:text-3xl text-2xl font-bold">What should we cover next?</h2>
            <PostSuggestion />
        </div>
        <div class="px-4 pt-2">
            <h2 class="pb-2 text-xl">Featured talks</h2>
            <Cards :items="featured_episodes" :limit="featured_limit" />
            <div v-if="featured_limit == 2" @click="showMoreTalks"
                class="text-center hover:text-purple-700 cursor-pointer pt-2 text-sm text-purple-500">
                See more
            </div>
            <NuxtLink to="/catalogue" v-else @click="showMoreSuggested">
                <div
                    class="text-center hover:text-purple-700 rounded-sm bg-purple-100 p-2 mt-2 cursor-pointer pt-2 text-sm text-purple-500">
                    See all episodes
                </div>
            </NuxtLink>
        </div>

        <div class="flex px-4 p-2 justify-start  flex-col">
            <h2 class="pb-2 text-xl">Suggested topics</h2>
            <TopicList :limit="suggested_limit" />
            <div v-if="suggested_limit == 3" @click="showMoreSuggested"
                class="text-center hover:text-purple-700 cursor-pointer pt-2 text-sm text-purple-500">
                See more
            </div>
            <NuxtLink to="/catalogue" v-else @click="showMoreSuggested">
                <div
                    class="text-center hover:text-purple-700 rounded-sm bg-purple-100 p-2 mt-2 cursor-pointer pt-2 text-sm text-purple-500">
                    See all suggested topics
                </div>
            </NuxtLink>

        </div>


    </div>
</template>

<script setup>
// const topics = ref([{ name: 'About superposition', votes: 10 }])
// come up with featured episodes 3 of them
const featured_episodes = ref([
    {
        name: 'About superposition',
        description: 'A talk about superposition. This episode delves into the fascinating concept of superposition in quantum mechanics. We explore how particles can exist in multiple states at once. The discussion includes real-world applications and implications. Experts share their insights on the future of quantum technologies. Tune in to understand the mysteries of the quantum world.',
        id: 1
    },
    {
        name: 'Quantum Computing',
        description: 'A talk about quantum computing. This episode covers the basics and advancements in quantum computing. We discuss how quantum computers differ from classical ones. The potential impact on various industries is explored. Experts provide their perspectives on current research and future developments. Learn about the challenges and opportunities in this cutting-edge field.',
        id: 2
    },
    {
        name: 'Quantum Cryptography',
        description: 'A talk about quantum cryptography. This episode explains the principles of quantum cryptography. We discuss how it promises unbreakable encryption. The conversation includes potential applications in cybersecurity. Experts weigh in on the current state of research. Discover the future of secure communication in the quantum era.',
        id: 3
    },
    {
        name: 'Quantum Sensing',
        description: 'A talk about quantum sensing. This episode explores the field of quantum sensing. We delve into the principles behind quantum sensors. The discussion includes applications in various domains. Experts share their insights on the latest developments and future prospects. Tune in to learn about the cutting-edge technologies in quantum sensing.',
        id: 4
    },

])

const showMoreTalks = () => {
    featured_limit.value = 8
}


const showMoreSuggested = () => {
    suggested_limit.value = 6
}

const suggested_limit = ref(3)
const featured_limit = ref(2)

</script>

<style lang="scss" scoped></style>