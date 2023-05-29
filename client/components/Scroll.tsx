import { useEffect, useState } from 'react'
import { BiArrowFromBottom } from 'react-icons/bi'

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  return (
    <div className={`scroll-to-top ${isVisible ? 'visible' : 'hidden'}`}>
      <button type="button" onClick={scrollToTop}>
        <BiArrowFromBottom className="icon" />
      </button>
    </div>
  )
}
