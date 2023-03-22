import { Column } from "./column/column"
import css from './board.module.scss'

export const Board = () => {
    return (
        <div className={css.board}>
            <Column/>
            <Column/>
            <Column/>
            <Column/>
        </div>
    )
}