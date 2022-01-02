
const Error = ({ message }) => !message ? null : (
   <div className={`notification ${message.class}`}>{message.message}</div>
)

export default Error