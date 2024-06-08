<template>
  <div class="tw-m-2 tw-bg-white tw-shadow-lg hover:tw-bg-slate-200 tw-rounded-2xl" @click="open">
    <div class="tw-flex tw-font-mont">
      <q-img :src="item.image_url ? item.image_url : '/no-photo.png'" placeholder-src="/no-photo.png" class="tw-h-44 tw-w-56 tw-rounded-l-2xl" />
      <div class="tw-ml-4 tw-w-full tw-flex tw-flex-col">
        <div class="tw-flex">
          <div v-if="!item.id">
            <q-skeleton class="tw-w-[300px] tw-text-xl" type="text"></q-skeleton>
          </div>
          <div
            v-else
            class="tw-text-xl tw-font-medium tw-overflow-hidden tw-whitespace-nowrap tw-max-w-[300px] tw-text-ellipsis">
            {{ item.title }}
          </div>
          <q-btn
            v-if="userStore.isLoggedIn && item.id"
            class="tw-ml-auto tw-rounded-2xl"
            :color="userStore.userNative?.favorites.includes(item.id) ? 'red-5' : 'black'"
            flat
            :icon="userStore.userNative?.favorites.includes(item.id) ? 'favorite' : 'favorite_border'"
            @click.stop="addToFavorites"></q-btn>
        </div>

        <div v-if="!item.id">
          <q-skeleton class="tw-w-[300px]" type="text"></q-skeleton>
        </div>
        <div
          v-else
          class="tw-font-medium tw-mt-1 tw-overflow-hidden tw-max-w-[300px] tw-whitespace-nowrap tw-text-ellipsis">
          {{ item.description }}
        </div>

        <div class="tw-mt-auto tw-mb-2">
          <div v-if="!item.id">
            <q-skeleton class="tw-w-[150px]" type="text"></q-skeleton>
            <q-skeleton class="tw-w-[150px]" type="text"></q-skeleton>
          </div>
          <div v-else>
            <div>{{ item.animal + ", " + item.status }}</div>
            <div>{{ $t('date') }} : {{ item.dateCreated }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ScrapItem } from "../class/ScrapItem";
import { useUserStore } from "../stores/userStore";

const props = defineProps({ item: ScrapItem });

const userStore = useUserStore();
const router = useRouter();


const open = () => {
  router.push({ name: "scrapitem", params: { id: props.item.id } });
};

const addToFavorites = async () => {
  if (userStore.userNative.favorites.includes(props.item.id)) {
    let index = userStore.userNative.favorites.indexOf(props.item.id);
    if (index !== -1) {
      userStore.userNative.favorites.splice(index, 1);
      await userStore.userNative.update();
    }
  } else {
    userStore.userNative.favorites.push(props.item.id);
    await userStore.userNative.update();
  }
};
</script>
