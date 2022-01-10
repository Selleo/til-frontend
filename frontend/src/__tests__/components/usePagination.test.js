import { usePagination } from '../../utils/customHooks/usePagination'

describe('usePagination', () => {
  it('should generate array of pagination elements for first page', () => {
    const posts = { pageNumber: 1, totalPages: 10 }

    const result = [1, 2, 3, 4, 5, '...', 10, 'Next']

    const { pagination } = usePagination(posts)

    expect(pagination).toEqual(result)
  })

  it('should generate array of pagination elements for middle page', () => {
    const posts = { pageNumber: 4, totalPages: 15 }

    const result = ['Prev', 1, '...', 3, 4, 5, '...', 15, 'Next']

    const { pagination } = usePagination(posts)

    expect(pagination).toEqual(result)
  })

  it('should generate array of pagination elements for last page', () => {
    const posts = { pageNumber: 20, totalPages: 20 }

    const result = ['Prev', 1, '...', 16, 17, 18, 19, 20]

    const { pagination } = usePagination(posts)

    expect(pagination).toEqual(result)
  })
})
