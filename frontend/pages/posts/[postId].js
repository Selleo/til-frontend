//<DisplayPost //

import React from 'react'
/// TODO: render //<DisplayPost //>
const SinglePost = props => {
  return <div>[postId] {props.post}</div>
}

/// TODO: if needed
// export const getServerSideProps = async ctx => {
//   console.log(ctx)
//   return {
//     props: {
//       post: ctx.query.postId,
//     },
//   }
// }
export default SinglePost
