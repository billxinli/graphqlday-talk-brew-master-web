import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import TeaPreview from './../components/tea-preview'
import styles from './collection.module.css'
import Layout from '../components/layout'

class CollectionIndex extends React.Component {
  render () {

    const teas = get(this, 'props.data.gateway.TeaCms.teaCollection.items')

    const siteTitle = get(this, 'props.data.site.siteMetadata.title')

    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <Helmet title={siteTitle}/>
          <div className={styles.hero}>
            Tea Collections
          </div>
          <div className="wrapper">
            <h2 className="section-headline">Tea Collections</h2>
            <ul className="article-list">
              {teas.map((tea) => {
                return (
                  <li key={tea.sys.id}>
                    <TeaPreview tea={tea}/>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </Layout>
    )
  }
}

export default CollectionIndex

export const pageQuery = graphql`
    query CollectionIndexQuery {
        gateway {
            TeaCms {
                teaCollection {
                    total
                    items {
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
    }



    #  {
    #    allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
    #      edges {
    #        node {
    #          title
    #          slug
    #          publishDate(formatString: "MMMM Do, YYYY")
    #          tags
    #          heroImage {
    #            fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
    #              ...GatsbyContentfulFluid_tracedSVG
    #            }
    #          }
    #          description {
    #            childMarkdownRemark {
    #              html
    #            }
    #          }
    #        }
    #      }
    #    }
    #  }
`
