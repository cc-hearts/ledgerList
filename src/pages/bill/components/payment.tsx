const Payment = ({ label, value }: { label: string; value: string }) => {
  return (
    <span className="payment__wrapper">
      <label>{label} </label>
      <span> ¥ {value} </span>
    </span>
  );
};

export default Payment;
