import Scrollbars from "react-custom-scrollbars-2";
import { Card } from "./card/card";
import css from "./column.module.scss";

export const Column = (props) => {
  return (
    <div className={css.column}>
      <div className={css.header}>{props.name}</div>
      <div className={css.wrapper}>
        <div className={css.body}>
          <Scrollbars autoHeight autoHeightMax={500}>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </Scrollbars>
        </div>
        <div className={css.footer}>
          <button>+</button>
        </div>
      </div>
    </div>
  );
};
