import * as Style from '../../styles/detail/writeReview.module.scss'
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import axios from 'axios';

const WriteReviews = ({ id }) => {
  const router = useRouter();
  const [session, loading] = useSession();


  const review = useRef(null); 
  // POST THE USER REVIEW TO THE DATABASE!
  const handleReview = async (e) => {
    e.preventDefault();
    console.log(id, review.current.value);

    if (!review.current.value) return alert('No review data to post');
    if (!id)
      return alert('something went wrong. Our technician are working on it!');
    try {
      const data = await axios.post(`/api/review/${id}`, { review: review.current.value });
      review.current.value = ''
      return;
    } catch (err) {
      console.log(err.response)
      if (
        err.response.data.message ===
        'The USERID has already been taken. Please use another USERID!'
      )
        alert(
          'you have previous write a reveiw for this house. \n please write for another house.'
        );
     
      return;
    }
  };

  return (
    <div className={Style.writeReview_grid_container}>
      {session && session.user ? (
        <form>
          <textarea
            rows="10"
            cols="80"
            placeholder="leave us a review!"
            ref={review}></textarea>
          <button onClick={handleReview}>submit</button>
        </form>
      ) : (
        <div className={Style.Not_Login}>
        </div>
      )}
    </div>
  );
};

export default WriteReviews
 