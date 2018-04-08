import React from 'react'
import Post from '../templates/post'
import queryString from 'querystring'

export default class Preview extends React.Component {
  constructor(props) {
    super(props)
    const entryId = queryString.parse(props.location.search)['?entryId']
    this.state = { preview: null, entryId }
  }

  componentDidMount() {
    fetch(
      `https://preview.contentful.com/spaces/${
        process.env.GATSBY_CONTENTFUL_SPACE_ID
      }/entries/${this.state.entryId}?access_token=${
        process.env.GATSBY_CONTENTFUL_PREVIEW_TOKEN
      }`
    )
      .then(res => res.json())
      .then(json =>
        this.setState({ preview: json.fields ? json.fields.desc : null })
      )
  }

  render() {
    return <Post pathContext={{ content: { content: this.state.preview } }} />
  }
}
