import "./commentscard.scss";

const Commentcard = ({ commentdata }) => {
  let { first_name, last_name, content, created_at } = commentdata;

  let commentfor = [];

  return (
    <div className="comment_card_container">
      <div className="comment_card_subcontainer">
        <div className="card_top">
          <h6>{first_name + " " + last_name}</h6>
          {/* {items.task_status === 'complete' ?
                    <img src={complete_task} />
                    :
                    <img src={active_task} />
                    } */}
        </div>
        <div className="card_subcontainer2">
          <div className="card_center">
            <h6>on {created_at || "2021-09-06"}</h6>
          </div>
        </div>
        <div className="card_comment">
          <p>{content}</p>
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
