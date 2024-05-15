// pass tag as a parameter to tell what type of element we need, rename it in capitals to be rebndered as a variable not an html element, and if tag parameter is empty the default would be "div"
// using the className parameter all the rest of the classes added inside the className of the tag will be passed as a string
// all the rest tags inside the elements will be passed thropu the (...props) parameter
// we can add modifiers to the class, adding a parameter to change the selector, let's name it " type" and use a contition to inject it.
export default function Panel({ children, tag: Tag = "div", className, type, ...props }) {
    console.debug(`///// Panel -> render`)
    return <Tag id='Panel' className={`rounded-lg bg-base shadow-lg bg-gray-300 ${className ? `${className} ` : ''} ${type ? `Container--${type}` : ''}`} {...props}>
        {children}
    </Tag>
}