import { rest } from 'msw'
import { Post } from './__mocks__/post.mock'

export const apiUrl = process.env.REACT_APP_API_URL

export const handlers = [
  rest.get(`${apiUrl}/api/posts/:id`, (req, res, ctx) => {
    const { id } = req.params
    return res(ctx.json({ ...Post, id }))
  }),
]
