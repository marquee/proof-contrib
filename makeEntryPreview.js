
function makeEntryPreview (entry, char_count=120) {
    if (entry.summary) {
        return entry.summary
    }
    if (entry.description) {
        return entry.description
    }

    let preview = '';
    for (let i = 0; i < entry.content.length; i++)
        if ('paragraph' === entry.content[i].role) {
            preview = entry.content[i].content
            break
        }
    if (preview.length > char_count) {
        preview = preview.slice(0,char_count + 1).split(' ')
        let last_word = preview.pop()
        if (['.','?','!','…'].indexOf(last_word[last_word.length - 1]) === -1) {
            last_word = '…'
        }
        preview.push(last_word)
        preview = preview.join(' ')
    }
    return preview
}

module.exports = makeEntryPreview