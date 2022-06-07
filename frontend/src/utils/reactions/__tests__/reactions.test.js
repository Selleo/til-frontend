import { convertReactions } from '../reactions'

xdescribe('convertReactions', () => {
  it('should process reaction array', () => {
    const reactionsMock = [
      { type: 'like', user_uuid: '1', post_id: 1 },
      { type: 'funny', user_uuid: '2', post_id: 1 },
    ]
    const expectedResult = {
      type: 'like',
    }
    const test = convertReactions(reactionsMock)
    console.log(test)
  })
})
xdescribe('checkHasReacted', () => {})
