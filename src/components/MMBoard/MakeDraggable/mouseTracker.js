const mouseTracker = () => {
  let id = 0;
  let subscriptions = [];
  let isListening = false;

  const move = ({ clientX, clientY }) =>
    subscriptions.map((sub) => sub.callback(clientX, clientY));

  return {
    subscibe(callback) {
      subscriptions.push({ id: ++id, callback });
      !isListening && window.addEventListener("mousemove", move);
      isListening = true;
      return id;
    },
    unsubscribe(removeId) {
      subscriptions = subscriptions.filter((sub) => removeId !== sub.id);
      if (!subscriptions.length) {
        window.removeEventListener("mousemove", move);
        isListening = false;
      }
    },
  };
};

export default mouseTracker();
