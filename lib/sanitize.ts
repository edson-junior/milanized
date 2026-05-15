import sanitizeHtml from 'sanitize-html';

/**
 * Sanitizes CMS-authored custom HTML embed blocks.
 * Allows common structural tags and iframes (e.g. YouTube/Vimeo) while
 * stripping <script>, event handler attributes, and javascript: URIs.
 */
export function sanitizeCustomHTML(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      'iframe',
      'figure',
      'figcaption',
      'picture',
      'source',
      'img'
    ]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      '*': ['class', 'style', 'id'],
      iframe: [
        'src',
        'width',
        'height',
        'frameborder',
        'allow',
        'allowfullscreen',
        'loading',
        'title'
      ],
      img: ['src', 'alt', 'width', 'height', 'loading'],
      source: ['src', 'srcset', 'type', 'media'],
      a: ['href', 'target', 'rel']
    },
    allowedSchemes: ['https', 'http'],
    allowedIframeHostnames: [
      'www.youtube.com',
      'www.youtube-nocookie.com',
      'player.vimeo.com',
      'open.spotify.com',
      'w.soundcloud.com'
    ]
  });
}

/**
 * Sanitizes CMS-authored caption HTML, allowing only safe inline markup.
 * Expected content: plain text with optional <a> attribution links.
 */
export function sanitizeCaption(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: ['a', 'em', 'strong', 'br'],
    allowedAttributes: {
      a: ['href', 'target', 'rel']
    },
    allowedSchemes: ['https', 'http', 'mailto']
  });
}
