import React from 'react'
// eslint-disable-next-line react/display-name
const SvgrMock = React.forwardRef((props, ref) => (
  <svg ref={ref} {...props}>
    {props.children}
  </svg>
))
export const ReactComponent = SvgrMock
export default SvgrMock
