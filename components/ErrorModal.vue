<template>
  <div v-if="showModal" class="p-errorModal">
    <div class="p-errorModal__content">
      <h2 class="p-errorModal__title">エラーが発生しました</h2>
      <p class="p-errorModal__message">{{ props.errorMessage }}</p>
      <p class="p-errorModal__announce">
        このエラーが頻発する場合はお手数ですが<br />
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSfQbz_X_w6lmpEb2UDXeE_p4vwgWbdtTVmmIkJcgji13jkPlw/viewform?usp=sf_link"
          target="_blank"
          rel="noopener noreferrer"
          class="p-errorModal__announce__link"
          >バグ報告フォーム</a
        ><br />
        よりお知らせください
      </p>
      <button class="p-errorModal__close" @click="closeModal">とじる</button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, defineProps } from 'vue'

  const props = defineProps({
    errorMessage: {
      type: String,
      default: '',
    },
  })
  const showModal = ref(true)

  const closeModal = () => {
    showModal.value = false
  }
</script>

<style scoped lang="scss">
  .p-errorModal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 2;
  }

  .p-errorModal__content {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
  }

  .p-errorModal__title {
    margin-bottom: 10px;
    font-size: 16px;
  }

  .p-errorModal__message {
    margin-bottom: 40px;
  }
  .p-errorModal__announce {
    font-size: 12px;
    margin-bottom: 32px;
  }
  .p-errorModal__announce__link {
    color: $link-color;
    text-decoration: underline;
  }

  .p-errorModal__close {
    font-family: 'Darumadrop One', sans-serif;
    cursor: pointer;
    padding: 8px 24px;
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 5px;
  }
</style>
