export const getWord = async (setWord: (word: Array<string>) => void) => {
  try {
    const wordResponse = await fetch('https://api.tamilwords.net/')
    if (wordResponse.ok) {
      const data = await wordResponse.json()
      const segmenter = new Intl.Segmenter('ta', { granularity: 'grapheme' })
      const segments = segmenter.segment(data[0].tamilword)
      const graphemes = Array.from(segments, (segment) => segment.segment)

      setWord(graphemes)
      return data
    }
  } catch (error) {
    console.error(error)
    return null
  }
}
