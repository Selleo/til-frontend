import '@testing-library/jest-dom/extend-expect'
import { server } from './tests/test-server.js'

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())
