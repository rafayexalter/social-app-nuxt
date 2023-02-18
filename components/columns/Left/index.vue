<template>
  <div class="h-screen flex flex-col">
    <div
      class="p-2 my-2 hover:bg-blue-50 rounded-full w-min dark:hover:bg-white/20"
      :class="defaultTransition"
    >
      <nuxt-link to="/">
        <div class="w-8 h-8">
          <LogoTwitter />
        </div>
      </nuxt-link>
    </div>

    <div class="mt-2 space-y-3">
      <ColumnsLeftTab active>
        <template v-slot:icon>
          <HomeIcon />
        </template>
        <template v-slot:name> Home </template>
      </ColumnsLeftTab>

      <ColumnsLeftTab>
        <template v-slot:icon>
          <HashtagIcon />
        </template>
        <template v-slot:name> Explore </template>
      </ColumnsLeftTab>

      <ColumnsLeftTab>
        <template v-slot:icon>
          <BellIcon />
        </template>
        <template v-slot:name> Notifications </template>
      </ColumnsLeftTab>

      <ColumnsLeftTab>
        <template v-slot:icon>
          <InboxIcon />
        </template>
        <template v-slot:name> Messages </template>
      </ColumnsLeftTab>

      <ColumnsLeftTab>
        <template v-slot:icon>
          <BookmarkIcon />
        </template>
        <template v-slot:name> Bookmarks </template>
      </ColumnsLeftTab>

      <ColumnsLeftTab>
        <template v-slot:icon>
          <DocumentTextIcon />
        </template>
        <template v-slot:name> List </template>
      </ColumnsLeftTab>

      <ColumnsLeftTab>
        <template v-slot:icon>
          <UserIcon />
        </template>
        <template v-slot:name> Profile </template>
      </ColumnsLeftTab>

      <ColumnsLeftTab>
        <template v-slot:icon>
          <DotsCircleHorizontalIcon />
        </template>
        <template v-slot:name> More </template>
      </ColumnsLeftTab>

      <div class="hidden xl:block">
        <UIButton liquid size="lg">
          <span class="font-bold"> Tweet </span>
        </UIButton>
      </div>

      <div class="block xl:hidden">
        <UIButton>
          <div class="w-6 h-6 font-bold">
            <PencilIcon />
          </div>
        </UIButton>
      </div>
    </div>
  </div>
</template>
<script setup>
import { HomeIcon } from "@heroicons/vue/solid";
import {
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  DocumentTextIcon,
  UserAddIcon,
  DotsCircleHorizontalIcon,
  UserIcon,
  PencilIcon,
} from "@heroicons/vue/outline";
const { defaultTransition } = useTailwindConfig();
</script>
