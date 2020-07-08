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
        footnote: props =>
            h(
                'span',
                { className: 'footnote' },
                props.children
            ),
        alignLeft: props =>
            h(
                'p',
                { className: 'align-left' },
                props.children
            ),
        alignCenter: props =>
            h(
                'p',
                { className: 'align-center' },
                props.children
            ),
        alignRight: props =>
            h(
                'p',
                { className: 'align-right' },
                props.children
            )
    },
    types: {
        block: props => {
            const style = props.node.style || 'normal'
            // console.dir(props)
            return style === 'blockquote'
                ? h('blockquote', {}, props.children)
                : h('p', { className: style }, props.children)

        },
        embedBlock: props => {
            console.dir(props)
            const url = props.node.url
            let embedCode = ''
            if (url.includes('youtube')) {
                embedCode = "https://www.youtube.com/embed/" + getVideoId(url).id
            }
            if (url.includes('vimeo')) {
                embedCode = "https://player.vimeo.com/video/" + getVideoId(url).id
            }
            return h(
                'iframe',
                { src: embedCode, width: 480, height: 320, allow: "accelerometer; autoplay; encrypted-media; gyroscope;picture-in-picture", frameborder: 0, allowfullscreen: true })
        },
        videoBlock: props => {
            console.dir(props)
            const videoUrl = 'https://cdn.sanity.io/files/1tpw92x3/production/' + props.node.videoFile.asset._ref
                .replace('file-', '')
                .replace('-mp4', '.mp4')
            return h(
                'video',
                { src: videoUrl, controls: true, loop: true, autoplay: props.node.autoPlay })
        },
        audioBlock: props => {
            console.dir(props)
            const audioUrl = 'https://cdn.sanity.io/files/1tpw92x3/production/' + props.node.audioFile.asset._ref
                .replace('file-', '')
                .replace('-mp3', '.mp3')
            return h(
                'audio',
                { src: audioUrl, controls: true })
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
