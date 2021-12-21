import * as Style from '../../styles/detail/writeReview.module.scss'
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

const WriteReviews = ({ review, setReview, handleReview }) => {
  const router = useRouter()
  const [session, loading] = useSession();

  return (
    <div className={Style.writeReview_grid_container}>
     
      {session && session.user ? (
        <form>
          <textarea
            rows="10"
            cols="80"
            placeholder="leave us a review!"
            value={review}
            onChange={(e) => setReview(e.target.value)}></textarea>
          <button onClick={handleReview}>submit</button> 
        </form>
      ) : (
        <div className={Style.Not_Login}>
          {/* <span onClick={() => router.push('/signIn')}>sign in</span> to write a
          review */}
        </div>
      )}
    </div>
  
  ); 
};

export default WriteReviews
 