import React, { useContext } from 'react'
import { context } from '../../../../ClientContent';
import Review from './components/Review';

export default function Reviews() 
{
  const {reviews}=useContext(context)                                                


  return (
    <>
      <h2 className="text-[1.3rem] text-text block mb-[1rem]">Reviews</h2>
      {
        reviews.map(review=>
          (
            <Review key={review.user_id} {...review} />
          ))
      }
    </>
  );
}
