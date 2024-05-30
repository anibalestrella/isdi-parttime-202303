/**
 * 2px div element with a gradient background
 * @param {*} param0 
 * @returns a 2px div element 
 */

export default function Panel({ children, tag: Tag = "div", className, type, ...props }) {
    console.debug(`///// TopLine -> render`)
    return <Tag className={`h-[2px] bg-gradient-to-l from-blue_dark to-red mb-4 ${className ? `${className} ` : ''}`} {...props}>
        {children}
    </Tag>
}