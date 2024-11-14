// 必要なモジュールをインポートします
import { defineEventHandler, createError, readBody } from 'h3'
import { v4 as uuidv4 } from 'uuid'
import { getContainer } from '../../utils/cosmosClient'
import {
  formatPartitionDate,
  formatPartitionYearMonth,
  createUserPostYearMonthKey,
} from '../../utils/formatPartition'
import {
  type CreatedPostData,
  type PostCreationRequestData,
} from '@/types/post'
import { type CreatedTimelinePostData } from '@/types/timeline'

export default defineEventHandler(async (event) => {
  try {
    // リクエストボディを読み込み、型をPostCreationRequestに指定します
    const body = await readBody<PostCreationRequestData>(event)
    const { authorUserId, originalText, translatedText, nawabari } = body
    let score = body.score

    // scoreを数値型に変換します
    if (typeof score === 'string') {
      score = parseInt(score, 10)
    }

    // 必須フィールドの型チェックを行います
    if (
      typeof authorUserId !== 'string' ||
      typeof originalText !== 'string' ||
      typeof translatedText !== 'string' ||
      typeof score !== 'number' ||
      typeof nawabari !== 'string' // TODO:nawabariの型チェックを追加
    ) {
      throw new TypeError('必須のフィールドが不足しています')
    }

    // Cosmos DBのコンテナを取得します
    const postsContainer = getContainer('posts')
    const timelineContainer = getContainer('timeline')
    const usersContainer = getContainer('users')

    // 投稿IDと現在の日時を生成します
    const postId = uuidv4()
    const now = new Date()
    const nowISOString = now.toISOString()

    // パーティションキーとなる値を生成します
    const partitionYearMonth = formatPartitionYearMonth(now)
    const userPostYearMonthKey = createUserPostYearMonthKey(authorUserId, now)
    const partitionDate = formatPartitionDate(now)

    // 投稿データを作成します
    const post: CreatedPostData = {
      id: postId,
      postId,
      authorUserId,
      originalText: originalText.replace(/\r\n/g, '\n'),
      translatedText: translatedText.replace(/\r\n/g, '\n'),
      score,
      nawabari,
      likesCount: 0,
      repostsCount: 0,
      repliesCount: 0,
      partitionYearMonth,
      userPostYearMonthKey,
      createdAt: nowISOString,
      updatedAt: nowISOString,
      isDeleted: false,
    }

    // 投稿データをpostsコンテナに保存します
    await postsContainer.items.create(post)

    // タイムラインデータを作成します
    const timelinePost: CreatedTimelinePostData = {
      id: uuidv4(),
      postType: 'post',
      referencePostId: postId,
      authorUserId,
      nawabari,
      isLatestVersion: true,
      partitionDate,
      createdAt: nowISOString,
      updatedAt: nowISOString,
    }

    // タイムラインデータをtimelineコンテナに保存します
    await timelineContainer.items.create(timelinePost)

    // ユーザーのスコアを更新
    const { resource: user } = await usersContainer
      .item(authorUserId, authorUserId)
      .read()
    if (!user) {
      throw new Error(`User with id ${authorUserId} not found`)
    }
    const updatedScore = (user.score || 0) + score
    await usersContainer.items.upsert({ ...user, score: updatedScore })

    // 作成された投稿データを返します
    return post
  } catch (error) {
    // エラーハンドリングを行います
    console.error('Error creating post:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
