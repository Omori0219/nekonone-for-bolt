<template>
  <div class="p-timelineTabs">
    <ul class="p-timelineTabs__list">
      <li class="p-timelineTabs__item">
        <button class="p-timelineTabs__button">すべてのとうこう</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
  .p-timelineTabs {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }
  .p-timelineTabs__list {
    display: flex;
    width: 100%;
    height: 100%;
  }
  .p-timelineTabs__item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    &:hover {
      opacity: 0.6;
    }
    .isActive {
      border-bottom: 4px solid $accent-color;
    }
  }
  .p-timelineTabs__button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-family: 'Darumadrop One', sans-serif;
  }
</style>
