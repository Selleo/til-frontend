import { rest } from 'msw'
import { Post } from './mocks/post.mock'

export const selleoApiUrl = process.env.REACT_APP_API_URL

export const handlers = [
  rest.get(`${selleoApiUrl}/api/posts/:id`, (req, res, ctx) => {
    const { id } = req.params
    return res(ctx.json({ ...Post, id }))
  }),
]
