import sanityClient from '@sanity/client'
import blocksToHtml from '@sanity/block-content-to-html'
import imageUrlBuilder from '@sanity/image-url'
import getVideoId from "get-video-id";

const tracer = x => {
    console.dir(x)
    return x
}

export const client = sanityClient({
    projectId: '1tpw92x3',
    dataset: 'production',
    token: '', // or leave blank to be anonymous user
    useCdn: false // `false` if you want to ensure fresh data
})

const h = blocksToHtml.h

export const renderBlockText = text =>
    blocksToHtml({
        blocks: text,
        serializers: serializers,
        projectId: '1tpw92x3',
        dataset: 'production',
    })

export const toPlainText = (blocks = []) => {
    return (
        blocks
            .map(block => {
                if (block._type !== 'block' || !block.children) {
                    return ''
                }
                return block.children.map(child => child.text).join('')
            })
            .join('\n\n')
    )
}

const builder = imageUrlBuilder(client)

export const urlFor = source => builder.image(source)

const serializers = {
    marks: {
        link: props =>
            h(
                'a',
                { target: '_blank', rel: 'noreferrer', href: props.mark.href },
                props.children
            ),
        highlight: props =>
            h(
                'mark',
                { className: 'highlight' },
                props.children
            ),
        footnote: props => {
            let footNoteText = ''
            if (props.mark && props.mark.content && props.mark.content.content) {
                footNoteText = toPlainText(props.mark.content.content)
            }
            return h(
                'span',
                { className: 'footnote' }, [
                props.children,
                h('sup', { className: 'footnote-link' }, 'XX'),
                h('span', { className: 'footnote-text' }, footNoteText)
            ])
        }
    },
    types: {
        block: props => {
            const style = props.node.style || 'normal'

            if (style === 'blockquote')
                return h('blockquote', {}, props.children)

            if (style === 'h2')
                return h('h2', {}, props.children)

            if (style === 'h3')
                return h('h3', {}, props.children)

            if (style === 'h4')
                return h('h4', {}, props.children)

            return h('p', { className: style }, props.children)
        },
        embedBlock: props => {
            // console.dir(props)
            // YOUTUBE
            if (props.node.url.includes('youtube')) {
                return h('figure', { className: 'youtube' }, [
                    h('div', { className: 'embed-container' },
                        h('iframe', { width: '720', height: '480', src: 'https://www.youtube.com/embed/' + getVideoId(props.node.url).id, frameborder: 'no', allow: 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture', allowfullscreen: true })),
                    h('figcaption', { className: 'caption' }, 'XXX'),
                    h('figcaption', { className: 'credits' }, 'Credits: xxxx')
                ])
            }
            // VIMEO
            if (props.node.url.includes('vimeo')) {
                return h('figure', { className: 'vimeo' }, [
                    h('div', { className: 'embed-container' },
                        h('iframe', { width: '720', height: '480', src: 'https://player.vimeo.com/video/' + getVideoId(props.node.url).id, frameborder: 'no', byline: false, color: '#ffffff', allow: 'autoplay; fullscreen', allowfullscreen: true })),
                    h('figcaption', { className: 'caption' }, 'XXX'),
                    h('figcaption', { className: 'credits' }, 'Credits: xxxx')
                ])
            }
            // SOUNDCLOUD
            if (props.node.url.includes('soundcloud')) {
                return h('figure', { className: 'soundcloud' }, [
                    h('div', { className: 'soundcloud-container' }, h('iframe', { width: '100%', height: '300', src: 'https://w.soundcloud.com/player/?url=' + props.node.url + '&color=%23fffff', frameborder: 'no', scrolling: "no", allow: 'autoplay' })),
                    h('figcaption', { className: 'caption' }, 'XXX'),
                    h('figcaption', { className: 'credits' }, 'Credits: xxxx')
                ])
            }
        },
        videoBlock: props => {
            // console.dir(props)
            const videoUrl = 'https://cdn.sanity.io/files/1tpw92x3/production/' + props.node.videoFile.asset._ref
                .replace('file-', '')
                .replace('-mp4', '.mp4')
            return h('figure', { className: 'video' }, [
                h('video', { src: videoUrl, controls: true, loop: true, autoplay: props.node.autoPlay }),
                h('figcaption', { className: 'caption' }, 'XXX'),
                h('figcaption', { className: 'credits' }, 'Credits: xxxx')
            ])
        },
        audioBlock: props => {
            // console.dir(props)
            const audioUrl = 'https://cdn.sanity.io/files/1tpw92x3/production/' + props.node.audioFile.asset._ref
                .replace('file-', '')
                .replace('-mp3', '.mp3')
            return h('figure', { className: 'audio' }, [
                h('audio', { src: audioUrl, controls: true }),
                h('figcaption', { className: 'caption' }, 'XXX'),
                h('figcaption', { className: 'credits' }, 'Credits: xxxx')
            ])
        }
    }
}

export const loadData = async (query, params) => {
    try {
        const res = await client.fetch(query, params)
        if (res === null) {
            return Promise.reject(new Error(404));
        }
        return res
    } catch (err) {
        return Promise.reject(new Error(404));
    }
}
