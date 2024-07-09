/**
 * 
 * @param {*} param0 
 * @returns 
 */
export default function menuItem({ children, tag: Tag = "div", className, type, liClassName, handleItemClick, ...props }) {
    console.debug(`///// menuItem -> render`)
    return <li className={`  ${liClassName ? `${liClassName}` : ''}`}>
        <Tag className={`transition duration-200 hover:text-red hover:ease-in-out focus:text-red ${className ? `${className}` : ''} ${type ? `Container--${type}` : ''} `}
            onClick={handleItemClick ? handleItemClick : undefined}
            {...props}>
            {children}
        </Tag>
    </li>
}