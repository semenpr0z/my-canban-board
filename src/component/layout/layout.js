import css from './layout.module.scss'

export const Layout = (props) => {
    return (
        <div className={css.layout}>
            {props.children}
        </div>
    )
}