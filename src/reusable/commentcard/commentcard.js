import "./commentscard.scss";

const Commentcard = ({ commentdata }) => {
  let { author, date, time, comment } = commentdata;

  let commentfor = [];

  return (
    <div className="comment_card_container">
      <div className="comment_card_subcontainer">
        <div className="card_top">
          <h6>{author}</h6>
          {/* {items.task_status === 'complete' ?
                    <img src={complete_task} />
                    :
                    <img src={active_task} />
                    } */}
        </div>
        <div className="card_subcontainer2">
          <div className="card_center">
            <h6>on {date}</h6>
          </div>
          <div className="card_center">
            <h6>at {time}</h6>
          </div>
        </div>
        <div className="card_comment">
          <p>{comment}</p>
        </div>
        <div className="card_subcontainer3">
          <ion-icon name="chatbox-outline"></ion-icon>
          <h5>Comment</h5>
        </div>
      </div>
    </div>
  );
};

export default Commentcard;
