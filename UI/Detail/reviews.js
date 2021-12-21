import * as Style from '../../styles/detail/review.module.scss';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Image from 'next/image';
import { useState, useEffect} from 'react';




const reviews = [
  {
    id: 0,
    img: '/user.jpg',
    userName: 'john doe',
    review: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam, a
            eum et totam obcaecati voluptatibus consectetur dicta cupiditate
            iure inventore dignissimos sapiente ea, laborum culpa maiores error
            facilis corporis. Repellat.`,
  },

  {
    id: 1,
    img: '/user.jpg',
    userName: 'moses koroma',
    review: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam, a
            eum et totam obcaecati voluptatibus consectetur dicta cupiditate
            iure inventore dignissimos sapiente ea, laborum culpa maiores error
            facilis corporis. Repellat.`,
  },

  {
    id: 2,
    img: '/user.jpg',
    userName: 'mattia ngabia',
    review: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam, a
            eum et totam obcaecati voluptatibus consectetur dicta cupiditate
            iure inventore dignissimos sapiente ea, laborum culpa maiores error
            facilis corporis. Repellat.`,
  },

  {
    id: 3,
    img: '/user.jpg',
    userName: 'mohamed sillah',
    review: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam, a
            eum et totam obcaecati voluptatibus consectetur dicta cupiditate
            iure inventore dignissimos sapiente ea, laborum culpa maiores error
            facilis corporis. Repellat.`,
  },
];

const Reviews = ({ review }) => {
  const [index, setIndex] = useState(0);
  const [data, setData] = useState(review);

  useEffect(() => {
    const lastIndex = data?.length - 1;
    if (index < 0) return setIndex(lastIndex); // sliding backward
    if (index > lastIndex) return setIndex(0); // reseting the slide when we reach the last index
  }, [index, data]);

  // AUTO SLIDING... 
  useEffect(() => {
    let autoSlider = setInterval(() => setIndex(index + 1), 5000);
    return () => {
      clearInterval(autoSlider);
    };
  }, [index]);

  // DISPLAY THIS WHEN THERE IS NO REVIEW!
  if (data?.length > 0) {
    // RETURNING DATA...
    return (
      <div className={Style.review_grid_container}>
        <div className={Style.review_grid_container_header}>reviews</div>
        {/* REVIEW CONTENT */}
        <div className={Style.review_container}>
          {data.map((el, personIndex) => {
            if (el.userID.name && el.userID.image) {
              el.userID.fullname = el.userID.name;
              el.userID.photo = el.userID.image;
            }
            const {
              review,
              userID: { photo, fullname },
            } = el;

            let position = Style.nextSlide;
            if (personIndex === index) {
              position = Style.activeSlide;
            }
            if (
              personIndex === index - 1 ||
              (index === 0 && personIndex === data.length - 1)
            ) {
              position = Style.lastSlide;
            }

            return (
              <div
                className={[
                  Style.review_container_content,
                  data.length === 1 ? Style.activeSlide : position,
                ].join(' ')}
                key={personIndex}>
                <div className={Style.review_container_content_user_img}>
                  <Image
                    src={
                      photo.startsWith('https')
                        ? photo
                        : photo
                        ? `/uploads/Users-Images/${photo}`
                        : `/default.jpg`
                    }
                    width={100}
                    height={100}
                    objectFit="cover"
                  />
                </div>
                <div className={Style.review_container_content_user_name}>
                  {fullname} {/** data pass as props!**/}
                </div>

                <p className={Style.review_container_content_para}>
                  <i>{review}</i>
                </p>
              </div>
            );
          })}
          <button
            className={Style.prev}
            onClick={() => setIndex((prevIndex) => prevIndex - 1)}>
            <FiChevronLeft />
          </button>

          <button
            className={Style.next}
            onClick={() => setIndex((prevIndex) => prevIndex + 1)}>
            <FiChevronRight />
          </button>
        </div>

        {/* END OF  REVIEW CONTENT  */}
      </div>
    );
  }
  return (
    <div className={Style.No_Review}>
      No Review
    </div>
  );
}

export default Reviews
