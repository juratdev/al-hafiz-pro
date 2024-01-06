export function convertToEmbed(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url?.match(regExp)

    if (match && match[2].length === 11) {
        return `https://www.youtube.com/embed/${match[2]}`
    } else {
        return 'error'
    }
}

export function getSingleIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}
