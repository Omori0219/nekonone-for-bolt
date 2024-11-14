import { type Footprint } from '@/types/footprint'

export function useFootprints() {
  const footprints = ref<Footprint[]>([])
  const fetchError = ref<Error | null>(null)

  // unknown 型のエラーを Error 型に変換するヘルパー関数
  function handleError(error: unknown): Error {
    if (error instanceof Error) {
      return error
    } else {
      return new Error(String(error))
    }
  }
  // ユーザーIDからそのユーザーの足跡を取得する関数
  const fetchFootprints = async (
    userId: string,
    limit: number,
    orderBy: string
  ) => {
    fetchError.value = null
    try {
      // $fetchを使用してAPIから足跡データを取得
      const response = await $fetch<Footprint[]>(`/api/footprints/${userId}`, {
        params: { limit, orderBy },
      })
      // 新しいデータで配列を置き換える
      footprints.value = response
    } catch (error) {
      fetchError.value = handleError(error)
    }
  }

  // 訪問者と訪問されたユーザーのIDを受け取り、足跡を追加する関数
  const addFootprint = async (visitorUserId: string, visitedUserId: string) => {
    try {
      // 自分自身に足跡をつけることはできない
      if (visitorUserId === visitedUserId) {
        throw new Error('自分自身に足跡をつけることはできません。')
      }
      // 訪問者または訪問されたユーザーIDが指定されていない場合はエラー
      if (visitorUserId == null || visitedUserId == null) {
        throw new Error('訪問者または訪問されたユーザーIDが指定されていません')
      }
      // オプティミスティックUI更新のために一時的なデータを追加
      const tempFootprint: Footprint = {
        id: 'temp-id', // 一時的なID
        visitorUserId,
        visitedUserId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      // 新しい足跡を配列の先頭に追加
      // 足跡を新しい順（降順）で表示したい場合は、新しい足跡を配列の先頭に挿入する必要がある。
      // Array.prototype.unshift メソッドを使用して、新しい要素を配列の先頭に追加
      footprints.value.unshift(tempFootprint)

      // APIに足跡データをPOST
      const response = await $fetch<Footprint>('/api/footprints', {
        method: 'POST',
        body: { visitorUserId, visitedUserId },
      })

      // オプティミスティックUI更新を実際のデータで置き換え
      const index = footprints.value.findIndex((fp) => fp.id === 'temp-id')
      if (index !== -1) {
        footprints.value[index] = response
      }
    } catch (error) {
      fetchError.value = handleError(error)
      // オプティミスティックUI更新を元に戻す
      footprints.value = footprints.value.filter((fp) => fp.id !== 'temp-id')
      throw error // ここで catch ブロックで捕捉された error を再スロー
    }
  }

  return {
    footprints,
    fetchError,
    fetchFootprints,
    addFootprint,
  }
}
