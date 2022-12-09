import style from "./infiteProgressBar.module.sass";

function InfiteProgressBar() {
  return (
    <div className={style["demo-container"]}>
      <div className={style["progress-bar"]}>
        <div className={style["progress-bar-value"]}></div>
      </div>
    </div>
  );
}

export default InfiteProgressBar;
