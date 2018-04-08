import React from 'react'
const ReactMarkdown = require('react-markdown')

function Preview(props) {
  const md = props.pathContext.content.content
  return <ReactMarkdown escapeHtml={false} source={md} />
}

export default Preview
