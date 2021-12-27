import * as Style from '../../styles/detail/writeReview.module.scss'
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useRef,useState } from 'react';
import axios from 'axios';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';

const WriteReviews = ({ id }) => {
  const router = useRouter();
  const [session, loading] = useSession();
   const [puc, setPuc] = useState(false);


  const review = useRef(null); 
  // POST THE USER REVIEW TO THE DATABASE!
  const handleReview = async (e) => {
    e.preventDefault();
    setPuc(true);

    if (!review.current.value)  {
      alert('No review data to post 🙄')
      setPuc(false);
      return;
    }
    if (!id) {
      alert('something went wrong. Our technician are working on it!')
      setPuc(false);
      return;
    }
    try {
      await axios.post(`/api/review/${id}`, { review: review.current.value });
      review.current.value = ''
      setPuc(false);
      return;
    } catch (err) {
      console.log(err.response);
      if (err.response.status === 404)
        alert(
          'you have already write a reveiw for this house. \n please write for another house. 👍'
        );
     setPuc(false);
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
          {/* <Button onClick={handleReview} variant="outlined">
            submit
          </Button> */}

          <LoadingButton
            onClick={handleReview}
            loading={puc ? true : false}
            loadingPosition="end"
            endIcon={<SendIcon />}
            variant="outlined">
            submit
          </LoadingButton>
        </form>
      ) : (
        <div className={Style.Not_Login}></div>
      )}
    </div>
  );
};

export default WriteReviews
 