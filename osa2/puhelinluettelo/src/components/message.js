
const Message = ({ message }) => {
    return(
        <div class = "message" show={message ? 1 : 0}>
            {message}
        </div>
    )
}

export default Message