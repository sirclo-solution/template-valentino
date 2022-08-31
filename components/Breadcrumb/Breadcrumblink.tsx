/* library Package */
import { FC } from 'react'
import Link from 'next/link'

/* styles */
import styles from 'public/scss/components/Breadcrumbslink.module.scss'

export type PageHeadingPropsType = {
  title: string
  links: Array<string>
  withImage?: string
  lng: any
  page?: string
}

const Breadcrumblink: FC<any> = ({
  title,
  links,
  withImage,
  lng,
  page,
}) => {
  return (
    <div
      className={`${styles.sectionBreadcrumb} ${withImage ? styles.sectionBreadcrumb__image : ""}`}
      style={{ backgroundImage: `url(${withImage})` }}
    >
      {page === 'product' ? 
        <h2 className={styles.sectionBreadcrumb__title}>{title}</h2>
      :
        <h1 className={styles.sectionBreadcrumb__title}>{title}</h1>
      }
      <nav aria-label="breadcrumb">
        <ol className={`breadcrumb ${styles.breadcrumb_valentino}`}>
          {
            links.map((el, idx) => {
              if (el === "Home" || el === "Beranda") {
                return (
                  <li className={`${styles.breadcrumb_item} ${styles.breadcrumb_valentino_item}`} key={idx}>
                    <Link href="/[lng]" as={`/${lng}`}>
                      <a className={styles.breadcrumb_valentino_item__link}>{el}</a>
                    </Link>
                  </li>
                )
              }
              return (
                <li className={`${styles.breadcrumb_item} ${styles.breadcrumb_valentino_item}`} key={idx}>
                  <a className={`${styles.breadcrumb_valentino_item__link} ${links.length - 1 == idx && styles.breadcrumb_valentino_item__linkBold}`}>{el}</a>
                </li>
              )
            })
          }
        </ol>
      </nav>
    </div>
  )
}

export default Breadcrumblink;