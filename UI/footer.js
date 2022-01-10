import Link from 'next/link'
const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer_item'>
        <a>expand your business</a>
        <a>building plane</a>
        <a>find your dream home</a>
        <a>build confidence in us!</a>
        <a>build your future</a>
        <a>come work with us!</a>
      </div>
      <div>&copy; Copyright {new Date().getFullYear()} by Daniel Conteh</div>
    </div>
  )
}

export default Footer
