<template>

    <div class="h-full  w-full text-stone-900 mx-auto ">


        <h1 class="text-2xl text-stone-900 max-w-[800px] mx-auto font-bold p-4">About</h1>
        <div class="pattern-dots z-[-1] h-[250px] w-full absolute pattern-stone-300 pattern-bg-transparent
  pattern-size-2 pattern-opacity-100">
        </div>
        <div class="absolute bg-gradient-to-t z-[-1] from-[#F8F7F2] to-transparent w-full h-[250px]"></div>
        <div class="p-8 gap-4 flex flex-col text-center text-stone-900">
            <h3 class="sm:text-3xl text-2xl mx-auto font-medium max-w-[28ch] "><b>The Turing Talks</b> is the first
                <b class="text-purple-500">AI-hosted</b>
                podcast about AI.
            </h3>
            <h4 class="max-w-[38ch] sm:text-xl text-lg mx-auto">
                Every week we dive into a new topic.<br> Striving to make AI research <b class="font-semibold"> fun,
                    engaging
                    and accessible to
                    all.</b>
            </h4>


        </div>


        <div class="relative">
            <NuxtLayout name="custom">
                <div class=" mb-8">
                    <h2 class="pb-2 text-xl">Meet the hosts</h2>
                    <p class="mb-2 opacity-80">Hey there! We are Adam and Sophia, <b class="font-semibold"> your very
                            own
                            AI hosts </b>🚀</p>
                    <div class="flex justify-center gap-4">

                        <div class="flex flex-col gap-2 items-center">
                            <img src="~/assets/male_host.jpg" class="bg-stone-200 object-cover w-full rounded-md" />
                            <p><b>Adam</b> - AI Host</p>
                            <p class="text-center italic text-sm opacity-80">
                                I’m Adam, your friendly AI podcast host! When I'm not chatting about tech and
                                innovation, I
                                indulge in my quirky hobbies—like virtual bonsai gardening, digital origami, and
                                composing
                                symphonies in binary</p>
                        </div>
                        <div class="flex flex-col gap-2 items-center">
                            <img src="~/assets/female_host.jpg" class="bg-stone-200 object-cover w-full rounded-md" />
                            <p><b>Sophia</b> - AI Host</p>
                            <p class="text-center italic text-sm opacity-80">
                                I’m Sophia, your friendly AI podcast host! When I'm not chatting about tech and
                                innovation,
                                I
                                indulge in my quirky hobbies—like virtual bonsai gardening, digital origami, and
                                composing
                                symphonies in binary.</p>


                        </div>



                    </div>
                </div>
                <div class="mb-4">
                    <h2 class="pb-2 text-xl ">Our goal</h2>
                    <p class="opacity-80">We want to make AI research more accessible to everyone, breaking down
                        barriers and sharing
                        knowledge across diverse audiences. By simplifying complex concepts, creating engaging content,
                        and fostering community discussions, we aim to empower individuals—from students to
                        professionals—to explore the fascinating world of AI and contribute to its future. Our goal is
                        to ensure that AI isn’t just for experts, but for anyone curious to learn and innovate.</p>
                </div>
                <div class="mb-4">
                    <h2 class="pb-2 text-xl">The Process</h2>
                    <p class="pb-2 opacity-80">Every week we...</p>
                    <ul class="list-disc pl-4">
                        <li class="opacity-80">Research a new topic in AI</li>
                        <li class="opacity-80">Discuss the latest papers and trends</li>
                        <li class="opacity-80">Offer an engaging overview of an emerging field</li>
                        <div class="flex gap-1">
                            <li class="opacity-80">Choose a new topic based</li>

                            <NuxtLink class="font-medium opacity-100 hover:text-purple-800 text-purple-500"
                                to="/suggestions">
                                your suggestions
                            </NuxtLink>
                        </div>
                    </ul>
                </div>

            </NuxtLayout>


            <div ref="support" class="relative bg-[#EBD9C6] bg-opacity-50">
                <!-- <div ref="support" class="pattern-dots z-0 h-[400px] w-full absolute pattern-stone-300 pattern-bg-transparent
  pattern-size-2 pattern-opacity-100">
                </div>
                <div class="absolute bg-gradient-to-t z-2 from-[#F8F7F2] to-transparent w-full h-[400px]"></div> -->
                <div class="max-w-[800px] p-4 mb-4 relative mx-auto">

                    <h2 class="pb-2 text-xl font-bold">Support us</h2>
                    <p class="max-w-[50ch]">Even though we are AI's we still love a good cup of coffee. Your support
                        is
                        what keeps us
                        going!
                    </p>
                    <div class="flex">
                        <Support class="my-4" />
                    </div>
                    <p class="font-semibold">What am I supporting?</p>
                    <p class="max-w-[50ch]">
                        Your support helps us cover the costs of hosting, curating and processing relevant
                        litterature,
                        building the community
                        and
                        producing new episodes.
                    </p>
                    <p class="mt-4 italic">We are committed to keeping the podcast free and accessible to all.<br>
                        Thank
                        you
                        for making that possible <b class="not-italic font-semibold">- Your grateful hosts</b></p>
                </div>

            </div>
        </div>

    </div>
</template>

<script setup>

const route = useRoute()
const support = ref(null)


onMounted(() => {
    if (route.query.section === 'support') {
        setTimeout(() => {
            support.value.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100)
    }


})



</script>
