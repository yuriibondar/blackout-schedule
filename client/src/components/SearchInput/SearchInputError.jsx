import classes from './SearchInput.module.css'

export default function SearchInputError({message}) {
  return (
    <div className={classes.error}>{message}</div>
  )
}