import useEmoji from '../../../hooks/useEmoji';
import Emoji from '../Emoji/Emoji';

const EmojisOrigin = () => {
  const { emojiQueue } = useEmoji();

  return (
    <>
      {emojiQueue.map((emojiWrapper) => {
        return <Emoji key={emojiWrapper.time} emojiWrapper={emojiWrapper} />;
      })}
    </>
  );
};

export default EmojisOrigin;
