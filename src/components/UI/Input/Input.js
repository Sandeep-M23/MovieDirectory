import styles from "./Input.module.css";

const Input = (props) => {
  const inputStyles = [styles.InputElement];

  if (!props.inValid && props.shouldValidate && props.touched) {
    inputStyles.push(styles.Invalid);
  }

  let inputElement = (
    <input
      className={inputStyles.join(" ")}
      id={props.id}
      type={props.type}
      placeholder={props.placeholder}
      onChange={props.onChange}
      value={props.value}
    />
  );

  return (
    <div className={styles.Input}>
      <label className={styles.Label}>{props.label}</label>
      {inputElement}
      {!props.inValid && props.touched && <p>{props.errorText}</p>}
    </div>
  );
};
export default Input;
