const CopyButton = ({ isInTooltip, handleClick, text }) => (
  <button onClick={handleClick} className="post__share-button">
    {!isInTooltip && <img src="../assets/icons/share.svg" alt="" />}
    <span className="post__share-text">{text}</span>
  </button>
)

export default CopyButton
