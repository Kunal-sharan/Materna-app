import { TOPIC_COLOR_MAP } from "./constants/topics";
import { useState } from "react";

export const TopicChip = ({ topic, onSelect }) => {
  const [isSelected, setIsSelected] = useState(false);
  const backgroundColor = TOPIC_COLOR_MAP[topic] || TOPIC_COLOR_MAP.Default;

  const handleClick = () => {
    const newSelectedState = !isSelected;
    setIsSelected(newSelectedState);

    onSelect(topic, newSelectedState);
  };

  // When clicking on it, send a signal to the parent to tell it is has been selected
  return (
    <button
      className="h-6 px-3 text-xs content-center rounded-2xl border text-center"
      style={{ backgroundColor: backgroundColor }}
      onClick={handleClick}
    >
      {topic}
    </button>
  );
};
