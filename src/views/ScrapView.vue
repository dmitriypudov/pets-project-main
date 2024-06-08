<template>
  <div class="tw-bg-gradient-to-br tw-from-[#F4CB38] tw-to-[#F4A938] tw-min-h-screen">
    <navigation-panel class="tw-pt-8"></navigation-panel>
    <div class="tw-flex tw-justify-center tw-items-center tw-gap-80 tw-mt-8">
      <div class="tw-font-mont tw-font-bold tw-text-4xl">{{ $t('ads') }}</div>
    </div>
    <div class="tw-flex tw-justify-center tw-mt-4">
      <form @submit.prevent="search">
        <div class="tw-flex">
          <q-input class="search tw-bg-slate-200 tw-w-[920px]" outlined color="dark" v-model="searchText"/>
          <q-btn icon="search" type="submit"></q-btn>
        </div>
        <select id="category-filter" v-model="selectedCategory">
          <option value="all">Все категории</option>
          <option value="Кошка">Кошка</option>
          <option value="Собака">Собака</option>
        </select>

        <select id="status-filter" v-model="selectedStatus">
          <option value="all">Все статусы</option>
          <option value="Пропавшие">Пропавшие</option>
          <option value="Найденные">Найденные</option>
        </select>
      </form>
    </div>
    <div class="tw-flex tw-justify-center tw-mt-2">
      <div class="tw-bg-[#FCF8EF] tw-w-[1758.05px] tw-min-h-[600px] tw-rounded-3xl tw-font-mont tw-p-8">
        <div class="tw-font-bold tw-text-4xl">{{ $t('result') }}</div>
        <template v-for="item in items" :key="item.id">
          <scrap-quick-item :item="item"></scrap-quick-item>
          <q-separator></q-separator>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ScrapItem } from "../class/ScrapItem";
import { onMounted, ref } from "vue";
import NavigationPanel from "../components/navigation-panel.vue";
import ScrapQuickItem from "../components/scrap-item.vue";

const items = ref([
  new ScrapItem(),
  new ScrapItem(),
  new ScrapItem(),
  new ScrapItem(),
  new ScrapItem(),
  new ScrapItem(),
  new ScrapItem(),
  new ScrapItem(),
  new ScrapItem(),
  new ScrapItem(),
]);

onMounted(async () => {
  await search();
});
const searchText = ref('');
const search = async () => {
  const result = await ScrapItem.getCollection();
  console.log(result)
  /* items.value = Object.values(result).filter(item =>
    (item.title.toLowerCase().includes(searchText.value.toLowerCase()) ||
      item.description.toLowerCase().includes(searchText.value.toLowerCase())) &&
    (selectedCategory.value === 'all' || item.animal === selectedCategory.value) &&
    (selectedStatus.value === 'all' || item.status === selectedStatus.value)
   );
   */
  items.value=result
};
const selectedCategory = ref('all');
const selectedStatus = ref('all');
</script>
