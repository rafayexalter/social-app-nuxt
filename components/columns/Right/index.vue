<template>
  <div class="flex flex-col">
    <!-- Preview Card : What's happening -->
    <ColumnsRightPreviewCard title="What's happening">
      <ColumnsRightPreviewCardItem
        v-for="whatsHappening in whatsHappeningItems"
      >
        <div>
          <h2 class="font-bold text-gray-800 text-md dark:text-white">
            {{ whatsHappening.title }}
          </h2>
          <p class="text-xs text-gray-400">{{ whatsHappening.count }}</p>
        </div>
      </ColumnsRightPreviewCardItem>
    </ColumnsRightPreviewCard>

    <!-- Preview Card : Who to follow -->
    <ColumnsRightPreviewCard title="Who to follow">
      <ColumnsRightPreviewCardItem v-for="whoToFollow in whoToFollowItems">
        <div class="flex flex-row justify-between p-2 items-center">
          <div class="flex flex-row">
            <img
              :src="whoToFollow.img"
              :alt="whoToFollow.name"
              class="w-10 h-10 rounded-full"
            />

            <div class="flex flex-col ml-2">
              <h1 class="text-sm font-bold text-gray-900 dark:text-white">
                {{ whoToFollow.name }}
              </h1>
              <p class="text-xs text-gray-400">{{ whoToFollow.handle }}</p>
            </div>
          </div>

          <div class="flex h-full">
            <button
              class="px-4 py-2 font-bold text-xs text-white dark:text-black bg-black dark:bg-white rounded-full"
            >
              Follow
            </button>
          </div>
        </div>
      </ColumnsRightPreviewCardItem>
    </ColumnsRightPreviewCard>
  </div>
</template>
<script setup>
const whatsHappeningItems = ref([
  {
    title: "#SpaceX",
    count: "18.8k Tweets",
  },
  {
    title: "#CodingIsFun",
    count: "18.8k Tweets",
  },
  {
    title: "#VueNuxt",
    count: "18.8k Tweets",
  },
]);

const whoToFollowItems = ref([
  {
    name: "Joe Biden",
    handle: "@joebiden",
    img: "https://picsum.photos/200/200",
  },
  {
    name: "Joe's Dad",
    handle: "@joesdaddy",
    img: "https://picsum.photos/200/200",
  },
]);
</script>
