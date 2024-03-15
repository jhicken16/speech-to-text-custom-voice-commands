import punctuationForIndexShift from './punctuationForIndexShift'

describe('function that returns the difference between the old index of the first letter of the word you are looking for and the new index of the first letter', () => {
    it('should return 3', () => {
        const str = 'Hi, I am a developer, working on a speech to text app. pop'
        const command = 'pop'
        const oldIndex = 52

        expect(
            punctuationForIndexShift(str, oldIndex, command)
        ).toBe(3)
    })
})