const dummyRequest = ({ onSuccess }: any) => {
  setTimeout(() => {
    onSuccess('ok');
  }, 0);
};

export default dummyRequest;
