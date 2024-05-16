<template>
  <div class="dropdown">
    <button
      class="btn btn-secondary dropdown-toggle h6 rounded-pill"
      type="button"
      :id="id"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      @click="toggleDropdown"
    >
      {{ selectedItem ? selectedItem : defaultText }}
    </button>
    <ul v-if="items" class="dropdown-menu" :aria-labelledby="id">
      <li v-for="item in items" :key="item[1]">
        <a @click="selectItem(item)" class="dropdown-item" href="#" :name="name" :value="item[1]">
          {{ item[0] }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  props: {
    items: Array,
    id: String,
    defaultText: String,
    name: String,
  },
  setup(props, { emit }) {
    const selectedItem = ref(null);

    const selectItem = (item) => {
      selectedItem.value = item[0];
      emit('clickItem', item);
    };

    const toggleDropdown = (ev) => {
      const target = ev.target;
      new bootstrap.Dropdown(target).toggle();
    };

    return {
      selectedItem,
      selectItem,
      toggleDropdown,
    };
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
