export function getRandomImage() {
    const randomNumber = Math.floor(Math.random() * 999)
    const backgroundUrl = `https://picsum.photos/id/${randomNumber}/1700/900`

    return backgroundUrl
}


export const pictureUrl = 'https://source.unsplash.com/random/1700x1000'

