<template>
  <div class="p-callback">
    <p class="p-callback__text">ログインちゅう</p>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useUserStore } from '@/store/userStore'
  import { useUser } from '@/composables/useUser'

  const userStore = useUserStore()
  const { data } = useAuth()
  const { getAllUserDataByUserEmail } = useUser()
  const userEmail = ref<string>('')
  const fetchComplete = ref(false)

  const fetchData = async () => {
    try {
      if (userStore.user?.userId) {
        // ストアにユーザーIDがある、ログイン済みユーザーならタイムラインページへ
        navigateTo('/home')
        return
      }

      if (data.value == null) {
        // セッションデータがない（つまりリダイレクト後ではない）時はTOPページへ
        navigateTo('/')
        return
      }

      const session = await data.value
      userEmail.value = session?.user?.email || ''

      if (userEmail.value) {
        const response = await getAllUserDataByUserEmail(userEmail.value)
        if (response.success === true) {
          // セッションのメールアドレスに該当するユーザーが存在すれば
          userStore.setUser(response.user) // storeとクッキーに保存
          navigateTo(`/users/${response.user?.userId}`)
        } else if (response.success === false) {
          // セッションのメールアドレスに該当するユーザーが存在しなかったら
          // アカウント作成フローに進む。
          // ストアをユーザーメールだけ格納して初期設定。
          userStore.initializeUser(userEmail.value)
          navigateTo(`/create-account/step01`)
        }
      }
      // navigateTo('/')
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('ログイン処理中にエラーが発生しました:', error)
      // エラーハンドリングのロジックをここに実装
    } finally {
      fetchComplete.value = true
    }
  }

  onMounted(fetchData)
</script>

<style scoped lang="scss">
  .p-callback {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 40%;
  }
  .p-callback__text {
    font-family: 'Darumadrop One', sans-serif;
  }
</style>
