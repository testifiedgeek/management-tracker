import "./timeline.scss";

const comment = (items) => {
  let icons = [
    <ion-icon name="bug"></ion-icon>,
    <ion-icon name="person-circle"></ion-icon>,
    <ion-icon name="star"></ion-icon>,
    <ion-icon name="mail"></ion-icon>,
  ];
  return (
    <div className="comment_container">
      <div>
        <div className="comment_circle">
          {icons[Math.floor(Math.random() * icons.length)]}
        </div>
      </div>
      <div className="comment_metadata">
        <h5>
          {items.first_name + " " + items.last_name ? items.last_name : ""}{" "}
          <span>{items.content}</span>
        </h5>
        <label>note on 2021-09-08</label>
      </div>
    </div>
  );
};

const Timeline = ({ data }) => {
  console.log("data: ", data);
  return data.map((items) => {
    return comment(items);
  });
};

export default Timeline;
