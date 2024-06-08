<template>
  <div class="tw-bg-gradient-to-br tw-from-[#F4CB38] tw-to-[#F4A938] tw-min-h-screen">
    <navigation-panel class="tw-pt-8"></navigation-panel>

    <div class="tw-flex tw-justify-center tw-mt-12 tw-font-mont">
      <div class="tw-bg-[#FCF8EF] tw-w-[1758.05px] tw-rounded-3xl tw-p-8 tw-flex tw-flex-col tw-gap-2">
        <div class="tw-flex">
          <div class="tw-p-4 tw-flex-grow">
            <div class="tw-flex">
              <div class="tw-mr-2">Опубликовано :</div>
              <div v-if="!item.id">
                <q-skeleton class="tw-w-[140px]" type="text"></q-skeleton>
              </div>
              <div v-else>
                {{ item.dateCreated }}
              </div>
            </div>
            <div class="tw-font-bold tw-text-4xl tw-max-w-[720px]">
              <div v-if="!item.id">
                <q-skeleton class="tw-w-full" type="text"></q-skeleton>
              </div>
              <div v-else>
                {{ item.title }}
              </div>
            </div>
            <div class="tw-flex tw-mt-1">
              <div class="tw-w-10 tw-flex tw-flex-col tw-justify-center">
                <q-img v-if="item.image_url" :src="item.image_url" class="tw-w-[720px] tw-h-[720px] tw-shadow-lg"></q-img>
                <q-img v-else :src="'/no-photo.png'" placeholder-src="/no-photo.png" class="tw-w-[720px] tw-h-[720px] tw-shadow-lg"
                       style="opacity: 1; border: none;"></q-img>
              </div>
            </div>
            <div v-if="item.post_url" class="tw-text-right tw-mt-2">
              <a :href="item.post_url" target="_blank" class="tw-text-blue-500">Перейти к объявлению</a>
            </div>
          </div>
          <div class="tw-p-4 tw-flex-shrink-0 tw-flex tw-flex-col tw-items-end">
            <q-btn
              v-if="imagesURLs.length > 1"
              icon="keyboard_arrow_left"
              flat
              size="xl"
              @click="selectedImage = selectedImage - 1 === -1 ? imagesURLs.length - 1 : selectedImage - 1"
            />
            <q-btn
              v-if="imagesURLs.length > 1"
              icon="keyboard_arrow_right"
              flat
              size="xl"
              @click="selectedImage = (selectedImage + 1) % imagesURLs.length"
            />
          </div>
        </div>
        <div class="tw-font-bold tw-text-2xl">Описание</div>
        <div class="tw-border tw-p-2">
          <div v-if="!item.id">
            <q-skeleton class="tw-w-1/2" type="text"></q-skeleton>
          </div>
          <div v-else class="tw-break-words">{{ item.description ? item.description : "Описание отсутствует." }}</div>
        </div>
        <div v-if="imagesURLs.length > 1" class="tw-flex tw-p-1">
          <q-img
            v-for="(url, index) in imagesURLs"
            :src="url"
            :key="url"
            class="tw-h-16 tw-w-24 tw-border tw-opacity-50"
            :class="{ 'tw-border-amber-500 tw-opacity-100': index === selectedImage }"
            @click="selectedImage = index"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import NavigationPanel from "../components/navigation-panel.vue";
import { onBeforeMount, ref } from "vue";
import { ScrapItem } from "../class/ScrapItem";

const route = useRoute();
const item = ref(new ScrapItem());
const imagesURLs = ref([]);
const selectedImage = ref(0);

onBeforeMount(async () => {
  const result = await ScrapItem.getById(route.params.id);
  item.value = result;
});

onBeforeRouteUpdate((to, from) => {
  console.log(to, from);
});
</script>