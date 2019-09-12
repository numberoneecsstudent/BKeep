import React from "react";

function Feelings(props) {
  return (
    <div className="feelings">
      <div className={`emoji emoji-${props.feelings.happy}`}>
        <span class="ec ec-sunglasses" />
      </div>
      <div className={`emoji emoji-${props.feelings.normal}`}>
        <span class="ec ec-neutral-face" />
      </div>
      <div className={`emoji emoji-${props.feelings.angry}`}>
        <span class="ec ec-rage" />
      </div>
      <div className={`emoji emoji-${props.feelings.sad}`}>
        <span class="ec ec-disappointed" />
      </div>
    </div>
  );
}

export default Feelings;