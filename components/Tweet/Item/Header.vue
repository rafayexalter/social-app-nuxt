<template>
  <div class="flex p-4">
    <div>
      <img :src="author.profileImage" class="w-10 h-10 rounded-full" />
    </div>

    <div class="ml-3">
      <span class="font-medium">{{ author.fname }}</span>

      <span class="ml-3 text-sm font-medium text-gray-400">
        <nuxt-link to="#">{{ author.handle }}</nuxt-link>
        . {{ props.tweet.postedAtHuman }}
      </span>

      <p v-if="props.tweet.replyTo" class="text-sm">
        <span class="text-gray-500"> Replying to </span>
        <nuxt-link :to="replyToTweetUrl" class="text-blue-400">
          {{ props.tweet.replyTo.author.handle }}
        </nuxt-link>
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  tweet: {
    type: Object,
    required: true,
  },
});

const author = props.tweet.author;
const replyToTweetUrl = computed(() => `/status/${props.tweet?.replyTo?.id}`);
</script>
