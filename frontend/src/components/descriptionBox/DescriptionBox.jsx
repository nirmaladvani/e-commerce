import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
      <div className='descriptionbox-navigator'>
        <div className='descriptionbox-nav-box'>Description</div>
        <div className='descriptionbox-nav-box fade'>Reviews (122)</div>
      </div>
      <div className='descriptionbox-description'>
        <p>
          A e-commerce webste Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Rem, dignissimos soluta facere magni officia
          voluptatum voluptate quidem itaque adipisci, nihil totam dolor porro
          fugiat id delectus, hic sit repellendus labore.
        </p>
        <p>
          E-commerce website Lorem ipsum, dolor sit amet consectetur adipisicing
          elit. Qui veritatis similique vitae voluptatum, voluptas corporis est
          molestias, mollitia incidunt quo deleniti perferendis placeat dolor
          earum. Ad dicta iste officiis ea.
        </p>
      </div>
    </div>
  )
}

export default DescriptionBox
