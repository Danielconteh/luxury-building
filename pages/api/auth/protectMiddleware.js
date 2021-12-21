import { getSession } from 'next-auth/client';
import { myOwnMadeError } from '../../../ErrorController/errorController'
import { User } from '../../../mongodConnection/connection';

export default async (req, _, next) => {
  const currentUser = await getSession({ req });
  if (currentUser.user) {
    req.user = await User.findOne({ email: currentUser.user.email });
    return next();
  } else {
    return next(
      myOwnMadeError(
        'You are not logged in! Please log in to get access.',
        'danicoError'
      )
    );
  }
};
