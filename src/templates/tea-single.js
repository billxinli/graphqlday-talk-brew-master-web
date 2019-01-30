import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Layout from '../components/layout'

import heroStyles from '../components/hero.module.css'

class BlogPostTemplate extends React.Component {
  render () {
    const tea = get(this.props, 'data.gateway.TeaCms.tea')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <Helmet title={`${tea.name} | ${siteTitle}`}/>
          <div className={heroStyles.hero}>

          </div>
          <div className="wrapper">
            <h1 className="section-headline">{tea.name}</h1>
            <p
              style={{
                display: 'block',
              }}
            >
              {JSON.stringify(tea,undefined,2)}
            </p>
            <div
              dangerouslySetInnerHTML={{
                __html: tea.description,
              }}
            />
          </div>
        </div>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query TeaById($id: String!){
    site {
      siteMetadata {
        title
      }
    }
    gateway {
      TeaCms {
        tea(id: $id) {
          sys {
            id
          }
          name
          type {
            name
          }
          description
          photo {
            title
            description
            url
          }
          caffeineContent
          cost
          dateAdded
        }
      }
    }
  }
`
