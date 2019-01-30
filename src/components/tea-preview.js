import React from 'react'
import { Link } from 'gatsby'

import styles from './tea-preview.module.css'

export default ({ tea }) => (

  <div className={styles.preview}>
    <img src={tea.photo.url}/>
    {/*<Img alt="" fixed={tea.photo.url}/>*/}
    <h3 className={styles.previewTitle}>
      <Link to={`/collection/${tea.sys.id}`}>{tea.name}</Link>
    </h3>
    {/*<small>{tea.dateAdded}</small>*/}
    <p
      dangerouslySetInnerHTML={{
        __html: tea.description,
      }}
    />
  </div>
)
