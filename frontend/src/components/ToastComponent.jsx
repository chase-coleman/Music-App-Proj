const ToastComponent = ({ msg }) => {
  
  return (
    <>
        <div className="removed-alert z-50 flex rounded-xl flex-col p-1 text-center text-[0.65em]">
          <span>{msg}</span>
      </div>
    </>
  );
};

export default ToastComponent;
