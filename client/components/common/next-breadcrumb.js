import { useRouter } from 'next/router'
import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { pathsLocaleMap } from '@/configs' // 中文路徑對照陣列，到configs/index.js中設定
import styles from './next-breadcrumb.module.scss' // 額外樣式檔案
import { useNameAsBreadcrumb } from '@/hooks/use-name-as-breadcrumb' // 導入麵包屑名稱傳遞用的 hook

/**
 * NextBreadCrumb 搭配 useRouter 動態產生的麵包屑元件(breadcrumb)
 *
 * @component
 * @param {object} props
 * @param {boolean} [props.omitRoot=false] omit root node(home)
 * @param {JSX.Element} [props.homeIcon=<i className="bi bi-house-door-fill"></i>]
 * @param {boolean} [props.isHomeIcon=false] with home icon
 * @param {boolean} [props.isChevron=false] with chevron divider (`>`)
 * @param {string} [props.bgClass='bg-body-tertiary'] background css class
 * @returns {JSX.Element}
 */
export default function NextBreadCrumb({
  omitRoot = false,
  homeIcon = <i className="bi bi-house-door-fill"></i>,
  isHomeIcon = false,
  isChevron = false,
  bgClass = 'bg-body-tertiary',
}) {
  // 得到目前的網址的路徑
  const router = useRouter()
  const { isReady, asPath } = router
  const pathname = asPath.split('?')[0]

  // 引用麵包屑名稱 hook 變數
  const { subtitle } = useNameAsBreadcrumb()

  //const [display, setDisplay] = useState(null)
  const [showChild, setShowChild] = useState(false)

  const getPathFormatLocale = useCallback(() => {
    // 1. 拆解 ex. '/product/baby/birth' -> ['','product','baby', 'birth']
    const paths = pathname.split('/')

    // 檢查是否是有動態路由`/[xxx]`，如果有先暫時不呈現，
    // 等再次渲染決定後再呈現，不這樣作可能會造成畫面有閃爍呈現
    if (!isReady) return <li></li>

    // 2. 轉換字詞 to ['','產品','嬰兒', '初生兒']
    const pathsLocale = paths.map((v) => {
      // 不存在(例如空字串) 或 數字類型(例如id)的最後結尾參數會忽略
      // if (!v || Number(v)) return ''

      // 不存在(例如空字串)的最後結尾參數會忽略
      if (!v) return ''

      // 數字類型(例如id)的最後結尾參數會抓取 subtitle
      if (!isNaN(Number(v))) {
        return subtitle
      }

      // replace '#' to ''
      let path = v.includes('#') ? v.replaceAll('#', '') : v

      // 路由名稱包含 shop 參數會抓取 shop
      // 確保導頁至特定tab時不會有亂數再麵包屑
      if (path.includes('shop')) path = 'shop'

      // 回傳對照後的中文字串
      return pathsLocaleMap[path] || path
    })

    // 3. 加上dom元素，套用bs5樣式
    const pathsDisplay = pathsLocale.map((v, i, array) => {
      // 第一個 與 數字類型(例如id)的最後結尾要忽略, 首頁不需要(首頁樣式要在render時獨立處理)
      if (i === 0 || v === '') return ''

      // 最後一個
      if (i === array.length - 1) {
        return (
          <li key={i} className="breadcrumb-item active" aria-current="page">
            {v}
          </li>
        )
      }

      // 其它中間樣式
      return (
        <li key={i} className="breadcrumb-item">
          <Link
            href={paths.slice(0, i + 1).join('/')}
            className="fontDarkBrown link-body-emphasis fw-semibold text-decoration-none"
          >
            {v}
          </Link>
        </li>
      )
    })

    return pathsDisplay
  }, [isReady, asPath, subtitle]) // 確保 subtitle 取值

  useEffect(() => {
    if (isReady) {
      setShowChild(true)
    }
  }, [isReady])

  return (
    <nav aria-label="breadcrumb" style={{ lineHeight: '32px' }}>
      <ol
        className={`breadcrumb px-3 py-1 ${bgClass} rounded-3 ${
          isChevron ? styles['breadcrumb-chevron'] : ''
        }`}
      >
        {!omitRoot && (
          <li
            className={`breadcrumb-item  ${
              isChevron ? styles['breadcrumb-item'] : ''
            }`}
          >
            <Link
              href="/"
              className="fontDarkBrown link-body-emphasis fw-semibold text-decoration-none"
            >
              {!isHomeIcon ? pathsLocaleMap['home'] : homeIcon}
            </Link>
          </li>
        )}
        {showChild && getPathFormatLocale()}
      </ol>
    </nav>
  )
}
