import { defineEventHandler } from 'h3'
import { getContainer } from '../../../utils/cosmosClient'

export default defineEventHandler(async (event) => {
  try {
    if (event.context.params == null) {
      throw createError({
        statusCode: 400,
        statusMessage: 'event is required',
      })
    }
    const userEmail = event.context.params.userEmail
    if (userEmail == null) {
      throw createError({
        statusCode: 400,
        statusMessage: 'userEmail is required',
      })
    }
    const container = getContainer('users')
    const query = 'SELECT * FROM users u WHERE u.userEmail = @userEmail'
    const { resources: foundItems } = await container.items
      .query({
        query,
        parameters: [{ name: '@userEmail', value: userEmail }],
      })
      .fetchAll()
    if (foundItems.length === 0) {
      return null
    }
    return foundItems[0]
  } catch (error) {
    setResponseStatus(event, 500)
    console.error('Error retrieving user information:', error) // eslint-disable-line no-console
    return createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
