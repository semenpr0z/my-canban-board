import css from './card.module.scss'

export const Card = (props) => {
    return (
        <div className={css.card}>
            <span>{props.name}</span>
        </div>
    )
}