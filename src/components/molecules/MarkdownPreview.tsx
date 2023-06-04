import {
  Box,
  EditablePreview,
  Text,
  useColorMode,
  useEditableState
} from '@chakra-ui/react'
import { marked } from 'marked'
import hljs from 'highlightjs'

export const MarkdownPreview = props => {
  const { isEditing, onEdit } = useEditableState()
  const { colorMode } = useColorMode()
  marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function (code, lang) {
      try {
        return hljs.highlight(lang, code).value
      } catch (_) {
        return hljs.highlightAuto(code).value
      }
    },
    langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
    pedantic: false,
    gfm: true,
    smartLists: true
  })
  const parsedMarkdown = marked.parse(props.inputText || props.children || '')
  // const parsedMarkdown = sanitize(parsedMarkdownPre)
  const styles = `
  <style>
    .markdown-container h1 {
      font-size: 3rem ;
      margin: 0.5rem 0 ;
    }
    .markdown-container h2 {
      font-size: 2rem ;
      margin: 0.4rem 0 ;
    }
    .markdown-container h3 {
      font-size: 1.5rem ;
      margin: 0.3rem 0 ;
    }
    .markdown-container h4 {
      font-size: 1.25rem ;
      margin: 0.2rem 0 ;
    }
    .markdown-container ul {
      margin-left: 1rem ;
    }
    .markdown-container ol {
      margin-left: 1.5rem ;
    }
    .markdown-container li {
      margin-bottom: 0.2rem ;
      margin-left: 0.5rem ;
    }
    .markdown-container a:hover {
      text-decoration: underline ;
      color: #f02ffa ;
    }
    .markdown-container pre {
      background-color: #282c34 ;
      border-radius: 0.5rem ;
      padding: 0.75rem;
    }
    .markdown-container a {
      color: #392ffa ;
    }
    .markdown-container p[align="center"] {
      display: flex;
      flex-direction: row;
      margin: 1rem 0;
      justify-content: center;
      gap: 0.5rem;
    }
    .markdown-container blockquote {
      border-left: 2px solid #f02ffa ;
      padding-left: 1rem ;
      margin: 0.4rem 1rem ;
    }
    .markdown-container code {
      padding: 0.15rem 0.3rem ;
      border-radius: 0.3rem ;
      color: #f02ffa99 ;
      border-radius: 0.5rem ;
      margin: 0.7rem 0 ;
    }
    .markdown-container table {
      border: 1px solid #333333 ;
      padding: 1rem ;
      overflow-x: scroll !important;
    }
    .markdown-container th {
      border: 1px solid #333333 ;
      padding: 0.5rem ;
    }
    .markdown-container td {
      border: 1px solid #333333 ;
      padding: 0.5rem ;
    }
    .markdown-container tr:nth-child(even) {
      background-color: ${colorMode === 'dark' ? '#232142' : '#dfdfff'};} ;
    }
    .markdown-container hr {
      border: 2px solid #333444 ;
    }
  </style>
  `
  return (
    <Box
      h='87vh'
      m='4px'
      px={24}
      maxW='90vw'
      overflowY='scroll'
      hidden={isEditing && !props.isFixed}
      onClick={onEdit}
    >
      <div
        className='markdown-container'
        dangerouslySetInnerHTML={{ __html: parsedMarkdown + styles }}
      />
    </Box>
  )
}
