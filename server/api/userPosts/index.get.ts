import { defineEventHandler } from 'h3'
import { getContainer } from '../../utils/cosmosClient'
import { type TimelineItemPublicDataReference } from '@/types/timeline'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const authorUserId = query.authorUserId as string

    if (!authorUserId) {
      throw new TypeError('authorUserId is required')
    }

    const skip = typeof query.skip === 'string' ? parseInt(query.skip, 10) : 0
    const take = typeof query.take === 'string' ? parseInt(query.take, 10) : 10

    const container = getContainer('timeline')

    let querySpec =
      'SELECT * FROM timeline t WHERE t.authorUserId = @authorUserId OR t.repostedUserId = @authorUserId'
    const parameters: { name: string; value: string | number }[] = [
      { name: '@authorUserId', value: authorUserId },
    ]

    querySpec += ' ORDER BY t.createdAt DESC'
    querySpec += ' OFFSET @skip LIMIT @take'
    parameters.push({ name: '@skip', value: skip })
    parameters.push({ name: '@take', value: take })

    const response = await container.items
      .query<TimelineItemPublicDataReference>({ query: querySpec, parameters })
      .fetchAll()

    const posts = response.resources

    return posts
  } catch (error) {
    console.error('Error fetching user posts:', error) // eslint-disable-line no-console
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
