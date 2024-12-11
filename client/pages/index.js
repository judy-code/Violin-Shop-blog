import { useRouter } from 'next/router'

// 只作導向到 homepage
export default function ProductIndex() {
  const router = useRouter()

  // 確認window(瀏覽器)開始運作
  if (typeof window !== 'undefined') {
    router.push('/homepage')
  }

  return <></>
}
