const Promise = require('bluebird')
const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const teaSingle = path.resolve('./src/templates/tea-single.js')
    resolve(
      graphql(`
{
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
}`)
        .then((result) => {
          if (result.errors) {
            console.log(result.errors)
            reject(result.errors)
          }

          const teas = result.data.gateway.TeaCms.teaCollection.items

          teas.forEach((tea, index) => {
            createPage({
              path: `/collection/${tea.sys.id}/`,
              component: teaSingle,
              context: {
                id: tea.sys.id,
              },
            })
          })
        }),
    )
  })
}
