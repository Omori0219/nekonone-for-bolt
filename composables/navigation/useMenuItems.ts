import { useAuthStore } from '@/store/authStore'
import { useUserStore } from '@/store/userStore'

export function useMenuItems() {
  const authStore = useAuthStore()
  const userStore = useUserStore()
  const menuItems = ref([
    {
      icon: '/icon/ic-home.svg',
      text: 'ホーム',
      to: '/home',
      isEnabled: true,
      requiresAuth: false,
    },
    {
      icon: '/icon/ic-footprint.svg',
      text: 'あしあと',
      to: `/users/${userStore.user?.userId}/footprints`,
      isEnabled: true,
      requiresAuth: true,
    },
    {
      icon: '/icon/ic-catFace.svg',
      text: 'マイページ',
      to: `/users/${userStore.user?.userId}`,
      // ログイン中であればtrue
      isEnabled: authStore.isLoggedIn,
      requiresAuth: true,
    },
    // {
    //   icon: '/icon/ic-crown.svg',
    //   text: 'スポンサー',
    //   to: '/sponsors',
    //   isEnabled: true,
    //   requiresAuth: false,
    // },
    {
      icon: '/icon/ic-gear.svg',
      text: 'せってい',
      to: `/users/${userStore.user?.userId}/settings`,
      isEnabled: true,
      requiresAuth: true,
    },
    // {
    //   icon: '/icon/ic-news.svg',
    //   text: 'ねこきじ',
    //   to: '/nekokiji',
    //   isEnabled: false,
    //   requiresAuth: false,
    // },
    // {
    //   icon: '/icon/ic-bell.svg',
    //   text: 'つうち',
    //   to: '/notifications',
    //   isEnabled: false,
    //   requiresAuth: true,
    // },
    // {
    //   icon: '/icon/ic-palette.svg',
    //   text: 'ねこシブ',
    //   to: '/nekoxiv',
    //   isEnabled: false,
    //   requiresAuth: false,
    // },
    // {
    //   icon: '/icon/ic-image.svg',
    //   text: 'ねこアルバム',
    //   to: '/album',
    //   isEnabled: false,
    //   requiresAuth: false,
    // },
    // {
    //   icon: '/icon/ic-shop.svg',
    //   text: 'ねこてん',
    //   to: '/shop',
    //   isEnabled: false,
    //   requiresAuth: false,
    // },
    // {
    //   icon: '/icon/ic-beer.svg',
    //   text: 'マタタビや',
    //   to: '/bar',
    //   isEnabled: false,
    //   requiresAuth: false,
    // },
  ])

  const filteredMenuItems = computed(() => {
    if (authStore.isLoggedIn) {
      // ログイン中の場合、すべてのメニュー項目を表示
      return menuItems.value
    } else {
      // 未ログインの場合、requiresAuthがfalseのメニューアイテムのみを表示
      return menuItems.value.filter((item) => !item.requiresAuth)
    }
  })
  return {
    filteredMenuItems,
  }
}
