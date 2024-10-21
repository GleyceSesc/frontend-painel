export default function Menu(props) {
  return (
    <div className="deznav">
      <div className="deznav-scroll mm-active" dangerouslySetInnerHTML={{ __html: props.props }}>
      </div>
    </div>
  )
}