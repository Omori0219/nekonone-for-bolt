// server/api/timeline/timeline.get.ts
import { defineEventHandler } from 'h3'
import { getContainer } from '../../utils/cosmosClient'
import { type NawabariType } from '@/types/nawabariType'
import { type TimelineItemPublicDataReference } from '@/types/timeline'

// イベントハンドラを定義します。この関数は非同期で、イベントを引数に取ります。
export default defineEventHandler(async (event) => {
  try {
    // イベントからクエリを取得します。
    const query = getQuery(event)
    // クエリからnawabariを取得します。存在しない場合はエラーをスローします。
    if (typeof query.nawabari !== 'string') {
      throw new TypeError('nawabari is required')
    }
    const nawabari = query.nawabari as NawabariType

    // クエリからskipとtakeを取得します。存在しない場合はデフォルト値を使用します。
    const skip = typeof query.skip === 'string' ? parseInt(query.skip, 10) : 0
    const take = typeof query.take === 'string' ? parseInt(query.take, 10) : 10

    // 'timeline'という名前のコンテナを取得します。
    const container = getContainer('timeline')

    // SQLクエリを作成します。初期状態では全ての投稿を選択します。
    let querySpec = 'SELECT * FROM timeline t'
    // クエリパラメータを格納する配列を作成します。
    const parameters: { name: string; value: string | number }[] = []

    // nawabariが'none'でない場合、クエリにWHERE句を追加してnawabariでフィルタリングします。
    if (nawabari !== 'none') {
      querySpec += ' WHERE t.nawabari = @nawabari'
      parameters.push({ name: '@nawabari', value: nawabari })
    }
    // クエリにORDER BY句を追加して投稿を新しいものから順に並べます。
    querySpec += ' ORDER BY t.createdAt DESC'
    // クエリにOFFSET句とLIMIT句を追加してページネーションを実装します。
    querySpec += ' OFFSET @skip LIMIT @take'
    parameters.push({ name: '@skip', value: skip })
    parameters.push({ name: '@take', value: take })

    // コンテナから投稿を取得します。クエリとパラメータを指定します。
    const response = await container.items
      .query<TimelineItemPublicDataReference>({ query: querySpec, parameters })
      .fetchAll()

    const posts = response.resources

    // 取得した投稿を返します。
    return posts
  } catch (error) {
    // エラーが発生した場合、エラーメッセージをコンソールに出力し、500エラーを返します。
    console.error('Error fetching timeline posts:', error) // eslint-disable-line no-console
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
