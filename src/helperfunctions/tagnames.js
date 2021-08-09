import { GenarateName } from "../reusable/namecirclegenerator/criclegenrator";

let tagto = [
  "Rahuld",
  "mayur dere",
  "purvi",
  "Anubhab Goel",
  "Yogendra Pednekar",
  "Abhisheck Badjatiya",
  "Dwarka Tiwari",
];

const tagname = (namecallback) => {
  let people_available = tagto.map((items) => {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContentce: "start",
          borderBottom: "1px solid lightgrey",
        }}
      >
        <GenarateName name={items} />
        <p
          style={{ marginLeft: 10, fontWeight: "medium", cursor: "pointer" }}
          onClick={() => namecallback(items)}
        >
          {items}
        </p>
      </div>
    );
  });
  return people_available;
};

export default tagname;
